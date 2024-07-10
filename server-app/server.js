const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;

//เชื่อม server 
const { Client } = require('pg');
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'test1',
    password: '6410210573',
    port: 5432
});

client.connect((err) => {
    if (err) {
        console.error('error connecting to postgresql:', err);
        return;
    }
    console.log('connected to postgresql');
});


app.get('/', (req, res) => {
    res.send('Hellow World by ME!!!');
});

app.get('/test', async (req, res) => {
    try {
        const result = await client.query(`select * from profile`);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving section');
    }
});

app.put('/test/update/:id', async (req, res) => {

    const id = req.id;
    const name = req.name;

    try {
        await client.query(`update profile set name = $1 where id = $2`, [name, id]);
        // res.json(result.rows);
        res.status(201).send('update successfull');
        console.log();
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving section');
    }
})


app.listen(8080, () =>
    console.log(`Example app Listening on port ${port}`)
);