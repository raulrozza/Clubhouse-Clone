import { constants } from '../../_shared/constants.js';
import LobbyController from './controller.js';
import LobbySocketBuilder from './util/lobbySocket.js';

const user = {
    img: 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/pilot_traveller_person_avatar-512.png',
    username: 'Raul Rosá',
};

const socketBuilder = new LobbySocketBuilder({
    socketUrl: constants.socketUrl,
    namespace: constants.socketNamespaces.lobby,
});

(async () => await LobbyController.initialize({ socketBuilder, user }))();
