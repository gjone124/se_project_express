# Project 5 (Stage 3 / 4): Back End for React / What to Wear? Project

### Overview

- Intro
- Running the Project
- Testing
- Stage 1 (Sprint 10) (see se_project_react)
- Stage 2 (Sprint 11) (see se_project_react)
- Stage 3 (Sprint 12)
- Stage 4 (Sprint 13)
- Stage 5 (Sprint 14) (see se_project_react)
- Stage 6 (Sprint 15)
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

For the 4th stage of the project in Sprint 13 (Back-End Authentication and Authorization), we were assigned to implement additional features to the back end of the project.

The fourth stage involves:

1)implementing authorization through the use of a JWT token

2)incorporating email and password fields

3)incorporating signing up and logging in

4)adding a method to update the user (or the user's profile)

5)changing "GET /users/:userId" route to "GET /users/me" route

6)changing getUser method to getCurrentUser method

7)removing getUsers method

## Stage 6 (Sprint 15)

For the 6th stage of the project in Sprint 15 (Automated Testing and Cloud Deployment), we were assigned to implement additional error handling and to publish the website on the internet.

More specifically, the sixth stage involves:

1)setting up centralized error handling by adding separate middleware & defining constructors for errors

2)defining request validation functions in separate middleware using the joi, celebrate, & validator packages

3)implementing loggers for both requests & errors using winston package

4)creating a free tier account on Google Cloud (by giving them your credit card information which is supposed to be free for 90 days & then it automatically cancels after 90 days if you don't upgrade to a paid account)

5)creating virtual machine for remote server on Google Cloud & connecting to server through SSH

6)installing & configuring all required tools for deployment: Node.js, MongoDB, & Git

7)launching node application using PM2 process manager

8)creating an account on freedns.afraid.org in order to create subdomains

9)registering subdomains for both frontend & backend

10)configuring request redirection from public URLs to the application using nginx

11)encrypting data with SSL certificate

12)storing JSON web token in a .env file on the server

13)modifying "homepage" field in se_project_react's package.json file to route project to registered domain name [https://wtwr.theoceanforest.com] (project previously routed to GitHub Pages URL [https://gjone124.github.io/se_project_react/] )

14)modifying "deploy" field in se_project_react's package.json file to show "npm run build && scp -r ./dist/\* gjone124@wtwr.theoceanforest.com:/home/gjone124/frontend" (deploy field previously was "gh-pages -d dist")

15)uploading front end to the server & configuring ngnix to serve the front end

16)setting up server crash testing

17)adding a link to your website in your README.md file

## Images

**Images (Stage 3 / Sprint 12)**

Here are six screenshots associated with Project 5 Stage 3:

1)All Sprint 12 Tests Passed (Postman)

<div display="flex"><img align="center" alt="All Sprint 12 Tests Passed (Postman)" src="./assets/Stage 3 (Sprint 12)/All Sprint 12 Tests Passed (Postman).png" /></div><br>

2)All Sprint 12 Tests Passed (Github Action)

<div display="flex"><img align="center" alt="All Sprint 12 Tests Passed (Github Action)" src="./assets/Stage 3 (Sprint 12)/All Sprint 12 Tests Passed (Github Action).png" /></div><br>

3)User Added (Postman)

<div display="flex"><img align="center" alt="User Added (Postman)" src="./assets/Stage 3 (Sprint 12)/User Added (Postman).png" /></div><br>

4)User Added (MongoDB)

<div display="flex"><img align="center" alt="User Added (MongoDB)" src="./assets/Stage 3 (Sprint 12)/User Added (MongoDB).png" /></div><br>

5)Error Handling (Postman)

<div display="flex"><img align="center" alt="Error Handling (Postman)" src="./assets/Stage 3 (Sprint 12)/Error Handling (Postman).png" /></div><br>

6)Error Handling (VS Code Terminal)

<div display="flex"><img align="center" alt="Error Handling (VS Code Terminal)" src="./assets/Stage 3 (Sprint 12)/Error Handling (VS Code Terminal).png" /></div><br>

**Images (Stage 4 / Sprint 13)**

Here are two screenshots associated with Project 5 Stage 4:

1)All Sprint 13 Tests Passed (Postman)

<div display="flex"><img align="center" alt="All Sprint 13 Tests Passed (Postman)" src="./assets/Stage 4 (Sprint 13)/All Sprint 13 Tests Passed (Postman).png" /></div><br>

2)All Sprint 13 Tests Passed (Github Action)

<div display="flex"><img align="center" alt="All Sprint 13 Tests Passed (Github Action)" src="./assets/Stage 4 (Sprint 13)/All Sprint 13 Tests Passed (Github Action).png" /></div><br>

## Applications Used

- Postman (used for API development and testing)
- MongoDB (database to store data)
- GitHub Action (CI/CD (continuous integration and continuous deployment) tool for automating workflows within GitHub repository)
- Google Cloud (used to deploy project to the internet)
- FreeDNS (used to register free subdomain name; freedns.afraid.org)

## Tech Used

Implemented During Sprint 12

- Javascript (programming language)
- JSON (Javascript Object Notation)
- Node.js (runtime environment that allows Javascript to run outside web browser)
- Express.js (web application framework for Node.js)
- Mongoose (Object Data Modeling library for Node.js and MongoDB)
- ES Lint (tool that identifies and fixes problems in your code; ES stands for ECMAScript which stands for European Computer Manufacturers Association Script)
- Schema (framework that defines how data is organized)
- Routes (define endpoints in application that map to a functionality)
- Controllers (handles routes by porcessing requests, interacting with database, and returning responses)
- Error Handling (ensures program doesn't crash by detecting, reporting, and resolving errors)
- User Validation (prevents invalid or harmful input from proceeding)

Added During Sprint 13

- Authorization (through the use of JSON Web Token)
- Encryption (through the use of bcrypt)
- Sign Up and Sign In Feature

Added During Sprint 15

- Data Encryption Using HTTPS, SSL, & Certbot

## Routes Used

- CRUD (Create, Read, Update, Delete)

Implemented During Sprint 12

- createUser (Create; POST method) - http://localhost:3001/users
- createItem (Create; POST method) - http://localhost:3001/items
- getUsers (Read; GET method) - http://localhost:3001/users
- getUser (Read; GET method) - http://localhost:3001/users/:userId
- getItems (Read; GET method) - http://localhost:3001/items
- likeItem (Update; PUT method) - http://localhost:3001/items/:itemId/likes
- deleteItem (Delete; DELETE method) - http://localhost:3001/items/:itemId
- unlikeItem (Delete; DELETE method) - http://localhost:3001/items/:itemId/likes

Still In Use For Sprint 13

- createItem (Create; POST method) - http://localhost:3001/items
- getItems (Read; GET method) - http://localhost:3001/items
- likeItem (Update; PUT method) - http://localhost:3001/items/:itemId/likes
- deleteItem (Delete; DELETE method) - http://localhost:3001/items/:itemId
- unlikeItem (Delete; DELETE method) - http://localhost:3001/items/:itemId/likes

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

Added During Sprint 15

- celebrate (enables Joi validation as middleware)
- winston (enables developer to understand why error occurs for user if we don't have access to their computer)
- express-winston

## Link to Front End Application of This Project

https://github.com/gjone124/se_project_react
