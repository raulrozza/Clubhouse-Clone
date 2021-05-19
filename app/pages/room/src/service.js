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

    upgradeUserPermission(user) {
        if (!user.isSpeaker) return;

        const isCurrentUser = user.id === this.currentUser.id;
        if (!isCurrentUser) return;
        this.currentUser = user;
    }

    updateCurrentUserProfile(users) {
        this.currentUser = users.find(
            user => user.peerId === this.currentPeer.id,
        );
    }
}
