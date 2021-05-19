export default class RoomService {
    constructor() {
        this.currentPeer = {};
        this.currentUser = {};
    }

    setCurrentPeer(peer) {
        this.currentPeer = peer;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    updateCurrentUserProfile(users) {
        this.currentUser = users.find(
            user => user.peerId === this.currentPeer.id,
        );
    }
}
