//////////////////////////////////////////////////////
// INCLUDES
//////////////////////////////////////////////////////
const express = require('express');
const cors = require('cors');

const connection = require('./db'); //Import from db.js

//////////////////////////////////////////////////////
// INIT
//////////////////////////////////////////////////////
const app = express();
const PORT = process.env.PORT || 3000;

//////////////////////////////////////////////////////
// SETUP APP
//////////////////////////////////////////////////////
app.use(cors());
app.use(express.json());

// REQUIRED TO READ POST>BODY
// If not req.body is empty
app.use(express.urlencoded({ extended: false}));

//////////////////////////////////////////////////////
// DISPLAY SERVER RUNNING
//////////////////////////////////////////////////////
app.get('/',(req,res)=> {
    res.send(`Server running on port ${PORT}`)
});

app.listen(PORT,()=> {
    console.log(`App listening to port ${PORT}`);
});

//////////////////////////////////////////////////////
// POST GET METHODS
// http://localhost:3000/api/
// Use Postman to test
//////////////////////////////////////////////////////
app.get('/api', async (req, res, next) => {
    console.log(req.query);

    res.json(req.query);
});

app.post('/api', async (req, res, next) => {
    console.log(req.body);

    res.json(req.body);
});

//////////////////////////////////////////////////////
// SETUP DB
//////////////////////////////////////////////////////
const CREATE_TABLE_SQL = `
    CREATE TABLE messages (
        id INT NOT NULL AUTO_INCREMENT,
        message TEXT NOT NULL,
        PRIMARY KEY (id)
    );
`;

app.post('/api/table', (req, res, next) => {
    
    connection.promise().query(CREATE_TABLE_SQL)
    .then(() => {
         res.send(`Table created`);
    })
    .catch((error) => {
        res.send(error);
    });
});

//////////////////////////////////////////////////////
// CLEAR DB
//////////////////////////////////////////////////////
const DROP_TABLE_SQL = `
    DROP TABLE IF EXISTS messages;
`;

app.delete('/api/table', (req, res, next) => {
    
    connection.promise().query(DROP_TABLE_SQL)
    .then(() => {
        res.send(`Table dropped`);
    })
    .catch((error) => {
        res.send(error);
    });
});

//////////////////////////////////////////////////////
// POST GET METHODS CONNECTED TO DB
//////////////////////////////////////////////////////
app.get('/api/message', async (req, res, next) => {
    
    try
    {
        console.log(req.query);

        const allMessage = await connection.promise().query("SELECT * FROM messages"); 

        res.json(allMessage[0]);
    }
    catch(error)
    {
        console.error(error);
        res.send(error);
    }
});

app.post('/api/message', async (req, res, next) => {
    try
    {
        console.log(req.body);
        let message = req.body.message;
        console.log("message", message);
        const newInsert = await connection.promise().query("INSERT INTO messages (`message`) VALUES (?)", [message]);

        res.json(newInsert);
    }
    catch(error)
    {
        console.error(error);
        res.send(error);
    }
});

app.get('/api/message/:id', (req, res, next) => 
{
    console.log(req.params);
    let id = req.params.id;

    const SQLSTATEMENT = "SELECT * FROM messages WHERE id = ?";
    const VALUES = [id];

    connection.promise().query(SQLSTATEMENT, VALUES)
    .then(([rows,fields]) => {
        console.log(rows);
        res.json(rows);
    })
    .catch((error) => {
        res.send(error);
    });
});

app.put('/api/message/:id', (req, res, next) => 
{
    console.log(req.params);
    let id = req.params.id;

    let message = req.body.message;
    console.log("message", message);

    const SQLSTATEMENT = `
        UPDATE messages 
        SET 
            message = ?
        WHERE
            id = ?
    `;
    const VALUES = [message, id];

    connection.promise().query(SQLSTATEMENT, VALUES)
    .then(([rows,fields]) => {
        console.log(rows);
        res.json(rows);
    })
    .catch((error) => {
        res.send(error);
    });
});