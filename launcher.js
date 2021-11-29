//sudo apt-get install libusb-1.0 libudev-dev
'use strict';

const ioHook = require('iohook');//windows marche pas :/
const blinkstick = require('blinkstick');
const Launcher = require("./lib/Launcher");

const F1 = 65470,
    F2 = 65471,
    F3 = 65472,
    F4 = 65473,
    F5 = 65474,
    F6 = 65475;

let leds = blinkstick.findAll();
let launcher = new Launcher();

ioHook.on('keypress', function (msg) {
    if (msg.rawcode == 99 && msg.ctrlKey) {//Ctrl + C
        console.log("EXIT");
        ioHook.unload();
        process.exit();
    }
    if (msg.rawcode == F1) {
        launcher.startVolcaDrumHidControl((m)=> {
            onVolcaDrumHidControlMessage(m);
        });
    }
});
ioHook.start();
process.stdin.setRawMode(true);


function onVolcaDrumHidControlMessage(m) {
    console.log("Hello",m);
}


