import Attendee from '../entities/attendee.js';
import Room from '../entities/room.js';
import { constants } from '../util/constants.js';

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

        const updatedRoom = this._joinUserRoom(socket, {
            user: updatedUserData,
            room,
        });

        this._notifyUsersOnRoom(socket, { roomId, user: updatedUserData });
        this._replyWithActiveUsers(socket, updatedRoom.users);
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

    _joinUserRoom(socket, { user, room }) {
        const roomId = room.id;
        const existingRoom = this.rooms.has(roomId);
        const currentRoom = existingRoom ? this.rooms.get(roomId) : {};

        const currentUser = new Attendee({
            ...user,
            roomId,
        });

        // Defining room's owner
        const [owner, users] = existingRoom
            ? [currentRoom.owner, currentRoom.users]
            : [currentUser, new Set()];

        const updatedRoom = this._mapRoom({
            ...currentRoom,
            ...room,
            owner,
            users: new Set([...users, ...[currentUser]]),
        });

        this.rooms.set(roomId, updatedRoom);

        socket.join(roomId);

        return this.rooms.get(roomId);
    }

    _mapRoom(room) {
        const users = [...room.users.values()];
        const speakersCount = users.filter(user => user.isSpeaker).length;
        const featuredAttendees = users.slice(0, 3);
        const mappedRoom = new Room({
            ...room,
            featuredAttendees,
            speakersCount,
            attendeesCount: room.users.size,
        });

        return mappedRoom;
    }

    _notifyUsersOnRoom(socket, { roomId, user }) {
        const event = constants.events.USER_CONNECTED;
        socket.to(roomId).emit(event, user);
    }

    _replyWithActiveUsers(socket, users) {
        const event = constants.events.LOBBY_UPDATED;
        socket.emit(event, [...users.values()]);
    }

    getEvents() {
        const functions = Reflect.ownKeys(RoomsController.prototype)
            .filter(fn => fn !== 'constructor')
            .map(name => [name, this[name].bind(this)]);

        return new Map(functions);
    }
}
