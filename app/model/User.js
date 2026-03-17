const Model = require("./Model");

module.exports = class User extends Model {
    static tablename = "users";
    static role = {
        user: "user",
        club: "club"
    }
    static status = {
        active: "active",
        block: "deactive",
    }
    static club = () => {
        return this.where("role", "=", this.role.club);
    }
    // this method for project label
    static addTaka = (id, taka = 0) => {
        this.update(id, { taka });
    }
    static block = (id) => {
        if (!id) throw "id not found";
        return this.update(id, { is_block: "yes" });
    }
    static Unblock = (id) => {
        if (!id) throw "id not found";
        return this.update(id, { is_block: "no" });
    }
    static active = (id) => {
        if (!id) throw "id not found";
        return this.update(id, { status: "active" });
    }
    static deactive = (id) => {
        if (!id) throw "id not found";
        return this.update(id, { status: "deactive" });
    }
    static sponser = ({ sponcer_by_id }) => {
        if (sponcer_by_id == "" || sponcer_by_id == null || sponcer_by_id == undefined || sponcer_by_id == "") return Promise.resolve({});
        return this.query().where("id", "=", sponcer_by_id).first();
    }
    static clubholder = ({ club_by_id }) => {
        if (club_by_id == "" || club_by_id == null || club_by_id == undefined || club_by_id == "") return Promise.resolve({});
        return this.query().where("id", "=", club_by_id).first();
    }
}