import Attendee from './entities/attendee.js';
import AttendeeComponent from './components/attendeeTemplate.js';

const imgUser = document.getElementById('imgUser');
const pTopic = document.getElementById('pTopic');
const gridSpeakers = document.getElementById('gridSpeakers');
const gridAttendees = document.getElementById('gridAttendees');

export default class View {
    static updateUserImage({ img, username }) {
        imgUser.src = img;
        imgUser.alt = username;
    }

    static updateRoomTopic({ topic }) {
        pTopic.innerHTML = topic;
    }

    static updateAttendeesOnGrid(users) {
        users.forEach(item => View.addAttendeeOnGrid(item));
    }

    static addAttendeeOnGrid(item) {
        const attendee = new Attendee(item);
        const htmlComponent = AttendeeComponent(attendee);
        const baseElement = attendee.isSpeaker ? gridSpeakers : gridAttendees;

        baseElement.innerHTML += htmlComponent;
    }
}
