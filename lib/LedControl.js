const blinkstick = require('blinkstick');
const Utils = require("./Utils");

module.exports = class LedControl {

    static get LED_RECORD_AUDIO() {return 0;}

    leds = null;

    intervalRecord = null;
    blinkBoolRecord = true;

    intervalTurnOnDemo = null;
    incremDemo = 0;

    constructor() {
        this.leds = blinkstick.findAll();
        console.log(this.leds.length+" Leds Found");
        this.startTurnOnDemo();
    }

    startTurnOnDemo() {
        if (this.leds.length>0) {
            this.intervalTurnOnDemo = setInterval(() => {
                this.leds[Utils.modulo(this.incremDemo,this.leds.length)].setColor('green');
                this.leds[Utils.modulo(this.incremDemo-1,this.leds.length)].turnOff();
                this.incremDemo++;
            },100);
        }
    }

    stopTurnOnDemo() {
        if(this.intervalTurnOnDemo != null) {
            clearInterval(this.intervalTurnOnDemo);
            this.intervalTurnOnDemo = null;
            for (let i = 0; i < this.leds.length; i++) {
                this.leds[i].turnOff();
            }
        }
    }

    setInputStatus(index,value) {

    }

    setOutputStatus(index,value) {

    }

    startRecord() {
        if (this.leds[LedControl.LED_RECORD_AUDIO] != null) {
            this.intervalRecord = setInterval(() => {
                if (this.blinkBoolRecord) {
                    this.leds[LedControl.LED_RECORD_AUDIO].setColor('red');
                } else {
                    this.leds[LedControl.LED_RECORD_AUDIO].turnOff();
                }
                this.blinkBoolRecord = !this.blinkBoolRecord;
            }, 250);
        }
    }

    stopRecord() {
        if (this.leds[LedControl.LED_RECORD_AUDIO] != null) {
            this.blinkBoolRecord = true;
            clearInterval(this.intervalRecord);
            this.leds[LedControl.LED_RECORD_AUDIO].turnOff();
        }
    }

}