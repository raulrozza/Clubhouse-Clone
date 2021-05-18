export default class Attendee {
    constructor({ id, username, img, isSpeaker, roomId, peerId }) {
        this.id = id;
        this.img = img || '';
        this.isSpeaker = isSpeaker;
        this.roomId = roomId;
        this.peerId = peerId;

        const name = username || 'Usuário Anônimo';
        this.username = name;

        const [firstname, ...lastname] = name.split(/\s/);
        this.firstname = firstname;
        this.lastname = lastname?.join(' ');
    }
}
