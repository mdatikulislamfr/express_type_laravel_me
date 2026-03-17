const { database } = require("../../config/db");
module.exports = class Model {
    static tablename = "";
    static primary_key = "id";
    // custom quary
    static query() {
        if (!this.tablename) throw new Error("Table name not defined in model");
        return database.table(this.tablename)
    }
    // any data find by primary key
    static async find(id) {
        if (!id) throw "id not found";
        const data = await this.query().where(this.primary_key, "=", id).first();
        if (!data) throw "invalid id";
        return data;
    };
    // any data delet by primary key
    static async del(id) {
        await this.find(id);
        return this.query().where(this.primary_key, "=", id).del();
    };
    // data insert
    static async add(data) {
        const id = await this.query().insert(data);
        return id.length > 0 ? this.find(id[0]) : id;
    }
    // data update
    static async update(id, callback) {
        const find = await this.find(id);
        const data = callback(find);
        if (!data) throw ("data not found!");
        const res = await this.query().update(data).where(this.primary_key, "=", id);
        return res ? await this.find(id) : res;
    }
    //    data get
    static get(select = "*") { return this.query().select(select) };
    // conditional 
    static where(column, operator, value = null) {
        if (value === null) {
            value = operator;
            operator = "=";
        }
        return this.query().where(column, operator, value);
    }
    static async paginate(page = 1, limit = 10) {
        page = parseInt(page);
        limit = parseInt(limit);

        const offset = (page - 1) * limit;

        const [data, total] = await Promise.all([
            this.query()
                .limit(limit)
                .offset(offset)
                .select("*"),

            this.query()
                .count({ total: "*" })
                .first()
        ]);

        return {
            data,
            meta: {
                total: total.total,
                per_page: limit,
                current_page: page,
                last_page: Math.ceil(total.total / limit)
            }
        };
    }

}