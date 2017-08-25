# Note Pad

A simple note pad application built with: 
* es6 (use babel)
* webpack for packaging client side code
* expressjs
* node
* npm
* React
* Redux
* and MySQL


And then deployed to Heroku: https://notepad-101.herokuapp.com/#

## Api Endpoints
* **Get all notes(supports query string) (GET): '/api/notes/:start?/:limit?/:order?'**
* **Get note by id (GET): '/api/note/:id'**
* **Add new note (POST): '/api/note/add'**
* **Update note by id (PUT): '/api/note/:id'**
* **Delete note by id (DELETE): '/api/note/:id'**

## Setup
* Create a DB with the name "notepad_development"
```
$ mysql> create database notepad_development;
```
* In the ./NotePad dir, create a ".env" file with the following values:
```
  LOCAL_DATABASE_PASSWORD = YOUR_DB_PASSWORD
```
* Install dependencies from terminal
```
  npm install
```
* Build project
```
  npm run build
```

## Start web server
* From your terminal 
```
  npm start
```
* Access the web app on your localhost:
```
http://localhost:8080/
```
