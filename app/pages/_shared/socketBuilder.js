export default class SocketBuilder {
    constructor({socketUrl}) {
        this.socketUrl = socketUrl
    }

    build() {
        const socket = globalThis.io.connect(this.socketUrl, {
            withCredentials: false
        })

        socket.on('connection', () => console.log('connection'))
        socket.on('userConnected', () => console.log('connection'))
        socket.on('userDisconnected', () => console.log('connection'))

        return socket
    }
}
