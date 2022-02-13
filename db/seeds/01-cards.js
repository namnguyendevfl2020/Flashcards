/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex.raw("TRUNCATE TABLE cards RESTART IDENTITY CASCADE")
        .then(function () {
          // Inserts seed entries
              return knex('cards').insert([
                {
                  "card_id": 1,
                  "front": "Differentiate between Real DOM and Virtual DOM.",
                  "back": "Virtual DOM updates are faster but do not directly update the HTML",
                  "deck_id": 1,
                  "created_at": "2022-1-10T08:30:32.326Z",
                  "updated_at": "2022-1-10T08:30:32.326Z",
                },
                {
                  "front": "How do you modify the state of a different React component?",
                  "back": "Not at all! State is visible to the component only.",
                  "deck_id": 1,
                  "card_id": 2,
                  "created_at": "2022-1-10T08:30:32.326Z",
                  "updated_at": "2022-1-10T08:30:32.326Z",
                },  
                {
                  "card_id": 3,
                  "front": "How do you pass data 'down' to a React child component?",
                  "back": "As properties or props",
                  "deck_id": 1,
                  "created_at": "2022-1-10T08:30:32.326Z",
                  "updated_at": "2022-1-10T08:30:32.326Z",
                },
                {
                  "front": "What path will match the follow Route?\n<Route>\n  <NotFound />\n</Route>",
                  "back": "All paths. A route with no path matches all URL's",
                  "deck_id": 2,
                  "card_id": 4,
                  "created_at": "2022-1-10T08:30:32.326Z",
                  "updated_at": "2022-1-10T08:30:32.326Z",
                },
                {
                  "front": "What does <Switch> do?",
                  "back": "Renders the first matching child <Route> ",
                  "deck_id": 2,
                  "card_id": 5,
                  "created_at": "2022-1-10T08:30:32.326Z",
                  "updated_at": "2022-1-10T08:30:32.326Z",
                },
              ]
              );
            });
      };
