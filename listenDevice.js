const HID = require('node-hid');
const VENDOR_ID = 0x79;
const PRODUCT_ID = 0x1846;


let device = new HID.HID(VENDOR_ID, PRODUCT_ID);


device.on('data',(a)=>{
    let tab = Array.prototype.slice.call(a);
    if (tab[0] == 3) {
        console.log(toBin(tab));
    }
});

function toBin(tab) {
    let tabBin = [];
    for(let item of tab) {
        tabBin.push(item.toString(2));
    }
    return tabBin;
}