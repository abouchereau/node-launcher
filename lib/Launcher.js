const childProcess = require('child_process');

module.exports = class Launcher {

    volcaDrumHidControlProcess = null;

    startVolcaDrumHidControl(callback) {
        this.volcaDrumHidControlProcess = childProcess.fork("./../volca-drum-hid-control/volca-drum-hid-control.js",["-o=0"]);
        this.volcaDrumHidControlProcess.on('message', callback);
    }


}
