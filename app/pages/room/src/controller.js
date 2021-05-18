import { constants } from '../../_shared/constants.js';

export default class RoomController {
    constructor({ socketBuilder, roomInfo, view }) {
        this.socketBuilder = socketBuilder;
        this.roomInfo = roomInfo;
        this.view = view;
    }

    static async initialize(deps) {
        return new RoomController(deps)._initialize();
    }

    async _initialize() {
        this._setupViewEvents();
        this.socket = this._setupSocket();

        this.socket.emit(constants.events.JOIN_ROOM, this.roomInfo);
    }

    _setupViewEvents() {
        this.view.updateUserImage(this.roomInfo.user);
        this.view.updateRoomTopic(this.roomInfo.room);
    }

    _setupSocket() {
        return this.socketBuilder
            .setOnUserConnected(this.onUserConnected())
            .setOnUserDisconnected(this.onUserDisconnected())
            .setOnRoomUpdated(this.onRoomUpdated())
            .build();
    }

    onRoomUpdated() {
        return room => console.log('room list', room);
    }

    onUserDisconnected() {
        return user => console.log('user disconnected', user);
    }

    onUserConnected() {
        return user => {
            console.log(
                `${new Date().toLocaleTimeString()} New connection: ${
                    user.username
                } {ID ${user.id}}`,
            );

            this.view.addAttendeeOnGrid(user);
        };
    }
}
