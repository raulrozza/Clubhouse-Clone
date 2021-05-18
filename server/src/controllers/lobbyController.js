import Logger from '../util/logger.js';

export default class LobbyController {
    constructor({ activeRooms, roomsListener }) {
        this.activeRooms = activeRooms;
        this.roomsListener = roomsListener;
    }

    onNewConnection(socket) {
        const { id } = socket;
        Logger.log(`[Lobby] New connection by ${id}`);
    }

    getEvents() {
        const functions = Reflect.ownKeys(LobbyController.prototype)
            .filter(fn => fn !== 'constructor')
            .map(name => [name, this[name].bind(this)]);

        return new Map(functions);
    }
}
