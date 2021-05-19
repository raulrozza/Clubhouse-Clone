import { constants } from '../../_shared/constants.js';
import Logger from '../../_shared/logger.js';

export default class RoomController {
    constructor({ socketBuilder, roomInfo, view, peerBuilder }) {
        this.socketBuilder = socketBuilder;
        this.roomInfo = roomInfo;
        this.view = view;
        this.peerBuilder = peerBuilder;
    }

    static async initialize(deps) {
        return new RoomController(deps)._initialize();
    }

    async _initialize() {
        this._setupViewEvents();
        this.socket = this._setupSocket();
        this.peer = await this._setupWebRTC();

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
            .setOnUserProfileUpgraded(this.onUserProfileUpgraded())
            .build();
    }

    async _setupWebRTC() {
        return this.peerBuilder
            .setOnError(this.onPeerError())
            .setOnConnectionOpened(this.onPeerConnectionOpened())
            .build();
    }

    onPeerError() {
        return error => console.error(error);
    }

    onPeerConnectionOpened() {
        return peer => console.log(peer);
    }

    onUserProfileUpgraded() {
        return user => {
            Logger.log(`Promoting to owner: ${user.username} {ID ${user.id}}`);

            if (!user.isSpeaker) return;

            this.view.addAttendeeOnGrid(user, true);
        };
    }

    onRoomUpdated() {
        return attendees => this.view.updateAttendeesOnGrid(attendees);
    }

    onUserDisconnected() {
        return user => {
            Logger.log(`User disconnected: ${user.username} {ID ${user.id}}`);

            this.view.removeItemFromGrid(user.id);
        };
    }

    onUserConnected() {
        return user => {
            Logger.log(`New connection: ${user.username} {ID ${user.id}}`);

            this.view.addAttendeeOnGrid(user);
        };
    }
}
