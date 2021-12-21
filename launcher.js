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
    F6 = 65475,
    F7 = 65476,
    F8 = 65477;


process.stdout.write(clc.bold("dO_ob Tony-b Machine"));
console.log("");
console.log("");
process.stdout.write(clc.columns([
    ["F1","volca-drum-hid-control"],
    ["F2","record-audio"],
    ["F3","tbm-output-audio-level"],
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
    if ([F8].includes(msg.rawcode)) {
        em.ld.stopTurnOnDemo(true);
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

    if (msg.rawcode == F3) {
        am.startTbmOutputAudioLevel((m) => {
            em.onTbmOutputAudioLeveloMessage(m);
        });
    }

});

ioHook.start();
process.stdin.setRawMode(true);


/*
const HID = require('node-hid');
var devices = HID.devices();

let vendorId = null;
let productId = null;

for(let device of devices) {
	if (device["product"].indexOf("Keyboard")>-1) {
		vendorId = device["vendorId"];
		productId = device["productId"];
	}
}
console.log(vendorId, productId);
if (vendorId != null) {
	let device = new HID.HID(vendorId,productId);
	device.on('data',(a)=>{
		let tab = Array.prototype.slice.call(a);
		console.log("DATA",tab[2]);
	});
}



 */