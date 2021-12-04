const LedControl = require("./LedControl");

module.exports = class EventManager {

    ld = new LedControl();

    onVolcaDrumHidControlMessage(m) {
        switch(m.event) {
            case "INPUT_STATUS":
                this.ld.setInputStatus(m.index,m.value);
                break;
            case "OUTPUT_STATUS":
                this.ld.setOutputStatus(0,m.value);
                break;
        }
    }

    onStartStopRecordAudioMessage(m) {
        if (m==1) {
            this.ld.startRecord();
        }
        else {
            this.ld.stopRecord();
        }
    }

}