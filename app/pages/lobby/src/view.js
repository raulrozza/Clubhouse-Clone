import RoomComponent from './components/roomTemplate.js';
import Room from './entities/room.js';

const roomGrid = document.getElementById('roomGrid');

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

    static generateRoomLink({ id, topic }) {
        return `/room/index.html?id=${id}&topic=${topic}`;
    }
}
