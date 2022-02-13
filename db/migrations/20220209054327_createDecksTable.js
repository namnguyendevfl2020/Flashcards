/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable("decks", (table) => {
            table.increments("deck_id").primary().notNullable();
            table.string("name").notNullable();
            table.string("description").notNullable();
            table.integer("user_id").unsigned();
            table.foreign("user_id")
            .references("user_id")
            .inTable("users")
            .onDelete("cascade");
            table.timestamps(true, true);
          });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("decks");
};
