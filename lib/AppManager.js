const childProcess = require('child_process');

module.exports = class AppManager {

    volcaDrumHidControlProcess = null;

    startVolcaDrumHidControl(callback) {
        this.volcaDrumHidControlProcess = childProcess.fork(__dirname+"/../../volca-drum-hid-control/volca-drum-hid-control.js",["-o=CH345"]);
        this.volcaDrumHidControlProcess.on('message', callback);
    }


}
