import RoomComponent from './components/roomTemplate.js';
import Room from './entities/room.js';

const imgUser = document.getElementById('imgUser');
const roomGrid = document.getElementById('roomGrid');
const txtTopic = document.getElementById('txtTopic');
const btnCreateRoomWithTopic = document.getElementById(
    'btnCreateRoomWithTopic',
);
const btnCreateRoomWithoutTopic = document.getElementById(
    'btnCreateRoomWithoutTopic',
);

export default class View {
    static clearRoomsList() {
        roomGrid.innerHTML = '';
    }

    static updateRoomList(rooms) {
        View.clearRoomsList();

        rooms.forEach(room => {
            const params = new Room({
                ...room,
                roomLink: View.generateRoomLink(room),
            });

            const htmlComponent = RoomComponent(params);

            roomGrid.innerHTML += htmlComponent;
        });
    }

    static redirectToRoom(topic = '') {
        const uniqueId =
            Date.now().toString(36) + Math.random().toString(36).substring(2);
        window.location = View.generateRoomLink({ id: uniqueId, topic });
    }

    static configureCreateRoomButton() {
        btnCreateRoomWithTopic.addEventListener('click', () => {
            const topic = txtTopic.value;
            View.redirectToRoom(topic);
        });

        btnCreateRoomWithoutTopic.addEventListener('click', () =>
            View.redirectToRoom(),
        );
    }

    static generateRoomLink({ id, topic }) {
        return `./../room/index.html?id=${id}&topic=${topic}`;
    }

    static updateUserImage({ img, username }) {
        imgUser.src = img;
        imgUser.alt = username;
    }
}
