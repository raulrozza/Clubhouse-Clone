import { constants } from '../../_shared/constants.js';
import RoomController from './controller.js';
import RoomSocketBuilder from './util/roomSocket.js';
import View from './view.js';

const room = {
    id: Date.now(),
    topic: 'JS Expert é noix',
};

const user = {
    img: 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/pilot_traveller_person_avatar-512.png',
    username: 'Raul Rosá',
};

const roomInfo = {
    user,
    room,
};

const socketBuilder = new RoomSocketBuilder({
    socketUrl: constants.socketUrl,
    namespace: constants.socketNamespaces.room,
});

(async () =>
    await RoomController.initialize({ socketBuilder, roomInfo, view: View }))();
