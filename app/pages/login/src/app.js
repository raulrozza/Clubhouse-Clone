import { constants } from '../../_shared/constants.js';
import UserDB from '../../_shared/userDb.js';

const firebase = window.firebase;

function redirectToLobby() {
    window.location = constants.pages.lobby;
}

function onLogin({ provider, firebase }) {
    return async () => {
        try {
            const result = await firebase.auth().signInWithPopup(provider);

            const { user } = result;
            const userData = {
                img: user.photoURL,
                username: user.displayName,
            };

            UserDB.insert(userData);

            redirectToLobby();
        } catch (error) {
            console.error(error.message);
        }
    };
}

// Initialize Firebase
firebase.initializeApp(constants.firebaseConfig);
firebase.analytics();

const provider = new firebase.auth.GithubAuthProvider();
provider.addScope('read:user');

const btnLogin = document.getElementById('btnLogin');
btnLogin.addEventListener('click', onLogin({ provider, firebase }));
