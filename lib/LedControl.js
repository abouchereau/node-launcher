const blinkstick = require('blinkstick');
const Utils = require("./Utils");

module.exports = class LedControl {

    static get LED_RECORD_AUDIO() {return 0;}
    static get LED_INPUT_FIRST() {return 1;}
    static get LED_OUTPUT_FIRST() {return 4;}


    leds = null;

    intervalRecord = null;
    blinkBoolRecord = true;

    intervalTurnOnDemo = null;
    incremDemo = 0;
    intervals = [];


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
        this.setStatus(LedControl.LED_INPUT_FIRST+index,value);
    }

    setOutputStatus(index,value) {
        this.setStatus(LedControl.LED_OUTPUT_FIRST+index,value);
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

    setStatus(index,status) {
        switch(status) {
            case -1:
                this.leds[index].setColor("red");
                break;
            case 0:
                this.leds[index].turnOff();
                break;
            case 1:
                this.leds[index].setColor("green");
                break;
            case 2:
                if (this.intervals[index] != null) {
                    clearInterval(this.intervals[index]);
                    this.intervals[index] = null;
                }
                this.leds[index].setColor("yellow");
                this.intervals[index] = setInterval(()=> {
                    this.leds[index].setColor("green");
                    clearInterval(this.intervals[index]);
                    this.intervals[index] = null;
                },250);
                break;
        }
    }


}