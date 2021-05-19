import { constants } from '../../_shared/constants.js';
import Media from '../../_shared/media.js';
import PeerBuilder from '../../_shared/peerBuilder.js';
import RoomController from './controller.js';
import RoomService from './service.js';
import RoomSocketBuilder from './util/roomSocket.js';
import View from './view.js';

const urlParams = new URLSearchParams(window.location.search);
const keys = ['id', 'topic'];
const urlData = keys.map(key => [key, urlParams.get(key)]);

const room = Object.fromEntries(urlData);

const user = {
    img: 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/pilot_traveller_person_avatar-512.png',
    username: 'Raul Rosá',
};

const roomInfo = {
    user,
    room,
};

const peerBuilder = new PeerBuilder({
    peerConfig: constants.peerConfig,
});

const socketBuilder = new RoomSocketBuilder({
    socketUrl: constants.socketUrl,
    namespace: constants.socketNamespaces.room,
});

const roomService = new RoomService({
    media: Media,
});

(async () =>
    await RoomController.initialize({
        socketBuilder,
        roomInfo,
        view: View,
        peerBuilder,
        roomService,
    }))();
