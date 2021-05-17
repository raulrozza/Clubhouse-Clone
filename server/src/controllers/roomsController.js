export default class RoomsController {
    constructor() {}

    onNewConnection(socket) {
        const { id } = socket;
        console.log(
            `${new Date().toLocaleTimeString()}: New connection by ${id}`,
        );
    }

    joinRoom(socket, data) {
        console.log('Data received', data);
    }

    getEvents() {
        const functions = Reflect.ownKeys(RoomsController.prototype)
            .filter(fn => fn !== 'constructor')
            .map(name => this[name].bind(this));

        return new Map(functions);
    }
}
