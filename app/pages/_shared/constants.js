export const constants = {
    socketUrl: 'http://localhost:3000',
    socketNamespaces: {
        room: 'room',
        lobby: 'lobby',
    },
    peerConfig: Object.values({
        id: undefined,
        /* config: {
            port: 9000,
            host: 'localhost',
            path: '/'
        } */
    }),
    pages: {
        lobby: '/pages/lobby',
        login: '/pages/login',
    },
    events: {
        USER_CONNECTED: 'userConnection',
        USER_DISCONNECTED: 'userDisconnection',

        JOIN_ROOM: 'joinRoom',

        LOBBY_UPDATED: 'lobbyUpdated',
        UPGRADE_USER_PERMISSION: 'upgradeUserPermission',

        SPEAK_REQUEST: 'speakRequest',
        SPEAK_ANSWER: 'speakAnswer',
    },
    firebaseConfig: {
        apiKey: 'AIzaSyBpBdS6JOp-qJcUjvZKK7bH8WcdhjDZWao',
        authDomain: 'semana-js-expert-46b24.firebaseapp.com',
        projectId: 'semana-js-expert-46b24',
        storageBucket: 'semana-js-expert-46b24.appspot.com',
        messagingSenderId: '617850127913',
        appId: '1:617850127913:web:b6719c4dd287fdb20cfe38',
        measurementId: 'G-4PQBSV798P',
    },
    storageKey: 'clubhousefake:storage:user',
};
