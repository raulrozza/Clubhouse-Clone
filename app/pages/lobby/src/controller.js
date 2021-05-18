export default class LobbyController {
    constructor({ socketBuilder, user }) {
        this.socketBuilder = socketBuilder;
        this.user = user;
    }

    static async initialize(deps) {
        return new LobbyController(deps)._init();
    }

    _init() {
        this.socket = this._setupSocket();
    }

    _setupSocket() {
        return this.socketBuilder.setOnLobbyUpdated(this.newMethod());
    }

    newMethod() {
        return rooms => console.log(rooms);
    }
}
