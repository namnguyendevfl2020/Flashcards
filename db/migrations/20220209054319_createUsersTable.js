/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable("users", (table) => {
        table.increments("user_id").primary().notNullable();
        table.string("user_name").notNullable();
        table.string("password").notNullable();
        table.string("first_name").notNullable();
        table.string("last_name").notNullable();
        table.date("birthday");
        table.integer("age");
        table.string("secret_key",[1000]).notNullable();
        table.boolean("is_active").defaultTo(false);
        table.string("email");
        table.unique(["user_name"])
        // table.string("user_phone");
        table.string("phone_number");
        table.boolean("unique_number");
        table.string("dial_code");
        table.string("country");
        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("users");  
};
