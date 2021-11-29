const InputEvent = require('input-event');
const input = new InputEvent('/dev/input/event0');

const keyboard = new InputEvent.Keyboard(input);

keyboard.on('keyup'   , console.log);
keyboard.on('keydown' , console.log);
keyboard.on('keypress', console.log);

///const ioHook = require('iohook');
const blinkstick = require('blinkstick');

let leds = blinkstick.findAll();
console.log("LEDS", leds);
/*
ioHook.on(' keyup', (event) => {
    console.log(event); // { type: 'mousemove', x: 700, y: 400 }
});
ioHook.on(' keypress', (event) => {
    console.log(event); // { type: 'mousemove', x: 700, y: 400 }
});


// Register and start hook
ioHook.start(false);
*/

/*
// listen for the "keypress" event
process.stdin.on('keypress', (ch, key) => {
    console.log('got "keypress"', ch, key);
    if ( key.name == 'c' && key.ctrl) {
        process.exit();
    }

});
 */
process.stdin.setRawMode(true);
process.stdin.resume();


