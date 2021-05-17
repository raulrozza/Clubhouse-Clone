import { constants } from './constants.js';

export default class SocketBuilder {
    constructor({ socketUrl, namespace }) {
        this.socketUrl = socketUrl;
        this.onUserConnected = () => undefined;
        this.onUserDisconnected = () => undefined;
    }

    setOnUserConnected(fn) {
        this.onUserConnected = fn;

        return this;
    }

    setOnUserDisconnected(fn) {
        this.onUserDisconnected = fn;

        return this;
    }

    build() {
        const socket = globalThis.io.connect(this.socketUrl, {
            withCredentials: false,
        });

        socket.on('connection', () => console.log('connection'));

        socket.on(constants.events.USER_CONNECTED, this.onUserConnected);
        socket.on(constants.events.USER_DISCONNECTED, this.onUserDisconnected);

        return socket;
    }
}
