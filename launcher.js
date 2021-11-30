//sudo apt-get install libusb-1.0 libudev-dev
'use strict';

const ioHook = require('iohook');//windows marche pas :/
const AppManager = require("./lib/AppManager");
const EventManager = require("./lib/EventManager");


const F1 = 65470,
    F2 = 65471,
    F3 = 65472,
    F4 = 65473,
    F5 = 65474,
    F6 = 65475;


let am = new AppManager();
let em = new EventManager();

ioHook.on('keypress', function (msg) {
    if (msg.rawcode == 99 && msg.ctrlKey) {//Ctrl + C
        console.log("EXIT");
        ioHook.unload();
        process.exit();
    }
    if (msg.rawcode == F1) {
        am.startVolcaDrumHidControl((m)=> {
            em.onVolcaDrumHidControlMessage(m);
        });
    }
});
ioHook.start();
process.stdin.setRawMode(true);


