export default class CustomMap extends Map {
    constructor({ observer }) {
        super();

        this._observer = observer;
    }

    set(...args) {
        const result = super.set(...args);
        this._observer.notify(this);

        return result;
    }

    delete(...args) {
        const result = super.delete(...args);
        this._observer.notify(this);

        return result;
    }
}
