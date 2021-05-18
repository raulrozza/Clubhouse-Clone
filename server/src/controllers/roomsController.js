import Attendee from '../entities/attendee.js';

export default class RoomsController {
    constructor() {
        this._users = new Map();
        this.rooms = new Map();
    }

    onNewConnection(socket) {
        const { id } = socket;
        console.log(
            `${new Date().toLocaleTimeString()}: New connection by ${id}`,
        );
        this._updateGlobalUserData({ userId: id });
    }

    joinRoom(socket, { user, room }) {
        const userId = (user.id = socket.id);
        const roomId = room.id;

        const updatedUserData = this._updateGlobalUserData({
            userId,
            userData: user,
            roomId,
        });
    }

    _updateGlobalUserData({ userId, userData = {}, roomId = '' }) {
        const user = this._users.get(userId) ?? {};
        const existingRoom = this.rooms.has(roomId);

        const updatedUserData = new Attendee({
            ...user,
            ...userData,
            roomId,
            // If its the only person in the room
            isSpeaker: !existingRoom,
        });

        this._users.set(userId, updatedUserData);

        return this._users.get(userId);
    }

    getEvents() {
        const functions = Reflect.ownKeys(RoomsController.prototype)
            .filter(fn => fn !== 'constructor')
            .map(name => [name, this[name].bind(this)]);

        return new Map(functions);
    }
}
