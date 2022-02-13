/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex.raw("TRUNCATE TABLE users RESTART IDENTITY CASCADE")
        .then(function () {
          // Inserts seed entries
              return knex('users').insert([
                {
                  "age": null,
                  "birthday": "1917-11-18T05:00:00.000Z",
                  "created_at": "2022-02-05T03:36:45.324Z",
                  "dial_code": "1",
                  "email": null,
                  "first_name": "Nam",
                  "is_active": false,
                  "last_name": "Nguyen",
                  "password": "$argon2id$v=19$m=4096,t=3,p=1$xd+mho+hteO7nLOajpBLyw$hI+pgJZBcIfnI3xbwg///NsnSv8dbM+/h5sW49sr904",
                  "phone_number": "8134202585",
                  "secret_key": "{\"ascii\":\")TrIQDN,?v9$)t7#sR0[ToU*8<2<{&\",\"hex\":\"2954724951444e2c3f763924297437237352305b546f552a383c323c7b26\",\"base32\":\"FFKHESKRIRHCYP3WHESCS5BXENZVEMC3KRXVKKRYHQZDY6ZG\",\"otpauth_url\":\"otpauth://totp/SecretKey?secret=FFKHESKRIRHCYP3WHESCS5BXENZVEMC3KRXVKKRYHQZDY6ZG\"}",
                  "unique_number": true,
                  "updated_at": "2022-02-05T03:36:45.324Z",
                  "user_id": 3,
                  "user_name": "+18134202585",
                  "country": "Italy"
                },
                {
                  "age": null,
                  "birthday": "1917-11-18T05:00:00.000Z",
                  "created_at": "2022-02-05T03:36:45.324Z",
                  "dial_code": "1",
                  "email": null,
                  "first_name": "Nam",
                  "is_active": false,
                  "last_name": "Nguyen",
                  "password": "$argon2id$v=19$m=4096,t=3,p=1$xd+mho+hteO7nLOajpBLyw$hI+pgJZBcIfnI3xbwg///NsnSv8dbM+/h5sW49sr904",
                  "phone_number": "8134202585",
                  "secret_key": "{\"ascii\":\")TrIQDN,?v9$)t7#sR0[ToU*8<2<{&\",\"hex\":\"2954724951444e2c3f763924297437237352305b546f552a383c323c7b26\",\"base32\":\"FFKHESKRIRHCYP3WHESCS5BXENZVEMC3KRXVKKRYHQZDY6ZG\",\"otpauth_url\":\"otpauth://totp/SecretKey?secret=FFKHESKRIRHCYP3WHESCS5BXENZVEMC3KRXVKKRYHQZDY6ZG\"}",
                  "unique_number": true,
                  "updated_at": "2022-02-05T03:36:45.324Z",
                  "user_id": 2,
                  "user_name": "+18134202587",
                  "country": "USA"
                },
                {
                  "age": null,
                  "birthday": "1917-11-18T05:00:00.000Z",
                  "created_at": "2022-02-05T03:36:45.324Z",
                  "dial_code": "1",
                  "email": "hoainamdk3512@gmail.com",
                  "first_name": "Nam",
                  "is_active": false,
                  "last_name": "Nguyen",
                  "password": "$argon2id$v=19$m=4096,t=3,p=1$xd+mho+hteO7nLOajpBLyw$hI+pgJZBcIfnI3xbwg///NsnSv8dbM+/h5sW49sr904",
                  "phone_number": "8134202585",
                  "secret_key": "{\"ascii\":\")TrIQDN,?v9$)t7#sR0[ToU*8<2<{&\",\"hex\":\"2954724951444e2c3f763924297437237352305b546f552a383c323c7b26\",\"base32\":\"FFKHESKRIRHCYP3WHESCS5BXENZVEMC3KRXVKKRYHQZDY6ZG\",\"otpauth_url\":\"otpauth://totp/SecretKey?secret=FFKHESKRIRHCYP3WHESCS5BXENZVEMC3KRXVKKRYHQZDY6ZG\"}",
                  "unique_number": true,
                  "updated_at": "2022-02-05T03:36:45.324Z",
                  "user_id": 4,
                  "user_name": "hoainamdk3512@gmail.com",
                  "country": "USA"
                },
              ]
              );
            });
      };
