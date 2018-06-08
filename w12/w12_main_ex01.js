function main()
{
    var volume = new KVS.CreateTornadoData( 64, 64, 64 );//立方体大きさ
    var screen = new KVS.THREEScreen();

    screen.init( volume );
    setup();
    screen.loop();

    function setup()
    {
        var color = new KVS.Vec3( 0, 0, 0 );//立方体枠色
        var box = new KVS.BoundingBox();
        box.setColor( color );
        box.setWidth( 10 );//立方体枠太さ

        var seed_point = volume.objectCenter();//図位置
        var streamline = new KVS.Streamline();
        streamline.setIntegrationStepLength( 0.7 );//図長さ
        streamline.setIntegrationTime( 100 );//図長さ
        streamline.setIntegrationMethod( KVS.RungeKutta4 );
        streamline.setIntegrationDirection( KVS.ForwardDirection );
        streamline.setLineWidth( 20 );//図太さ
        streamline.setSeedPoint( seed_point );

        var line1 = KVS.ToTHREELine( box.exec( volume ) );
        var line2 = KVS.ToTHREELine( streamline.exec( volume ) );
        screen.scene.add( line1 );
        screen.scene.add( line2 );
        screen.draw();

        document.addEventListener( 'mousemove', function() {
            screen.light.position.copy( screen.camera.position );
        });
    }
}
