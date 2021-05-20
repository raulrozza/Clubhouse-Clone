import { constants } from '../../../_shared/constants.js';
import SocketBuilder from '../../../_shared/socketBuilder.js';

export default class RoomSocketBuilder extends SocketBuilder {
    constructor({ socketUrl, namespace }) {
        super({ socketUrl, namespace });
        this.onRoomUpdated = () => {};
        this.onUserProfileUpgraded = () => {};
        this.onSpeakRequest = () => {};
        this.onSpeakAnswer = () => {};
    }

    setOnRoomUpdated(fn) {
        this.onRoomUpdated = fn;

        return this;
    }

    setOnUserProfileUpgraded(fn) {
        this.onUserProfileUpgraded = fn;

        return this;
    }

    setOnSpeakRequest(fn) {
        this.onSpeakRequest = fn;

        return this;
    }

    setOnSpeakAnswer(fn) {
        this.onSpeakAnswer = fn;

        return this;
    }

    build() {
        const socket = super.build();

        socket.on(constants.events.LOBBY_UPDATED, this.onRoomUpdated);
        socket.on(
            constants.events.UPGRADE_USER_PERMISSION,
            this.onUserProfileUpgraded,
        );
        socket.on(constants.events.SPEAK_REQUEST, this.onSpeakRequest);
        socket.on(constants.events.SPEAK_ANSWER, this.onSpeakAnswer);

        return socket;
    }
}
