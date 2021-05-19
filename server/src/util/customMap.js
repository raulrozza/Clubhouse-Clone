export default class CustomMap extends Map {
    constructor({ observer, customMapper }) {
        super();

        this._observer = observer;
        this._customMapper = customMapper;
    }

    *values() {
        for (const value of super.values()) {
            yield this._customMapper(value);
        }
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
