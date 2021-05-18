const imgUser = document.getElementById('imgUser');
const pTopic = document.getElementById('pTopic');

export default class View {
    static updateUserImage({ img, username }) {
        imgUser.src = img;
        imgUser.alt = username;
    }

    static updateRoomTopic({ topic }) {
        pTopic.innerHTML = topic;
    }
}
