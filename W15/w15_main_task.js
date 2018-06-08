function main()
{
    var volume = new KVS.LobsterData();
    var screen = new KVS.THREEScreen();

    screen.init( volume, {
        width: window.innerWidth * 0.8,
        height: window.innerHeight,
        targetDom: document.getElementById('display'),
        enableAutoResize: false
    });


    var bounds = Bounds( volume );
    screen.scene.add( bounds );

    var isovalue = 64;
    var d_color = 0xCC0000;
    var surfaces = Isosurfaces( volume, isovalue, screen, d_color);
    screen.scene.add( surfaces );
    


    var FizzyText = function() {
      this.isovalue = 64;
      this.displayOutline = true;
      this.color = "#CC0000";
      //this.reflection = reflectionFlag;
    };


      var text = new FizzyText();
      var gui = new dat.GUI();
      var controller = gui.add(text, 'isovalue', 0, 255);
      var controller2 =  gui.addColor(text, 'color');
      //gui.add(text, 'displayOutline');
      //var reflectionController = gui.add(text, 'reflection', { Lambertian: 0, Phong: 1, BlinnPhong: 2 } );
      

    controller.onFinishChange(function(value) {
        screen.scene.remove( surfaces );
        isovalue = value;
        surfaces = Isosurfaces( volume, isovalue, screen, d_color);
        screen.scene.add( surfaces );
    });

    controller2.onFinishChange(function(d_value) {
        screen.scene.remove( surfaces );
        d_color = d_value;
        surfaces = Isosurfaces( volume, isovalue, screen, d_color);
        screen.scene.add( surfaces );
    });

    document.getElementById('label').innerHTML = "Isovalue: " +  isovalue ;
    
    document.getElementById('isovalue').addEventListener('mousemove', function() {
        var isovalue = +document.getElementById('isovalue').value;
        document.getElementById('label').innerHTML = "Isovalue: " +  isovalue ;
    });

    document.getElementById('change-isovalue-button').addEventListener('click', function() {
		screen.scene.remove( surfaces );
        isovalue = +document.getElementById('isovalue').value;
		surfaces = Isosurfaces( volume, isovalue, screen, d_color);
		screen.scene.add( surfaces );
    });
    
    document.getElementById('change-color-button').addEventListener('click', function() {
		screen.scene.remove( surfaces );
        d_color = document.getElementById('d_color').value;
		surfaces = Isosurfaces( volume, isovalue, screen, d_color);
		screen.scene.add( surfaces );
    });

    document.addEventListener( 'mousemove', function() {
        screen.light.position.copy( screen.camera.position );
    });

    window.addEventListener( 'resize', function() {
        screen.resize( [ window.innerWidth * 0.8, window.innerHeight ] );
    });

    screen.loop();
}