const blinkstick = require('blinkstick');
const Utils = require("./Utils");

module.exports = class LedControl {

    static get LED_RECORD_AUDIO() {return 0;}
    static get LED_INPUT_FIRST() {return 1;}
    static get LED_OUTPUT_FIRST() {return 4;}
    static get LED_DB_OUT() {return 7;}
    static get NB_LEDS() {return 8;}
    static get RAINBOW() {return ["#ff0000", "#ffa500", "#ffff00", "#008000", "#0000ff", "#4b0082", "#ee82ee"];}


    leds = null;

    intervalRecord = null;
    blinkBoolRecord = true;

    intervalTurnOnDemo = null;
    incremDemo = 0;
    intervals = [];
    dbOutLevelColors = {9:"purple",1:"green",2:"orange",3:"red"};


    constructor() {
        this.leds = blinkstick.findFirst();
        this.startTurnOnDemo();
    }


    startTurnOnDemo() {
        if (this.leds != null) {
            this.intervalTurnOnDemo = setInterval(() => {
                for(let i=0;i<LedControl.NB_LEDS;i++) {
                    this.leds.setColor(LedControl.RAINBOW[Utils.modulo(this.incremDemo + i,7)], {"index": i});
                }
                this.incremDemo++;
            },100);
        }
    }

    stopTurnOnDemo(force=false) {
        if(this.intervalTurnOnDemo != null || force) {
            clearInterval(this.intervalTurnOnDemo);
            this.intervalTurnOnDemo = null;
            if (this.leds != null) {
                for (let i = 0; i < LedControl.NB_LEDS; i++) {
                    this.leds.setColor('black', {"index": i});
                }
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
        this.intervalRecord = setInterval(() => {
            if (this.blinkBoolRecord) {
                this.leds.setColor('red', {"index": LedControl.LED_RECORD_AUDIO});
            } else {
                this.leds.setColor('black', {"index": LedControl.LED_RECORD_AUDIO});
            }
            this.blinkBoolRecord = !this.blinkBoolRecord;
        }, 250);
    }

    stopRecord() {
        this.blinkBoolRecord = true;
        clearInterval(this.intervalRecord);
        if (this.leds != null) {
            this.leds.setColor('black', {"index": LedControl.LED_RECORD_AUDIO});
        }
    }

    dbOut(level) {
        if (this.leds != null) {
            if (level == 0) {
                this.leds.setColor('black', {"index": LedControl.LED_DB_OUT});
            }
            else {
                this.leds.setColor(this.dbOutLevelColors[level], {"index": LedControl.LED_DB_OUT});
            }
        }
    }



    setStatus(index,status) {
        if (this.leds != null) {
            switch (status) {
                case -1:
                    this.leds.setColor('red', {"index": index});
                    break;
                case 0:
                    this.leds.setColor('black', {"index": index});
                    break;
                case 1:
                    this.leds.setColor('green', {"index": index});
                    break;
                case 2:
                    if (this.intervals[index] != null) {
                        clearInterval(this.intervals[index]);
                        this.intervals[index] = null;
                    }
                    this.leds.setColor('yellow', {"index": index});
                    this.intervals[index] = setInterval(() => {
                        this.leds.setColor('green', {"index": index});
                        clearInterval(this.intervals[index]);
                        this.intervals[index] = null;
                    }, 250);
                    break;
            }
        }
    }


}