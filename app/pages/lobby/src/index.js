import { constants } from '../../_shared/constants.js';
import UserDB from '../../_shared/userDb.js';
import LobbyController from './controller.js';
import LobbySocketBuilder from './util/lobbySocket.js';
import View from './view.js';

const user = UserDB.get();
if (!Object.keys(user).length) View.redirectToLogin();

const socketBuilder = new LobbySocketBuilder({
    socketUrl: constants.socketUrl,
    namespace: constants.socketNamespaces.lobby,
});

(async () =>
    await LobbyController.initialize({ socketBuilder, user, view: View }))();
