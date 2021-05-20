import { constants } from '../../_shared/constants.js';
import Logger from '../../_shared/logger.js';
import Attendee from './entities/attendee.js';

export default class RoomController {
    constructor({ socketBuilder, roomInfo, view, peerBuilder, roomService }) {
        this.socketBuilder = socketBuilder;
        this.roomInfo = roomInfo;
        this.view = view;
        this.peerBuilder = peerBuilder;
        this.roomService = roomService;

        this.socket = {};
    }

    static async initialize(deps) {
        return new RoomController(deps)._initialize();
    }

    async _initialize() {
        this._setupViewEvents();
        await this.roomService.init();
        this.socket = this._setupSocket();
        this.roomService.setCurrentPeer(await this._setupWebRTC());
    }

    _setupViewEvents() {
        this.view.configureClapButton(this.onClapPressed());
        this.view.updateUserImage(this.roomInfo.user);
        this.view.updateRoomTopic(this.roomInfo.room);
    }

    _setupSocket() {
        return this.socketBuilder
            .setOnUserConnected(this.onUserConnected())
            .setOnUserDisconnected(this.onUserDisconnected())
            .setOnRoomUpdated(this.onRoomUpdated())
            .setOnUserProfileUpgraded(this.onUserProfileUpgraded())
            .setOnSpeakRequest(this.onSpeakRequest())
            .setOnSpeakAnswer(this.onSpeakAnswer())
            .build();
    }

    async _setupWebRTC() {
        return this.peerBuilder
            .setOnError(this.onPeerError())
            .setOnConnectionOpened(this.onPeerConnectionOpened())
            .setOnCallReceived(this.onCallReceived())
            .setOnCallError(this.onCallError())
            .setOnCallClose(this.onCallClose())
            .setOnStreamReceived(this.onStreamReceived())
            .build();
    }

    onClapPressed() {
        return () => {
            this.socket.emit(
                constants.events.SPEAK_REQUEST,
                this.roomInfo.user,
            );
        };
    }

    onStreamReceived() {
        return (call, stream) => {
            const callerId = call.peer;
            const { isCurrentId } = this.roomService.addReceivedPeer(call);

            this.view.renderAudioElement({
                callerId,
                stream,
                isCurrentId,
            });
        };
    }

    onCallClose() {
        return call => this.roomService.disconnectPeer({ peerId: call.peer });
    }

    onCallError() {
        return (call, error) => {
            this.roomService.disconnectPeer({ peerId: call.peer });
            console.error(error);
        };
    }

    onCallReceived() {
        return async call => {
            const stream = await this.roomService.getCurrentStream();

            call.answer(stream);
        };
    }

    onPeerError() {
        return error => console.error(error);
    }

    onPeerConnectionOpened() {
        return peer => {
            this.roomInfo.user.peerId = peer.id;
            this.socket.emit(constants.events.JOIN_ROOM, this.roomInfo);
        };
    }

    onSpeakAnswer() {
        return socket => console.log(socket);
    }

    onSpeakRequest() {
        return user => {
            const attendee = new Attendee(user);
            const answer = confirm(
                `${attendee.username} pediu para falar! Aceitar?`,
            );

            this.socket.emit(constants.events.SPEAK_ANSWER, {
                answer,
                user: attendee,
            });
        };
    }

    onUserProfileUpgraded() {
        return user => {
            Logger.log(`Promoting to owner: ${user.username} {ID ${user.id}}`);

            this.roomService.upgradeUserPermission(user);

            if (!user.isSpeaker) return;

            this.view.addAttendeeOnGrid(user, true);
            this.activateUserFeatures();
        };
    }

    onRoomUpdated() {
        return attendees => {
            this.view.updateAttendeesOnGrid(attendees);
            this.roomService.updateCurrentUserProfile(attendees);
            this.activateUserFeatures();
        };
    }

    onUserDisconnected() {
        return user => {
            Logger.log(`User disconnected: ${user.username} {ID ${user.id}}`);

            this.view.removeItemFromGrid(user.id);

            this.roomService.disconnectPeer(user);
        };
    }

    onUserConnected() {
        return user => {
            Logger.log(`New connection: ${user.username} {ID ${user.id}}`);

            this.view.addAttendeeOnGrid(user);

            this.roomService.callNewUser(user);
        };
    }

    activateUserFeatures() {
        const currentUser = this.roomService.getCurrentUser();
        this.view.showUserFeatures(currentUser.isSpeaker);
    }
}
