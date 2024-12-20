# Project 5 (Stage 3): Back End for React / What to Wear? Project

### Overview

- Intro
- Running the Project
- Testing
- Stage 3 (Sprint 12)
- Stage 4 (Sprint 13)
- Images
- Applications Used
- Tech Used
- Routes Used
- Dependencies Used

## Intro

This is the back end application for the 6th project of the Triple Ten Software Engineering program. It's associated with Sprint 12 and 13.

The back-end project is focused on creating a server for the WTWR application. You’ll gain a deeper understanding of how to work with databases, set up security and testing, and deploy web applications on a remote machine. The eventual goal is to create a server with an API and user authorization.

## Running the Project

`npm install` - to install dependencies listed in package.json file

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

Postman and MongoDB are needed to run the tests for this application

## Testing

Before committing your code, make sure you edit the file `sprint.txt` in the root folder. The file `sprint.txt` should contain the number of the sprint you're currently working on. For ex. 12

## Stage 3 (Sprint 12)

For the 3rd stage of the project in Sprint 12 (Introduction to Back End: Node.js and Express.js), we were assigned to create a back-end server for the React: What To Wear? project. Websites previously had the whole application run on a front-end server (before the year 2000). However, more recently most websites implement a back-end server to allow for a higher level of security.

The third stage involves:

1)developing an Express.js project to build a server-side application

2)implementing error handling mechanisms to improve application reliability

3)configuring routes and controllers to handle API requests and ensure seamless functionality

4)integrating a MongoDB database with the server for efficient data storage and retrieval

5)implementing a temporary authorization solution

6)testing the project using Postman and GitHub Actions

## Stage 4 (Sprint 13)

The fourth stage involves:

1)implementing authorization through the use of a JWT token

2)incorporating email and password fields

3)incorporating signing up and logging in

4)adding a method to update the user (or the user's profile)

5)changing "GET /users/:userId" route to "GET /users/me" route

6)changing getUser method to getCurrentUser method

7)removing getUsers method

## Images

**Images (Stage 3)**

Here are six screenshots associated with Project 5 Stage 3:

1)All Tests Passed (Postman)

<div display="flex"><img align="center" alt="All Tests Passed (Postman)" src="./assets/Stage3/All Tests Passed (Postman).png" /></div><br>

2)All Tests Passed (Github Action)

<div display="flex"><img align="center" alt="All Tests Passed (Github Action)" src="./assets/Stage3/All Tests Passed (Github Action).png" /></div><br>

3)User Added (Postman)

<div display="flex"><img align="center" alt="User Added (Postman)" src="./assets/Stage3/User Added (Postman).png" /></div><br>

4)User Added (MongoDB)

<div display="flex"><img align="center" alt="User Added (MongoDB)" src="./assets/Stage3/User Added (MongoDB).png" /></div><br>

5)Error Handling (Postman)

<div display="flex"><img align="center" alt="Error Handling (Postman)" src="./assets/Stage3/Error Handling (Postman).png" /></div><br>

6)Error Handling (VS Code Terminal)

<div display="flex"><img align="center" alt="Error Handling (VS Code Terminal)" src="./assets/Stage3/Error Handling (VS Code Terminal).png" /></div><br>

## Applications Used

- Postman (used for API development and testing)
- MongoDB (database to store data)
- GitHub Action (CI/CD (continuous integration and continuous deployment) tool for automating workflows within GitHub repository)

## Tech Used

Implemented During Sprint 12

- Javascript (programming language)
- JSON (Javascript Object Notation)
- Node.js (runtime environment that allows Javascript to run outside web browser)
- Express.js (web application framework for Node.js)
- Mongoose (Object Data Modeling library for Node.js and MongoDB)
- ES Lint (tool that identifies and fixes problems in your coded)
- Schema (framework that defines how data is organized)
- Routes (define endpoints in application that map to a functionality)
- Controllers (handles routes by porcessing requests, interacting with database, and returning responses)
- Error Handling (ensures program doesn't crash by detecting, reporting, and resolving errors)
- User Validation (prevents invalid or harmful input from proceeding)

Added During Sprint 13

- Authorization (through the use of JSON Web Token)
- Sign Up and Sign In Feature

## Routes Used

- CRUD (Create, Read, Update, Delete)

Implemented During Sprint 12

- createUser (Create; POST method) - http://localhost:3001/users
- createItem (Create; POST method) - http://localhost:3001/items
- getUsers (Read; GET method) - http://localhost:3001/users
- getUser (Read; GET method) - http://localhost:3001/users/:userId
- getItems (Read; GET method) - http://localhost:3001/items
- likeItem (Update; PUT method) - http://localhost:3001/items/:id/likes
- deleteItem (Delete; DELETE method) - http://localhost:3001/items/:id
- unlikeItem (Delete; DELETE method) - http://localhost:3001/items/:id/likes

Still In Use For Sprint 13

- createItem (Create; POST method) - http://localhost:3001/items
- getItems (Read; GET method) - http://localhost:3001/items
- likeItem (Update; PUT method) - http://localhost:3001/items/:id/likes
- deleteItem (Delete; DELETE method) - http://localhost:3001/items/:id
- unlikeItem (Delete; DELETE method) - http://localhost:3001/items/:id/likes

Added During Sprint 13

- login (Create; POST method) - http://localhost:3001/signin
- updateProfile (Update; PATCH method) - http://localhost:3001/users/me

Modified During Sprint 13

- createUser (Create; POST method) - http://localhost:3001/signup
- getCurrentUser (previously called getUser) (Read; GET method) - http://localhost:3001/users/me

Removed During Sprint 13

- getUsers (Read; GET method) - http://localhost:3001/users

## Dependencies Used

Implemented During Sprint 12

- eslint (devDependency) (by typing "npm install eslint" into the terminal & pressing "Enter", the latest version of eslint is added to "package.json" and "package-lock.json")
- nodemon (devDependency)
- prettier (devDependency)
- express
- mongoose
- validator

Added During Sprint 13

- jsonwebtoken
- bcryptjs
- cors
