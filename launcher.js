//sudo apt-get install libusb-1.0 libudev-dev
'use strict';

const HID = require('node-hid');
const AppManager = require("./lib/AppManager");
const EventManager = require("./lib/EventManager");
const clc = require('cli-color');

const F1 = 58,
    F2 = 59,
    F3 = 60,
    F4 = 61,
    F5 = 62,
    F6 = 63,
    F7 = 64,
    F8 = 65;



let devices = HID.devices();

let vendorId = null;
let productId = null;

for(let device of devices) {
    if (device["product"].indexOf("Keyboard")>-1) {
        vendorId = device["vendorId"];
        productId = device["productId"];
    }
}
console.log(vendorId, productId);
if (vendorId == null) {
    console.log("No Keyboard detected");
    process.exit();
}

let device = new HID.HID(vendorId,productId);


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

device.on('data',(a)=>{
    let tab = Array.prototype.slice.call(a);
    let key = tab[2];
    console.log("DATA",tab[2]);

   /* if (msg.rawcode == 99 && msg.ctrlKey) {//Ctrl + C
        console.log("EXIT");
        ioHook.unload();
        process.exit();
    }*/

    if ([F1,F2,F3,F4,F5,F6].includes(key)) {
        em.ld.stopTurnOnDemo();
    }
    if ([F8].includes(key)) {
        em.ld.stopTurnOnDemo(true);
    }

    if (key == F1) {
        am.startVolcaDrumHidControl((m)=> {
            em.onVolcaDrumHidControlMessage(m);
        });
    }

    if (key == F2) {
        am.startStopRecordAudio((m) => {
            em.onStartStopRecordAudioMessage(m);
        });
    }

    if (key == F3) {
        am.startTbmOutputAudioLevel((m) => {
            em.onTbmOutputAudioLeveloMessage(m);
        });
    }

});
/*
ioHook.start();
process.stdin.setRawMode(true);

*/
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