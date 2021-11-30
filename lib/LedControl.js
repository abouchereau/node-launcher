const blinkstick = require('blinkstick');

module.exports = class LedControl {

    leds = null;

    constructor() {
        this.leds = blinkstick.findAll();
        this.setIsStarted();
    }

    setIsStarted() {

    }

    setInputStatus(index,value) {

    }

    setOutputStatus(index,value) {

    }

}