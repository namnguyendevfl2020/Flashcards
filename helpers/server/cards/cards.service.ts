import { Card} from "lib/global/types";
const knex = require("../../../db/connection");
const tableName = "cards";

function list(userId: number) {
    return knex(tableName).select("*", {"id": "card_id"}).where({user_id:userId});
};

function listByDeckId(deckId: number) {
    return knex(tableName).select("*", {"id": "card_id"}).where({deck_id:deckId});
};

function create(card: Card) {
    return knex(tableName).insert(card).returning("*");
};

function update(card_id: number, card: Card) {
	return knex(tableName)
		.where({ card_id: card_id })
		.update({ ...card })
		.returning("*");
};

function _delete (cardId: number) {
    return knex(tableName)
            .where({card_id: cardId})
            .del();
};

export const service = { 
    list,
    listByDeckId,
    create,
    update,
    _delete
};
