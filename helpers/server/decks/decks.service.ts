import { Deck } from "lib/global/types";
const knex = require("../../../db/connection");
const tableName = "decks";

function list(userId: number) {
    return knex(tableName).select("*", {"id": "deck_id"}).where({user_id:userId});
};

function create(deck: Deck) {
    return knex(tableName).insert(deck).returning("*");
};

function update(deck_id: number, deck: Deck) {
	return knex(tableName)
		.where({ deck_id: deck_id })
		.update({ ...deck })
		.returning("*", {"id": "deck_id"});
};

function _delete (deckId: number) {
    return knex(tableName)
            .where({deck_id: deckId})
            .del();
};

export const service = { 
    list,
    create,
    update,
    _delete,
};