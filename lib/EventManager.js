const LedControl = require("./LedControl");

module.exports = class EventManager {

    ld = new LedControl();

    onVolcaDrumHidControlMessage(m) {
        switch(m.event) {
            case "INPUT_STATUS":
                this.ld.setInputStatus(m.index,m.value);
                break;
            case "OUTPUT_STATUS":
                this.ld.setOutputStatus(m.value);
                break;
        }
    }

}