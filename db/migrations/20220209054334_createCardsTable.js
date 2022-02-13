/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable("cards", (table) => {
        table.increments("card_id").primary().notNullable();
        table.string("front").notNullable();
        table.string("back").notNullable();
        table.integer("deck_id").unsigned();
        table.foreign("deck_id")
            .references("deck_id")
            .inTable("decks")
            .onDelete("cascade");
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
    return knex.schema.dropTable("cards");
};
