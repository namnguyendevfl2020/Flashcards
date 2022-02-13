# FLASHCARDS-O-MATIC  
FLASHCARDS-O-MATIC is created for students who want create different flashcards. 
You can access a working prototype of the Nextjs app here: https://flashcards-omega.vercel.app/ 

## Table of Contents
* [User Stories](#User-Stories)
* [Screenshots](#Screenshots)
* [Functionality](#Functionality)
* [Technology Used](#Technology-Used)
* [Front-end Route Structure](#Front-end-Route-Structure)
* [Back-end Structure](#Back-end-Structure)
* [API documentation](#API-Documentation)
* [Room for Improvement](#Room-For-Improvement)
* [Database Setup](#Database-Setup)
* [Installation](#Installation)
* [Acknowledgements](#Acknowledgements)
* [Contact](#contact)
<!-- * [License](#license) -->

## User Stories 

### Login Page 
* As a returning register user.
* I want to enter my password and username to use this app.
* So I can have access to my account.

### Sign Up 
* As a user. 
* I want to register to use this app.
* So I can create a personal account.

### Recover password 
* As a registered user.
* I want to recover my password by my phone number or my email.
* So I can create a new password and access to my account.

### Dashboard Page 
* As a logged-in user.
* I want to be able to view all saved decks and have the ability to create a new deck, view saved decks, study saved decks and delete them.
* So I can decide which deck to view, study or delete or I can create a new deck.

### Add a new deck Page 
* As a logged-in user.
* I want to be able to create a new deck with a name and a description. 
* So I can save the new deck to the dashboard.

### View Deck Page 
* As a logged-in user.
* I want to be able to view a deck with name, description and cards for this deck and have the ability to edit, study and delete the deck as well as edit and delete a card.
* So I can update the deck and cards, and add a new card.

### Study Deck Page 
* As a logged-in user.
* I want to be able to study a deck by displaying the front part of each card and have the ability to flip to the back side of that card as well as to continue the next card.
* So I can update study the deck by trying to answer the question of each card.

### Add a new card Page  
* As a logged-in user.
* I want to be able to create a new card with a front and a back.
* So I can add a questions to the front and a answer to the back and save them.

## Screenshots
### Login Page
![Login](/readmeScreenShots/Login_page.png)
### Signup Popup With Disabled Submit Button
![Signup initialState ](/readmeScreenShots/Signup_initial.png)
### Signup Popup  With Enabled Submit Button 
![Signup after filling](/readmeScreenShots/Signup__after_filling_out.png)

### ForgotPw Popup
![ForgotPw findUser](/readmeScreenShots/ForgotPw_findUser.png)
![ForgotPw sendToken](/readmeScreenShots/ForgotPw_sendToken.png)
![Token sent via email](/readmeScreenShots/Code_sent_to_phone.png)
![Token sent via phone](/readmeScreenShots/Code_sent_to_email.png)
![ForgotPw enterCode](/readmeScreenShots/ForgotPw_enterCode.png)
![ForgotPw enterNewPw](/readmeScreenShots/ForgotPw_newPw.png)

### Dashboard
![Dashboard](/readmeScreenShots/Dashboard.png)

### Create Deck
![Create deck](/readmeScreenShots/Create_deck.png)

### View Deck
![View deck](/readmeScreenShots/View_deck.png)

### Edit Deck
![Edit deck](/readmeScreenShots/Edit_deck.png)

### Study Deck 
![Study deck](/readmeScreenShots/Study_deck.png)
![Study deck](/readmeScreenShots/Study_deck_cards.png)

### Delete Deck
![Delete deck](/readmeScreenShots/Delete_alert.png)

### Create Card
![Create card](/readmeScreenShots/Create_card.png)

### Edit Card
![Edit card](/readmeScreenShots/Edit_card.png)

### Database ERD
![Db ERD](/readmeScreenShots/DbERD.png)

## Functionality 
The app's functionality includes:
* Every User has the ability to create an account
* Every User has the ability to login into the account
* Every User has the ability to create a newpassword with a verification code sent to their phone number or email.
* Every User has the ability to save decks to the app
* Every User has the ability to see all decks and modify them
* Every User has the ability to save cards for each deck to the app
* Every User has the ability to navigate to different pages using a breadcrumb
* Every User has the ability to continue to access the app after logging in unless he/she decides to use the guest mode

## Technology Used
* Front-End: HTML5, CSS3, JavaScript ES6, Bootstrap, React, Nextjs, Typescript.
* Back-End: Node.js, Express.js, Knex, RESTful API Endpoints, Typescript, Postgres.
* Development Environment: DBeaver.
* Misc.: argon2.
* API: Twilio, Nodemailer.
* 2FA: Speakeasy.

## Front-end Route Structure
*  __app.tsx__ 
    * __index.tsx__ 
    * __accounts__ 
        * __login.tsx__ 
    * __decks__ 
        * __[deckId]__ 
            * __index.tsx__
            * __edit.tsx__ 
            * __study.tsx__ 
            * __cards__ 
                * __[cardId]__ 
                    * __edit.tsx__ 
                * __new.tsx__ 

## Back-end Structure
* Users (database table)
    * user_id (auto-generated)
    * user_name (email and password validation)
    * password (at least 8 chars)
    * first_name,
    * last_name,
    * birthday,
    * age,
    * secrete_key,
    * is_active,
    * email,
    * phone_number,
    * unique_number,
    * dial_code,
    * country,
    * created_at,
    * updated_at

* decks (database table)
    * deck_id (auto-generated)
    * user_id, 
    * name,
    * description,
    * created_at,
    * updated_at

* cards (database table)
    * card_id (auto-generated)
    * user_id, 
    * deck_id,
    * front,
    * back,
    * created_at,
    * updated_at

## API Documentation 
API Documentation details:
### API Overview

```text
/api
.
├── /accounts
│   └── POST
│       ├── /login
│   └── POST
│       ├── /recoverPw
│   └── POST
│       ├── /signup
├── /:userId
│   └── cards
│      └── GET
│           ├── /
│      └── POST
│           ├── /new
│      └── /:cardId
│           └── DELETE
│               ├── /delete
│           └── PUT
│               ├── /edit
│   └── decks
│      └── GET
│           ├── /
│      └── POST
│           ├── /new
│      └── /:deckId
│           └── DELETE
│               ├── /delete
│           └── PUT
│               ├── /edit


```

### POST `/api/accounts/login`

```js
// req.body
{
    "user_name": "demo@gmail.com",
    "password": "Password1"
}

{
    "user_name": "813xxxxxxx",
    "password": "Password1"
}

{
    "user_name": "+1813xxxxxxx",
    "password": "Password1"
}

// res.body
{
  "authToken": String,
    "userId": 1
}
```

### POST `/api/accounts/recoverPw`

```js
// req.body for finding a user
{
"userName": '813xxxxxxx', 
"step": 'find user'
}

// res.body
{
    "userName": "+1813xxxxxxx",
    "email": "",
    "phoneNumber": "813xxxxxxx",
    "dialCode": "1",
}

// req.body for sending a token
{
    "userName": '+1813xxxxxxx', 
    "step": 'send token', 
    "method": 'phone'
}

// res.body
{
    "token sent"
}

// req.body for entering a code
{
    "userName": '+1813xxxxxxx', 
    "step": "verify token", 
    "token": "123456"
}

// res.body
{
    "true"
}


// req.body for creating a new pw
{
    "userName": '+1813xxxxxxx', 
    "password": "newpassword"
}

// res.body
{
    "updated"
}
```

### POST `/api/accounts/signup`

```js
// req.body for find a user
{
"birthday": "11/20/1916"
"dialCode": ""
"email": "myEmail@gmail.com"
"firstName": "first name"
"lastName": "last name"
"password": "password"
"phoneNumber": ""
"userName": "myEmail@gmail.com"
}
// res.body
{
    "signup sucessfully"
}

### GET `api/:userId/decks`

```js
// req.query
{
   userId: userId
}

// res.body
[
  {
  "id": 1,
  "deckId" : 1,
  "usersId": 1,
  "name": "Rendering in React",
  "description": "React's component structure allows for quickly building a complex web application that relies on",
  "updatedAt": "2022-02-12T01:03:01.242Z"
  }
]
```

### POST `/api/:userId/decks/new`

```js
// req.body
{
  "usersId": 1,
  "name": "Rendering in React",
  "description": "React's component structure allows for quickly building a complex web application that relies on",
}

// res.body
[
   {
  "id": 1,
  "deckId" : 1,
  "usersId": 1,
  "name": "Rendering in React",
  "description": "React's component structure allows for quickly building a complex web application that relies on",
  "updatedAt": "2022-02-12T01:03:01.242Z"
  }
]
```
### PUT `/api/:userId/decks/:deckId/edit`

```js
{
  "usersId": 1,
  "name": "Rendering in React edited",
  "description": "React's component structure allows for quickly building a complex web application that relies on",
}

// res.body
   {
  "id": 1,
  "deckId" : 1,
  "usersId": 1,
  "name": "Rendering in React",
  "description": "React's component structure allows for quickly building a complex web application that relies on",
  "updatedAt": "2022-02-12T01:03:01.242Z"
  }


```
### DELETE `/api/:userId/decks/:deckId/delete`

```js
// req.query
{
  deckId: deckId
}

// res.body

  {

  }

```

### Similar API structures for cards

## Room For Improvement
This is v1.0 of the app, but future enhancements are expected to include:
1. Connections - in order to share and learn from other users.
2. Add a landing page to describe the app.
2. Add instructions for each field of the signup popup so users will not be confused.

## Database Setup

1. Set up four new ElephantSQL database instances - development, test, preview, and production - by following the instruction in the "PostgreSQL: Creating & Deleting Databases" checkpoint.
1. After setting up your database instances, connect DBeaver to your new database instances by following the instruction in the "PostgreSQL: Installing DBeaver" checkpoint.

## Installation

1. Fork and clone this respository.
1. Run `cp ./env.sample .env`.
1. Update `.env` file with the connection URL's and other keys.
1. Run `npm install` to install project dependencies.
1. Run `npm run dev` to start your app in development mode.

If you have trouble getting the server to run, reach out for assistance.


## Acknowledgements

- This project was inspired by Thinkful flashcards capstone.
- This project was based on [JWT Authentication Tutorial with Example App](https://jasonwatmore.com/post/2021/08/04/next-js-11-jwt-authentication-tutorial-with-example-app) and [Redux fundementals tutorial](https://redux.js.org/tutorials/fundamentals/part-8-modern-redux).
- Many thanks to [Thinkful](https://www.thinkful.com/), [Marius Banea](https://www.linkedin.com/in/mariusbanea/), [Jason Watmore](https://jasonwatmore.com/), [Redux](https://redux.js.org/), and [Stackoverflow](https://stackoverflow.com/).

## Contact
Created by [Nam Nguyen](https://www.flynerd.pl/) - feel free to contact me!

