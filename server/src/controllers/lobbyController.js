import { constants } from '../util/constants.js';
import Logger from '../util/logger.js';

export default class LobbyController {
    constructor({ activeRooms, roomsListener }) {
        this.activeRooms = activeRooms;
        this.roomsListener = roomsListener;
    }

    onNewConnection(socket) {
        const { id } = socket;
        Logger.log(`[Lobby] New connection by ${id}`);
        this._updateLobbyRooms({
            socket,
            activeRooms: [...this.activeRooms.values()],
        });
    }

    _updateLobbyRooms({ socket, activeRooms }) {
        socket.emit(constants.events.LOBBY_UPDATED, activeRooms);
    }

    getEvents() {
        const functions = Reflect.ownKeys(LobbyController.prototype)
            .filter(fn => fn !== 'constructor')
            .map(name => [name, this[name].bind(this)]);

        return new Map(functions);
    }
}
