class BaseClass {
    constructor(params) {
            this._params = params
        } //TO BE OVEREWRITTEN
    set _params(p) {
        if (typeof p === "object") {
            this.__paramKeys = [];
            for (const key in p) {
                this["_" + key] = p[key];
                this.__paramKeys.push(key);
            }

        }

    }
    get _params() {
        if (typeof this.__paramKeys !== "undefined") {
            const resultObj = {}
            for (const key of this.__paramKeys) {
                resultObj[key] = this["_" + key];
            }
            return resultObj;
        }
        return null;
    }
}


if (typeof module !== 'undefined' && module.exports) {

    module.exports = BaseClass
}
console.log("BaseClass Loaded");
