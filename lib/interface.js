    var util = require("util");
    var childProcess = require('child_process');
    var $            = require('jquery');

    var NwBuilder = require("nw-builder");


    var gui = global.window.nwDispatcher.requireNwGui();
    var win = gui.Window.get();

    var menubar = new gui.Menu({ type: 'menubar' });

    var fileMenu = new gui.Menu();

    fileMenu.append(new gui.MenuItem({
        label: 'Exit',
        click: function() {
            gui.App.quit();
        }
    }));

    menubar.append(new gui.MenuItem({ label: 'File', submenu: fileMenu}));

    // command Menu

    var commandMenu = new gui.Menu();

    commandMenu.append(new gui.MenuItem({
        label: 'Create Cluster',
        click: function() {
        CreateCluster();

        }
    }));


    commandMenu.append(new gui.MenuItem({
        label: 'Create Packages',
        click: function() {
        CreatePackages();

        }
    }));



    menubar.append(new gui.MenuItem({ label: 'Command', submenu: commandMenu}));

    win.menu = menubar;

    $(document).ready(function() {


        $("#splashScreen").click(function(){
            $(this).hide();
        });

    });


  function CreatePackages () {
    var nw = new NwBuilder({
        files: './**', // use the glob format
        platforms: ['linux64'],
        appName: 'VisualTimeline',
        appVersion: '1.0.0',
        icon: 'timeline.png',
        buildDir: 'dist'
    });


   if (nw) {
     console.log("Builder ist da " + nw.options.files);

     // console.log(util.inspect(nw));
   }


    nw.build(function(err) {
        if(err) console.log(err);
        else {
          alert("Build war erfolgreich");
        }
    })


   }







    function CreateCluster()
    {
    var exec = childProcess.exec;
    exec('node ./node_modules/cluster-painter/create_cluster.js', function(error, stdout, stderr) {
        if (error !== null) {

            console.log('exec error: ', error);
        }
        else alert("erfolgreich erstellt");
    });

    }
