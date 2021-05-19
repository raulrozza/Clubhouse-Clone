import Attendee from './entities/attendee.js';
import AttendeeComponent from './components/attendeeTemplate.js';

const imgUser = document.getElementById('imgUser');
const pTopic = document.getElementById('pTopic');
const gridSpeakers = document.getElementById('gridSpeakers');
const gridAttendees = document.getElementById('gridAttendees');
const btnClipBoard = document.getElementById('btnClipBoard');
const btnClap = document.getElementById('btnClap');
const btnMicrophone = document.getElementById('btnMicrophone');

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

    static removeItemFromGrid(id) {
        const existingItem = View._getExistingItemOnGrid({ id });
        existingItem?.remove();
    }

    static _getExistingItemOnGrid({ id, baseElement = document }) {
        const existingItem = baseElement.querySelector(`[id="${id}"]`);

        return existingItem;
    }

    static addAttendeeOnGrid(item, removeFirst = false) {
        const attendee = new Attendee(item);
        const id = attendee.id;
        const htmlComponent = AttendeeComponent(attendee);
        const baseElement = attendee.isSpeaker ? gridSpeakers : gridAttendees;

        if (removeFirst) {
            View.removeItemFromGrid(id);
            return (baseElement.innerHTML += htmlComponent);
        }

        const existingItem = View._getExistingItemOnGrid({
            id,
            baseElement,
        });

        if (existingItem) {
            return (existingItem.innerHTML = htmlComponent);
        }

        baseElement.innerHTML += htmlComponent;
    }

    static showUserFeatures(isSpeaker) {
        if (!isSpeaker) {
            btnMicrophone.classList.add('hidden');
            btnClipBoard.classList.add('hidden');
            btnClap.classList.remove('hidden');
            return;
        }

        btnClap.classList.add('hidden');
        btnMicrophone.classList.remove('hidden');
        btnClipBoard.classList.remove('hidden');
    }
}
