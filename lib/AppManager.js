const childProcess = require('child_process');
const spawn = require('child_process').spawn;
const Utils = require("./Utils");

module.exports = class AppManager {

    homeDir = "";
    volcaDrumHidControlProcess = null;
    recordAudioProcess = null;

    constructor() {
        this.homeDir = require('os').homedir();
    }

    startVolcaDrumHidControl(callback) {
        this.volcaDrumHidControlProcess = childProcess.fork(__dirname+"/../../volca-drum-hid-control/volca-drum-hid-control.js",["-o=CH345"]);
        this.volcaDrumHidControlProcess.on('message', callback);
    }

    startStopRecordAudio(callback) {
        if (this.recordAudioProcess == null) {
            this.recordAudioProcess = spawn("arecord",["-f","cd",this.homeDir+"/Musique/in_"+Utils.getFormattedDate()+".wav"],{detached:true,stdio:['ignore',1,2]});
            console.log("Start Recording Audio");
            callback(1);
        }
        else {
            process.kill(-this.recordAudioProcess.pid);
            this.recordAudioProcess = null;
            callback(0);
            console.log("Stop Recording Audio");
        }

    }




}
