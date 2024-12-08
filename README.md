# Project 5 (Stage 3): Back End for React / What to Wear? Project

### Overview

- Intro
- Running the Project
- Testing
- Stage 3 (Sprint 12)
- Images
- Tech Used

## Intro

This is the back end application for the 6th project of the Triple Ten Software Engineering program. It's associated with Sprint 12 and 13.

The back-end project is focused on creating a server for the WTWR application. You’ll gain a deeper understanding of how to work with databases, set up security and testing, and deploy web applications on a remote machine. The eventual goal is to create a server with an API and user authorization.

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

Postman and MongoDB are needed to run the tests for this application

## Testing

Before committing your code, make sure you edit the file `sprint.txt` in the root folder. The file `sprint.txt` should contain the number of the sprint you're currently working on. For ex. 12

## Stage 3 (Sprint 12)

For the 3rd stage of the project in Sprint 12 (Introduction to Back End: Node.js and Express.js), we were assigned to create a back-end server for the React: What To Wear? project. Websites previously had the whole application run on a front-end server. However, more recently most websites implement a back-end server to allow for a higher level of security.

The third stage involves:

1)developing an Express.js project to build a server-side application

2)implementing error handling mechanisms to improve application reliability

3)configuring routes and controllers to handle API requests and ensure seamless functionality

4)integrating a MongoDB database with the server for efficient data storage and retrieval

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

## Routes Used

- CRUD (Create, Read, Update, Delete)

- createUser (Create; POST method) - http://localhost:3001/users
- createItem (Create; POST method) - http://localhost:3001/items
- getUsers (Read; GET method) - http://localhost:3001/users
- getUser (Read; GET method) - http://localhost:3001/users/:userId
- getItems (Read; GET method) - http://localhost:3001/items
- likeItem (Update; PUT method) - http://localhost:3001/items/:id/likes
- deleteItem (Delete; DELETE method) - http://localhost:3001/items/:id
- unlikeItem (Delete; DELETE method) - http://localhost:3001/items/:id/likes
