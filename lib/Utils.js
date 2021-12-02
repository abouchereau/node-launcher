module.exports = class Utils {

    static modulo(n, m) {//retourne un modulo positif
        return ((n % m) + m) % m;
    }

    static getFormattedDate() {
        let date = new Date();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let min = date.getMinutes();
        let sec = date.getSeconds();
        month = (month < 10 ? "0" : "") + month;
        day = (day < 10 ? "0" : "") + day;
        hour = (hour < 10 ? "0" : "") + hour;
        min = (min < 10 ? "0" : "") + min;
        sec = (sec < 10 ? "0" : "") + sec;
        let str = date.getFullYear() + "-" + month + "-" + day + "_" +  hour + "-" + min + "-" + sec;
        return str;
    }
}