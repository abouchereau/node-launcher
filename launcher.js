//sudo apt-get install libusb-1.0 libudev-dev
'use strict';

const ioHook = require('iohook');//windows marche pas :/
const AppManager = require("./lib/AppManager");
const EventManager = require("./lib/EventManager");
const clc = require('cli-color');

const F1 = 65470,
    F2 = 65471,
    F3 = 65472,
    F4 = 65473,
    F5 = 65474,
    F6 = 65475;


process.stdout.write(clc.bold("dO_ob Tony-b Machine"));
console.log("");
console.log("");
process.stdout.write(clc.columns([
    ["F1","volca-drum-hid-control"],
    ["F2","record-audio"],
]));
console.log("");

let am = new AppManager();
let em = new EventManager();

ioHook.on('keypress', function (msg) {

    if (msg.rawcode == 99 && msg.ctrlKey) {//Ctrl + C
        console.log("EXIT");
        ioHook.unload();
        process.exit();
    }

    if ([F1,F2,F3,F4,F5,F6].includes(msg.rawcode)) {
        em.ld.stopTurnOnDemo();
    }

    if (msg.rawcode == F1) {
        am.startVolcaDrumHidControl((m)=> {
            em.onVolcaDrumHidControlMessage(m);
        });
    }

    if (msg.rawcode == F2) {
        am.startStopRecordAudio((m) => {
            em.onStartStopRecordAudioMessage(m);
        });
    }

});

ioHook.start();
process.stdin.setRawMode(true);


