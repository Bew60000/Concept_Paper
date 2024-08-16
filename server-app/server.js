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

// ส่วนของการเพิ่มข้อมูล

// เพิ่มข้อมูลส่วนที่ 1 basic_info
app.post('/add_basic_info', async (req, res) => {
    // const input = req.body;



    const { nature,
        additionalinfo,
        majorthai,
        majoreng,
        faculty,
        degreename,
        affiliation,
        campus,
        yearstarted,
        learningoutcome } = req.body;


    try {

        const result = await pool.query('SELECT curriculum_id FROM basic_infos ORDER BY curriculum_id DESC LIMIT 1');
        let lastId = result.rows[0]?.curriculum_id || 'C0000';


        let idNumber = parseInt(lastId.replace('C', ''), 10) + 1;
        let newCurriculumId = `C${idNumber.toString().padStart(4, '0')}`;

        // nature	additionalInfo	faculty	campus	majorthai	majoreng	degreename	affiliation	yearstarted	learningoutcome
        await pool.query(`INSERT INTO basic_infos(
            curriculum_id,
	        nature,
            additionalinfo,
            majorthai,
            majoreng,
            faculty,
            degreename, 
            affiliation,
            campus, 
            yearstarted, 
            learningoutcome)
	        VALUES ($1, $2, $3, $4, $5, $6, $7,$8,$9,$10,$11);`,
            [
                newCurriculumId, nature, additionalinfo, majorthai, majoreng, faculty, degreename, affiliation, campus, yearstarted, learningoutcome
            ]);

        res.status(201).json({ curriculum_id: newCurriculumId });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding authors');
    }
});

app.put('/update_basic_info/:curriculum_id', async (req, res) => {
    const { curriculum_id } = req.params;
    // const id = req.id;
    const {
        nature,
        additionalinfo,
        majorthai,
        majoreng,
        faculty,
        degreename,
        affiliation,
        campus,
        yearstarted,
        learningoutcome } = req.body;

    try {
        await pool.query(`UPDATE basic_infos
	SET nature = $1, additionalinfo=$2, majorthai=$3, majoreng=$4, faculty=$5, degreename=$6, affiliation=$7, campus=$8, yearstarted=$9, learningoutcome=$10
	WHERE curriculum_id = $11 RETURNING *`,
            [
                nature,
                additionalinfo,
                majorthai,
                majoreng,
                faculty,
                degreename,
                affiliation,
                campus,
                yearstarted,
                learningoutcome, curriculum_id]);
        // res.json(result.rows);

        res.status(201).send('update successfull');
        console.log();
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving section');
    }
});

app.delete('/deletebasic_info/:curriculum_id', async (req, res) => {
    const { curriculum_id } = req.params; //รับ params id 
    // const {id} = req.params.id;
    try {
        await pool.query(`delete  from basic_infos where curriculum_id = $1`, [curriculum_id]);
        res.status(201).send('Delete successfull');
        console.log();
    } catch (error) {
        console.error(error);
        res.status(500).send('Error Delete');
    }
});


app.get('/test/get_info', async (req, res) => {
    try {
        const result = await pool.query(`select * from basic_infos`);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving section');
    }
});

// เพิ่มข้อมูลส่วนที่ 2  CourseAnalysisInformation
app.post('/add_Course_Analysis_Information', async (req, res) => {
    // const input = req.body;

    const { curriculum_id, principle_reasons, required_eq_id, analysis_of_future_target, cooperation, high_lights } = req.body;


    try {
        await pool.query(`INSERT INTO course_analysis_information(curriculum_id,
  principle_reasons, required_eq_id,analysis_of_future_target, cooperation, high_lights)
	VALUES ($1, $2, $3, $4, $5,$6);`,
            [
                curriculum_id, principle_reasons, required_eq_id, analysis_of_future_target, cooperation, high_lights
            ]);
        res.status(201).send('Add successfull');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding authors');
    }
});

// เพิ่มข้อมูลส่วนที่ 3
app.post('/student_admissions_plan', async (req, res) => {
    // const input = req.body;

    const { curriculum_id, year, count_students, year_opened } = req.body;


    try {
        await pool.query(`INSERT INTO student_admission(
	curriculum_id, year, count_students, year_opened)
	VALUES ($1, $2, $3, $4);`,
            [
                curriculum_id, year, count_students, year_opened
            ]);
        res.status(201).send('Add successfull');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding authors');
    }
});



//  add user เพิ่มข้อมูลผู้ใช้ใหม่
app.post('/add_info_User', async (req, res) => {
    // const input = req.body;

    const {
        position,
        name,
        lastname,
        username,
        password,
        email,
        phone,
        affiliation,
        campus } = req.body;


    try {
        await pool.query(`insert into user_info (Position,Name,LastName,Username,Password,Email,Phone,Affiliation,Campus) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) `,
            [
                position,
                name,
                lastname,
                username,
                password,
                email,
                phone,
                affiliation,
                campus
            ]);
        res.status(201).send('Add successfull');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding authors');
    }
});


// delete user

app.delete(`/test/delete_user/:id`, async (req, res) => {
    // การตั้งชื่อพารามิเตอร์ใน req.params กับใน URL '/update_user/:id' พารามิเตอร์ต้องชื่อ id ชื่อพารามิเตอร์กับ ตัวแปร URL ต้องเหมือนกัน
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

app.get('/getinfo_user/:id', async (req, res) => {
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

app.put('/update_user/:id', async (req, res) => {
    const { id } = req.params;
    // const id = req.id;
    const {
        position,
        name,
        lastname,
        affiliation,
        email,
        phone,
        campus } = req.body;

    try {
        await pool.query(`UPDATE user_info set 
            position = $1,
            name = $2,
            lastname = $3,
            affiliation = $4,
            email = $5,
            phone = $6,
            campus = $7 where id = $8 RETURNING *`,
            [
                position,
                name,
                lastname,
                affiliation,
                email,
                phone,
                campus, id]);
        // res.json(result.rows);

        res.status(201).send('update successfull');
        console.log();
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving section');
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



app.get('/get_role', async (req, res) => {
    try {
        const result = await pool.query('select * from role')
        res.json(result.rows);
    } catch {
        console.error(error);
        res.status(500).send('Error retrieving section');
    }
})

app.get('/get_campus', async (req, res) => {
    try {
        const result = await pool.query('select * from campus')
        res.json(result.rows);
    } catch {
        console.error(error);
        res.status(500).send('Error retrieving section');
    }
})

app.get('/get_faculty', async (req, res) => {
    try {
        const result = await pool.query('select * from faculty')
        res.json(result.rows);
    } catch {
        console.error(error);
        res.status(500).send('Error retrieving section');
    }
})

app.listen(8080, () =>
    console.log(`Example app Listening on port ${port}`)
);