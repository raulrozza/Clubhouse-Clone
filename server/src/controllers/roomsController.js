export default class RoomsController {
    constructor() {}

    onNewConnection(socket) {
        const { id } = socket;
    }

    getEvents() {
        const functions = Reflect.ownKeys(RoomsController.prototype)
            .filter(fn => fn !== 'constructor')
            .map(name => this[name].bind(this));

        return new Map(functions);
    }
}
