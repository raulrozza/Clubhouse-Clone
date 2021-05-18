export default class LobbyController {
    constructor({ socketBuilder, user, view }) {
        this.socketBuilder = socketBuilder;
        this.user = user;
        this.view = view;
    }

    static async initialize(deps) {
        return new LobbyController(deps)._init();
    }

    _init() {
        this.socket = this._setupSocket();
    }

    _setupSocket() {
        return this.socketBuilder
            .setOnLobbyUpdated(this.onLobbyUpdated())
            .build();
    }

    onLobbyUpdated() {
        return rooms => this.view.updateRoomList(rooms);
    }
}
