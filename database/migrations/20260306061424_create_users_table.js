/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("users", (table) => {
        table.increments("id");
        table.string("name", 100);
        table.string("email", 15);
        table.string("pass", 255);
        table.enum("role", ['user']);
        table.enum("is_active", ["yes", "no"]).defaultTo("yes");
        table.enum("is_block", ['yes', 'no']).defaultTo("no");
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("users")
};
