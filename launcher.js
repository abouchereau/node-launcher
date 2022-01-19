//sudo apt-get install libusb-1.0 libudev-dev
'use strict';

const HID = require('node-hid');
const AppManager = require("./lib/AppManager");
const EventManager = require("./lib/EventManager");
const clc = require('cli-color');

const C = 6,
    F1 = 58,
    F2 = 59,
    F3 = 60,
    F4 = 61,
    F5 = 62,
    F6 = 63,
    F7 = 64,
    F8 = 65,
    F9 = 66,
    F10 = 67,
    F11 = 68,
    F12 = 69;


process.stdout.write(clc.bold("dO_ob Tony-b Machine"));
console.log("");
console.log("");

let devices = HID.devices();

let keyboardDevice = null;

for(let device of devices) {
    if (device["product"].indexOf("Keyboard")>-1 ||  device["product"].indexOf("2.4G")>-1) {
        keyboardDevice = device;
    }
}

if (keyboardDevice == null) {
    console.log("No Keyboard detected");
    process.exit();
}
else {
    console.log("Using Keyboard : "+keyboardDevice.product)
}

let device = new HID.HID(keyboardDevice.vendorId,keyboardDevice.productId);
process.stdout.write(clc.columns([
    ["F1","volca-drum-hid-control"],
    ["F2","record-audio"],
    ["F3","tbm-output-audio-level"],
    ["F8","stop leds"],
]));
console.log("");

let am = new AppManager();
let em = new EventManager();
let ctrl = false;
device.on('data',(a)=>{
    let tab = Array.prototype.slice.call(a);
    ctrl = tab[0] == 1;
    let key = tab[2];
    if (ctrl && key==C) {
        em.ld.stopTurnOnDemo(true);
        process.exit();
    }

    if ([F1,F2,F3,F4,F5,F6].includes(key)) {
        em.ld.stopTurnOnDemo();
    }


    if (key == F1) {
        am.startVolcaDrumHidControl((m)=> {
            em.onVolcaDrumHidControlMessage(m);
        });
    }

    if (key == F2) {
        //TODo : vérifier qu'un device PnP est branché
        am.startStopRecordAudio((m) => {
            em.onStartStopRecordAudioMessage(m);
        });
    }

    if (key == F3) {
        am.startTbmOutputAudioLevel((m) => {
            em.onTbmOutputAudioLeveloMessage(m);
        });
    }

    if ([F8].includes(key)) {
        em.ld.stopTurnOnDemo(true);
    }

    if (key == F11) {
        am.restart();
    }

    if (key == F12) {
        am.shutdown();
    }


});
process.stdin.setRawMode(true);