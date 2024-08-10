const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const multer = require('multer');
const path = require('path');
const port = 8080;



const app = express();

//ทำให้ express สามารถอ่านข้อมูลตัวแปรที่ป้อนผ่าน form ใน web application
app.use(bodyParser.urlencoded({ extended: true }));

// ทำให้ express สามารถอ่านข้อมูลในรูปแบบ JSON ที่ได้รับจาก request ของ web application
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

//เชื่อม server 
const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'test-system-subject',
    password: '6410210573',
    port: 5432
});

pool.connect((err) => {
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
        const result = await pool.query(`select * from profile`);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving section');
    }
});

// เพิ่มข้อมูลส่วนที่ 1
app.post('/test/add_basic_info', async (req, res) => {
    // const input = req.body;

    const { curriculum_id, thai_name, english_name, faculty_id, year_started, course_id, learn_outcomes } = req.body;


    try {
        await pool.query(`INSERT INTO basic_infos(
	curriculum_id, thai_name, english_name, faculty_id, year_started, course_id, learn_outcomes)
	VALUES (1, $2, $3, $4, $5, $6, $7);`,
            [
                curriculum_id, thai_name, english_name, faculty_id, year_started, course_id, learn_outcomes
            ]);
        res.status(201).send('Add successfull');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding authors');
    }
});


app.put('/test/update', async (req, res) => {

    const { id, name } = req.body;
    // const id = req.id;
    // const name = req.name;

    try {
        await pool.query(`update profile set name = $1 where id = $2`, [name, id]);
        // res.json(result.rows);
        res.status(201).send('update successfull');
        console.log();
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving section');
    }
});


app.put('/test/update/:id', async (req, res) => {
    const { id } = req.params;
    // const id = req.id;
    const { name } = req.body;

    try {
        await pool.query(`update profile set name = $1 where id = $2`, [name, id]);
        // res.json(result.rows);
        console.log();
        res.status(201).send('update successfull');

    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving section');
    }
});

app.delete('/test/test/deletebyid/:id', async (req, res) => {
    const { id } = req.params;
    // const {id} = req.params.id;
    // const {  } = req.body;

    try {
        await pool.query(`delete from profile where id = $1`,
            [
                id
            ]);
        res.status(201).send('Delete successfull');
        console.log();
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding authors');
    }
});


//  add user เพิ่มข้อมูลผู้ใช้ใหม่
app.post('/test/add_info_User', async (req, res) => {
    // const input = req.body;

    const {
        Position,
        Name,
        LastName,
        Affiliation,
        Username,
        Password,
        Email,
        Phone } = req.body;


    try {
        await pool.query(`insert into user_info (Position,Name,LastName,Username,Password,Email,Phone,Affiliation) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) `,
            [
                Position,
                Name,
                LastName,
                Affiliation,
                Username,
                Password,
                Email,
                Phone
            ]);
        res.status(201).send('Add successfull');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding authors');
    }
});


// delete user

app.delete('/test/delete_user', async (req, res) => {
    const { id } = req.params;
    // const {id} = req.params.id;
    // const {  } = req.body;

    try {
        await pool.query(`delete from user_info where id = $1`,
            [
                id
            ]);
        res.status(201).send('Delete successfull');
        console.log();
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding authors');
    }
});


// update user

app.put('/test/update/:id', async (req, res) => {
    const { id } = req.params;
    // const id = req.id;
    const { Position,
        Name,
        LastName,
        Affiliation,
        Password,
        Email,
        Phone } = req.body;

    try {
        await pool.query(`update profile set Name = $1,
            LastName = $2,
            Affiliation = $3,
            Password = $4,
            Email = $5,
            Phone = $6 where id = $7`, [Position,
            Name,
            LastName,
            Affiliation,
            Password,
            Email,
            Phone, id]);
        // res.json(result.rows);
        console.log();
        res.status(201).send('update successfull');

    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving section');
    }
});


app.listen(8080, () =>
    console.log(`Example app Listening on port ${port}`)
);