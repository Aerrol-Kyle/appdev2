const EventEmitter = require('events');
const emitter = new EventEmitter();

const data = {name: 'John Doe', age: 25};

emitter.on('start', () => {
    console.log("Application Started!");
});

emitter.on('data', (data) => {
    console.log(`Data received: ${data.name}, ${data.age}`)
});

emitter.on('error', (error) => {
    console.log(`Error occured: ${error}`);
});

emitter.emit('start')
emitter.emit('data', data)
emitter.emit('error', 'Something went wrong');