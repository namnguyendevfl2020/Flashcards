/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex.raw("TRUNCATE TABLE decks RESTART IDENTITY CASCADE")
        .then(function () {
          // Inserts seed entries
              return knex('decks').insert([
                {
                  "deck_id": 1,
                  "name": "Rendering in React",
                  "description": "React's component structure allows for quickly building a complex web application that relies on DOM manipulation. ",
                  "created_at": "2022-1-10T08:30:32.326Z",
                  "updated_at": "2022-1-10T08:30:32.326Z",
                },
                {
                  "name": "React Router",
                  "description": "React Router is a collection of navigational components that compose declaratively with your application.",
                  "deck_id": 2,
                  "created_at": "2022-1-10T08:30:32.326Z",
                  "updated_at": "2022-1-10T08:30:32.326Z",
                }
              ]
              );
            });
      };
