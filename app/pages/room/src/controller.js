import { constants } from '../../_shared/constants.js';

export default class RoomController {
    constructor({ socketBuilder, roomInfo }) {
        this.socketBuilder = socketBuilder;
        this.roomInfo = roomInfo;
    }

    static async initialize(deps) {
        return new RoomController(deps)._initialize();
    }

    async _initialize() {
        const socket = this.socketBuilder
            .setOnUserConnected(user => console.log('user connected!', user))
            .setOnUserDisconnected(user =>
                console.log('user disconnected', user),
            )
            .setOnRoomUpdated(room => console.log('room list', room))
            .build();

        socket.emit(constants.events.JOIN_ROOM, this.roomInfo);
    }
}
