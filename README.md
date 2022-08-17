# Node-MySQL Example

This example serve to help learners understand how to use MySQL + Express.

## Setup 
* Setup Instance of MySQL at [PlanetScale](https://planetscale.com/)
* Add a .env file in backend folder
```
DATABASE_URL=mysql://YourUserName:YourPassword@localHost:5432/YourDatabaseName
```

## Running Server
* Load all modules by running install or i
```
npm i
```
* Start Server
```
npm start
```

## API
### Create Table
* POST http://localhost:3000/api/table

### Drop Table
* DELETE http://localhost:3000/api/table

### Insert Row
* POST http://localhost:3000/api/message
* JSON { "message" : "Any thing you want to say" }

### Select Rows
* GET http://localhost:3000/api/message

### Select Row by ID
* GET http://localhost:3000/api/message/:id

### Update Row by ID
* PUT http://localhost:3000/api/message/:id
* JSON { "message" : "What you want to update" }