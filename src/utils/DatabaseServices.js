module.exports = class DatabaseServices {
    constructor(client) {
        this.client = client
    }

    async getWarns(_id=null) {
        if(!_id) return undefined;
        const WarnData = await this.client.database['Warns'].findOne({ 'UserId': _id })
        if(WarnData) return WarnData;

        const DBGuild = {
            id: _id
        }; return DBGuild;
    }

    async getUser(_id=null) {
        if(!_id) return undefined;
        const UserData = await this.client.database['User'].findOne({ 'id': _id })
        if(UserData) return UserData;

        const DBUser = {
            id: _id
        }; return DBUser;
    }
}