module.exports = class BasedListener {
    constructor(client) {
        this.client = client
        this.name = ''
        this.emit = "" || "on"
    }

    async init() {}
}