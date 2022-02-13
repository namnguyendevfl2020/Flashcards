import { User } from "lib/global/types";

const knex = require("../../../db/connection");

const tableName = "users";

interface UserDb {
    first_name: string;
    last_name: string;
    user_name: string;
    secret_key: string;
    phone_number: string;
    email: string;
    dial_code: string;
    country: string;
    birthday:string;
}

function list() {
    return knex(tableName)
    .select("*",{"id": "user_id"});
};

function post(user: UserDb) {
    return knex(tableName).insert(user).then(() => {
        return knex(tableName).select("*", {"id": "user_id"}).where({"user_name": user.user_name})
    })
};

function update(id: number, user: User) {
	return knex(tableName)
		.where({ user_id: id })
		.update({ ...user})
		.returning("*");
};

function _delete (id: number) {
    return knex(tableName)
            .where({user_id: id})
            .del();
};

function readUserName (userName: string) {
    return knex(tableName).where({user_name: userName}).select("*", {"id": "user_id"});
};

function readPhoneNumber (phoneNumber: string) {
    return knex(tableName).where({phone_number: phoneNumber}).select("*", {"id": "user_id"});
};

export const service = { 
    list,
    post,
    update,
    _delete,
    readUserName,
    readPhoneNumber
};
