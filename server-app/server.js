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

// ส่วนของการเพิ่มข้อมูล

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


// เพิ่มข้อมูลส่วนที่ 1
app.post('/add_basic_info', async (req, res) => {
    // const input = req.body;

    const { Nature, AdditionalInfo, Campus, MajorThai, MajorEng, DegreeName, Faculty, YearStarted, Affiliation, LearningOutcome } = req.body;


    try {
        await pool.query(`INSERT INTO basic_info(
	Nature,AddtionalInfo, Campus, MajorThai, MajorEng,DegreeName, faculty_id, yearstarted, Affiliation, learn_outcomes)
	VALUES ($1, $2, $3, $4, $5, $6, $7,$8,$9,$10);`,
            [
                Nature, AdditionalInfo, Campus, MajorThai, MajorEng, DegreeName, Faculty, YearStarted, Affiliation, LearningOutcome
            ]);
        res.status(201).send('Add successfull');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding authors');
    }
});

// เพิ่มข้อมูลส่วนที่ 2
app.post('/add_basic_info', async (req, res) => {
    // const input = req.body;

    const { Nature, AdditionalInfo, Campus, MajorThai, MajorEng, DegreeName, Faculty, YearStarted, Affiliation, LearningOutcome } = req.body;


    try {
        await pool.query(`INSERT INTO basic_info(
	Nature,AddtionalInfo, Campus, MajorThai, MajorEng,DegreeName, faculty_id, yearstarted, Affiliation, learn_outcomes)
	VALUES ($1, $2, $3, $4, $5, $6, $7,$8,$9,$10);`,
            [
                Nature, AdditionalInfo, Campus, MajorThai, MajorEng, DegreeName, Faculty, YearStarted, Affiliation, LearningOutcome
            ]);
        res.status(201).send('Add successfull');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding authors');
    }
});

// เพิ่มข้อมูลส่วนที่ 3
app.post('/add_basic_info', async (req, res) => {
    // const input = req.body;

    const { Nature, AdditionalInfo, Campus, MajorThai, MajorEng, DegreeName, Faculty, YearStarted, Affiliation, LearningOutcome } = req.body;


    try {
        await pool.query(`INSERT INTO basic_info(
	Nature,AddtionalInfo, Campus, MajorThai, MajorEng,DegreeName, faculty_id, yearstarted, Affiliation, learn_outcomes)
	VALUES ($1, $2, $3, $4, $5, $6, $7,$8,$9,$10);`,
            [
                Nature, AdditionalInfo, Campus, MajorThai, MajorEng, DegreeName, Faculty, YearStarted, Affiliation, LearningOutcome
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

// เพิ่มข้อมูลส่วนที่ 4
app.post('/add_basic_info', async (req, res) => {
    // const input = req.body;

    const { Nature, AdditionalInfo, Campus, MajorThai, MajorEng, DegreeName, Faculty, YearStarted, Affiliation, LearningOutcome } = req.body;


    try {
        await pool.query(`INSERT INTO basic_info(
	Nature,AddtionalInfo, Campus, MajorThai, MajorEng,DegreeName, faculty_id, yearstarted, Affiliation, learn_outcomes)
	VALUES ($1, $2, $3, $4, $5, $6, $7,$8,$9,$10);`,
            [
                Nature, AdditionalInfo, Campus, MajorThai, MajorEng, DegreeName, Faculty, YearStarted, Affiliation, LearningOutcome
            ]);
        res.status(201).send('Add successfull');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding authors');
    }
});


// เพิ่มข้อมูลส่วนที่ 5
app.post('/add_basic_info', async (req, res) => {
    // const input = req.body;

    const { Nature, AdditionalInfo, Campus, MajorThai, MajorEng, DegreeName, Faculty, YearStarted, Affiliation, LearningOutcome } = req.body;


    try {
        await pool.query(`INSERT INTO basic_info(
	Nature,AddtionalInfo, Campus, MajorThai, MajorEng,DegreeName, faculty_id, yearstarted, Affiliation, learn_outcomes)
	VALUES ($1, $2, $3, $4, $5, $6, $7,$8,$9,$10);`,
            [
                Nature, AdditionalInfo, Campus, MajorThai, MajorEng, DegreeName, Faculty, YearStarted, Affiliation, LearningOutcome
            ]);
        res.status(201).send('Add successfull');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding authors');
    }
});

// เพิ่มข้อมูลส่วนที่ 6
app.post('/add_basic_info', async (req, res) => {
    // const input = req.body;

    const { Nature, AdditionalInfo, Campus, MajorThai, MajorEng, DegreeName, Faculty, YearStarted, Affiliation, LearningOutcome } = req.body;


    try {
        await pool.query(`INSERT INTO basic_info(
	Nature,AddtionalInfo, Campus, MajorThai, MajorEng,DegreeName, faculty_id, yearstarted, Affiliation, learn_outcomes)
	VALUES ($1, $2, $3, $4, $5, $6, $7,$8,$9,$10);`,
            [
                Nature, AdditionalInfo, Campus, MajorThai, MajorEng, DegreeName, Faculty, YearStarted, Affiliation, LearningOutcome
            ]);
        res.status(201).send('Add successfull');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding authors');
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
        Username,
        Password,
        Email,
        Phone,
        Affiliation,
        Campus } = req.body;


    try {
        await pool.query(`insert into user_info (Position,Name,LastName,Username,Password,Email,Phone,Affiliation,Campus) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) `,
            [
                Position,
                Name,
                LastName,
                Username,
                Password,
                Email,
                Phone,
                Affiliation,
                Campus
            ]);
        res.status(201).send('Add successfull');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding authors');
    }
});


// delete user

app.delete(`/test/delete_user/:id`, async (req, res) => {
    const { id } = req.params;
    // const { id } = req.params.id;
    // const {  } = req.body;

    try {
        await pool.query(`DELETE from user_info where id = $1`, [id]);
        res.status(201).send('Delete successfull');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding authors');
    }
});

app.get('/getinfo_user/all', async (req, res) => {
    try {
        const result = await pool.query(`select * from user_info`);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving section');
    }
});

// getuser by Id

app.get('/getinfo_user/:ById', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(`select * from user_info where id = $1`, [id]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving section');
    }
});

// update user

app.put('/test/update/:id', async (req, res) => {
    const { id } = req.params;
    // const id = req.id;
    const {
        Position,
        Name,
        LastName,
        Email,
        Phone,
        Affiliation,
        Campus } = req.body;

    try {
        await pool.query(`update profile set Name = $2,
            LastName = $3,
            Affiliation = $4,
            Email = $5,
            Phone = $6,
            Campus = $7 where id = $1`,
            [id,
                Position,
                Name,
                LastName,
                Email,
                Phone,
                Affiliation,
                Campus]);
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