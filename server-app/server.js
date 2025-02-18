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
    database: 'servercurr',
    password: '6410210573',
    // password: '10062545Aong.',
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
        learningoutcome,
        sent_by,
        sent_time,
        status


    } = req.body;


    try {

        const result = await pool.query('SELECT curriculum_id FROM basic_infos ORDER BY curriculum_id DESC LIMIT 1');
        let lastId = result.rows[0]?.curriculum_id || 'C0000';


        let idNumber = parseInt(lastId.replace('C', ''), 10) + 1;
        let newCurriculumId = `C${idNumber.toString().padStart(4, '0')}`;


        let status_curr = 'รอการตอบรับ'

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
            learningoutcome,
            sent_by,
            sent_time,
            status
            )
	        VALUES ($1, $2, $3, $4, $5, $6, $7,$8,$9,$10,$11,$12,$13,$14);`,
            [
                newCurriculumId, nature, additionalinfo, majorthai, majoreng, faculty, degreename, affiliation, campus, yearstarted, learningoutcome, sent_by, sent_time, status_curr
            ]);

        res.status(201).json({ curriculum_id: newCurriculumId });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding authors');
    }
});
// update ข้อมูล
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

// ลบ ข้อมูลในตาราง
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


// update Status
app.put('/update_Status/:curriculum_id', async (req, res) => {
    const { curriculum_id } = req.params;
    // const id = req.id;
    const {
        status } = req.body;

    try {
        await pool.query(`UPDATE basic_infos
	SET status = $1
	WHERE curriculum_id = $2 RETURNING *`,
            [
                status, curriculum_id]);
        // res.json(result.rows);

        res.status(201).send('update successfull');
        console.log();
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




app.put('/Update_Course_Analysis_Information/:curriculum_id', async (req, res) => {
    const { curriculum_id } = req.params; //รับ params id 

    // const input = req.body;

    const { principle_reasons, required_eq_id, analysis_of_future_target, cooperation, high_lights } = req.body;


    try {
        await pool.query(`UPDATE course_analysis_information
	SET principle_reasons=$1, required_eq_id=$2, analysis_of_future_target=$3, cooperation=$4, high_lights=$5
	WHERE curriculum_id=$6`,
            [
                principle_reasons, required_eq_id, analysis_of_future_target, cooperation, high_lights, curriculum_id
            ]);
        res.status(201).send('update successfull');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error update ');
    }
});


// เพิ่มข้อมูลส่วนที่ 3
app.post('/student_admissions_plan', async (req, res) => {
    // const input = req.body;

    const { curriculum_id, year, count_students, year_opened } = req.body;


    try {
        await pool.query(`INSERT INTO student_admissions(
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

// test demo 2/10/2567 ยังไม่เชื่อมด้านหน้า กำลังแก้ครับ


// เพิ่มข้อมูลส่วนที่ 4 teaching_and_administration
app.post('/add_teaching_and_administration', async (req, res) => {
    // const input = req.body;

    const { curriculum_id, teaching, cost_control, readiness } = req.body;


    try {
        await pool.query(`INSERT INTO teaching_and_administration (curriculum_id, teaching, cost_control, readiness)
	VALUES ($1, $2, $3, $4);`,
            [
                curriculum_id, teaching, cost_control, readiness
            ]);
        res.status(201).send('Add successfull');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding authors');
    }
});

// API to handle form submission
app.post('/add_teacher_instructor', async (req, res) => {
    const {
        curriculum_id, teacher_perfix, teacher_fname, teacher_lname, academic_ranks, performance, educational_qualifications, teacher_role
    } = req.body;


    const result = await pool.query('SELECT teacher_id FROM teacher ORDER BY teacher DESC LIMIT 1');
    let lastId = result.rows[0]?.teacher_id || 'T0000';


    let idNumber = parseInt(lastId.replace('T', ''), 10) + 1;
    let newTeacherId = `T${idNumber.toString().padStart(4, '0')}`;

    // Insert into the second table (for h2 section)
    const query2 = `
      INSERT INTO teacher(
	teacher_id, teacher_perfix, teacher_fname, teacher_lname, academic_ranks, performance, educational_qualifications)
	VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;

    const values2 = [newTeacherId, teacher_perfix, teacher_fname, teacher_lname, academic_ranks, performance, educational_qualifications];

    let roleteacher = 'อาจารย์ผู้รับผิดชอบหลักสูตร'

    const query3 = `INSERT INTO type_teacher(
	teacher_role, curriculum_id, teacher_id)
	VALUES ($1, $2, $3);`

    const values3 = [roleteacher, curriculum_id, newTeacherId]

    // Execute both queries
    pool.query(query3, values3, (error, result1) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error saving data to the teaching table');
        } else {
            pool.query(query2, values2, (error, result2) => {
                if (error) {
                    console.error(error);
                    res.status(500).send('Error saving data to the responsibility table');
                } else {
                    res.status(200).send('Data saved successfully to both tables');

                }
            });
        }
    });
});



// เพิ่มข้อมูลส่วนที่ 5 teacher
app.post('/api/teachers', async (req, res) => {
    // const input = req.body;

    const { curriculum_id, teacher_id, teacher_perfix, teacher_fname, teacher_lname, academic_ranks, performance, educational_qualifications } = req.body;

    try {

        const result = await pool.query('SELECT teacher_id FROM teacher ORDER BY teacher DESC LIMIT 1');
        let lastId = result.rows[0]?.teacher_id || 'T0000';


        let idNumber = parseInt(lastId.replace('T', ''), 10) + 1;
        let newTeacherId = `T${idNumber.toString().padStart(4, '0')}`;

        let role_teacher = 'อาจารย์ประจำหลักสูตร'

        const query1 = `
     INSERT INTO teacher(
    teacher_id, teacher_perfix, teacher_fname, teacher_lname, academic_ranks, performance, educational_qualifications)
    VALUES ($1, $2, $3, $4, $5, $6, $7);
    `;
        const values1 = [newTeacherId, teacher_perfix, teacher_fname, teacher_lname, academic_ranks, performance, educational_qualifications];

        const query2 = `INSERT INTO public.type_teacher(
            teacher_role, curriculum_id, teacher_id)
            VALUES ($1, $2, $3);`

        const values2 = [role_teacher, curriculum_id, newTeacherId]

        // Execute both queries
        pool.query(query2, values2, (error, result1) => {
            if (error) {
                console.error(error);
                res.status(500).send('Error saving data to the teaching table');
            } else {
                pool.query(query1, values1, (error, result2) => {
                    if (error) {
                        console.error(error);
                        res.status(500).send('Error saving data to the responsibility table');
                    } else {
                        res.status(200).send('Data saved successfully to both tables');
                    }
                });
            }
        });

        //     await pool.query(` INSERT INTO teacher(
        // teacher_id, teacher_perfix, teacher_fname, teacher_lname, academic_ranks, performance, educational_qualifications)
        // VALUES ($1, $2, $3, $4, $5, $6, $7); `,
        //         [
        //             newTeacherId, teacher_perfix, teacher_fname, teacher_lname, academic_ranks, performance, educational_qualifications
        //         ])
        //     res.status(201).send('Add successfull');
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

// เรียกดูข้อมูล
app.get('/test/get_data_info_analysis_teaching/:curriculum_id', async (req, res) => {
    const { curriculum_id } = req.params
    try {
        const result = await pool.query(`select * from basic_infos
join course_analysis_information on basic_infos.curriculum_id = course_analysis_information.curriculum_id 
join teaching_and_administration on basic_infos.curriculum_id = teaching_and_administration.curriculum_id  
where basic_infos.curriculum_id = $1   
`, [curriculum_id]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving section');
    }
});


// get info
app.get('/test/get_info', async (req, res) => {
    try {
        const result = await pool.query(`select * from basic_infos
join course_analysis_information on basic_infos.curriculum_id = course_analysis_information.curriculum_id  
`);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving section');
    }
});
// 

// get info 1,2,4ส่วน1
app.get('/test/get_data_info_analysis_teaching', async (req, res) => {
    try {
        const result = await pool.query(`select * from basic_infos
join course_analysis_information on basic_infos.curriculum_id = course_analysis_information.curriculum_id 
join teaching_and_administration on basic_infos.curriculum_id = teaching_and_administration.curriculum_id 
 
`);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving section');
    }
});
// 

// get course_analysis_information
app.get('/test/course_analysis_information/:curriculum_id', async (req, res) => {
    const { curriculum_id } = req.params;
    try {
        const result = await pool.query(`select * from course_analysis_information where curriculum_id = $1   
` , [curriculum_id]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving section');
    }
});
// 

// get นักศึกษาที่เป็นปี
app.get('/test/student_admissions/:curriculum_id', async (req, res) => {
    const { curriculum_id } = req.params;
    try {
        const result = await pool.query(`select * from student_admissions where curriculum_id = $1   
` , [curriculum_id]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving section');
    }
});
// 

// get teacher
app.get('/test/teacher/:curriculum_id', async (req, res) => {
    const { curriculum_id } = req.params;
    try {
        const result = await pool.query(`select * from teacher 
join type_teacher on teacher.teacher_id = type_teacher.teacher_id  
            where curriculum_id = $1   
` , [curriculum_id]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving section');
    }
});
// 

// get teaching_and_administration
app.get('/test/teaching_and_administration/:curriculum_id', async (req, res) => {
    const { curriculum_id } = req.params;
    try {
        const result = await pool.query(`select * from teaching_and_administration where curriculum_id = $1   
` , [curriculum_id]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving section');
    }
});
// 


// การประเมิน  

// เพิ่มการประเมินส่วน1
app.post('/evaluation_score', async (req, res) => {
    // const input = req.body;

    const { curriculum_id, aspect_1, aspect_2, aspect_3, aspect_4, aspect_5, evaluato_id, evaluate_id } = req.body;


    try {
        await pool.query(`INSERT INTO evaluation_score(
	 curriculum_id,evaluato_id,aspect_1,aspect_2, aspect_3, aspect_4, aspect_5)
	VALUES ($1,$2,$3);`,
            [
                curriculum_id, evaluato_id, aspect_1, aspect_2, aspect_3, aspect_4, aspect_5
            ]);
        res.status(201).send('Add successfull');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding authors');
    }
});

// มอบหมายงาน

app.post('/add_evaluate', async (req, res) => {
    // const input = req.body;

    const { curriculum_id, evaluato_id, evaluator_position, status_evaluate } = req.body;


    try {
        await pool.query(`INSERT INTO evaluate(
	curriculum_id, evaluato_id, evaluator_position,status_evaluate,date_assign)
	VALUES ($1, $2, $3, $4 ,now());`,
            [
                curriculum_id, evaluato_id, evaluator_position, status_evaluate
            ]);
        res.status(201).send('Add successfull');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding authors');
    }
});




// 

// เพิ่มข้อมูลส่วนที่ 5 evaluation_score
app.post('/api/evaluation_score', async (req, res) => {
    // const input = req.body;

    const { curriculum_id, aspect_1, aspect_2, aspect_3, aspect_4, aspect_5, evaluato_id, evaluate_id, report01, report02, report03, report04, report05 } = req.body;

    try {

        const result = await pool.query('SELECT evaluate_id FROM evaluation_score ORDER BY evaluate_id DESC LIMIT 1');
        let lastId = result.rows[0]?.evaluate_id || 'E0000';


        let idNumber = parseInt(lastId.replace('E', ''), 10) + 1;
        let evaluateid = `E${idNumber.toString().padStart(4, '0')}`;


        const query1 = `
    INSERT INTO evaluation_score(
	 curriculum_id,aspect_1,aspect_2, aspect_3, aspect_4, aspect_5,evaluate_id,evaluato_id)
	VALUES ($1,$2,$3,$4,$5,$6,$7,$8);
    `;
        const values1 = [curriculum_id, aspect_1, aspect_2, aspect_3, aspect_4, aspect_5, evaluateid, evaluato_id];

        const query2 = `INSERT INTO report_for_each_side(
	evaluate_id, report01, report02, report03, report04, report05,evaluato_id)
	VALUES ($1, $2, $3, $4, $5, $6,$7);`

        const values2 = [evaluateid, report01, report02, report03, report04, report05, evaluato_id]


        //     const query3 = `INSERT INTO evaluate(
        // curriculum_id, evaluate_id,evaluato_id)
        // VALUES ($1, $2,$3);`

        //     const values3 = [curriculum_id, evaluateid, evaluato_id]
        // Execute both queries
        pool.query(query2, values2, (error, result1) => {
            if (error) {
                console.error(error);
                res.status(500).send('Error saving data to the teaching table');
            } else {
                pool.query(query1, values1, (error, result2) => {
                    if (error) {
                        console.error(error);
                        res.status(500).send('Error saving data to the responsibility table');
                    } else {
                        res.status(200).send('Data saved successfully to both tables');
                        // pool.query(query, values2, (error, result2) => {
                        //     if (error) {
                        //         console.error(error);
                        //         res.status(500).send('Error saving data to the responsibility table');
                        //     } else {
                        //         res.status(200).send('Data saved successfully to both tables');

                        //     }
                        // });
                    }
                });
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding authors');
    }

});

// // update evaluate
// app.put('/update/:username', async (req, res) => {
//     const { username } = req.params;
//     // const id = req.id;
//     const {
//         evaluate_id } = req.body;

//     try {
//         await pool.query(`UPDATE evaluate
// 	SET evaluate_id = $1
// 	WHERE username = $2 `,
//             [
//                 evaluate_id, username]);
//         // res.json(result.rows);

//         res.status(201).send('update successfull');
//         console.log();
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error retrieving section');
//     }
// });


//


// get รายละเอียดการประเมิน
app.get('/evaluate_data', async (req, res) => {
    // const { evaluation_aspect } = req.params;
    try {
        const result = await pool.query(`SELECT evaluation_aspect, evaluation_level, detailed_evaluation
	FROM evaluate_data    
` ,
            // [evaluation_aspect]
        );
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving section');
    }
});
// ประเมินมีhint


// getฟอร์มที่ต้องประเมิน กรอง username แสดงข้อมูลฟอร์มที่คนๆนั่นต้องประเมิน เฉพาะของตัวเอง
app.get('/test/evaluate/:evaluato_id', async (req, res) => {
    const { evaluato_id } = req.params;
    try {
        const result = await pool.query(`select * from evaluate 
join basic_infos on basic_infos.curriculum_id = evaluate.curriculum_id 
join course_analysis_information on basic_infos.curriculum_id = course_analysis_information.curriculum_id 
join teaching_and_administration on basic_infos.curriculum_id = teaching_and_administration.curriculum_id 
where evaluato_id = $1   
` , [evaluato_id]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving section');
    }
});
// 


// getฟอร์มที่ต้องประเมิน กรอง username แสดงข้อมูลฟอร์มที่คนๆนั่นต้องประเมิน เฉพาะของตัวเอง
app.get('/test/evaluate/:curriculum_id', async (req, res) => {
    const { curriculum_id } = req.params;
    try {
        const result = await pool.query(`select * from evaluate 
where curriculum_id = $1   
` , [curriculum_id]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving section');
    }
});
//




app.put('/test/update_evaluate_status', async (req, res) => {

    const { status_evaluate, evaluato_id, curriculum_id } = req.body;
    // const id = req.id;
    // const name = req.name;

    try {
        await pool.query(`UPDATE evaluate
      SET status_evaluate = $1 , time_evaluate = Now()
      WHERE evaluato_id = $2 AND curriculum_id = $3;`,
            [status_evaluate, evaluato_id, curriculum_id]);
        // res.json(result.rows);
        res.status(201).send('update successfull');
        console.log();
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving section');
    }
});


app.put('/test/update_date_cancel', async (req, res) => {

    const { curriculum_id } = req.body;
    // const id = req.id;
    // const name = req.name;

    try {
        await pool.query(`UPDATE basic_infos
      SET  date_cancel_request = Now()
      WHERE  curriculum_id = $1;`,
            [curriculum_id]);
        // res.json(result.rows);
        res.status(201).send('update successfull');
        console.log();
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving section');
    }
});

app.put('/test/update_date_acceptance', async (req, res) => {

    const { curriculum_id } = req.body;
    // const id = req.id;
    // const name = req.name;

    try {
        await pool.query(`UPDATE basic_infos
      SET  date_acceptance = Now()
      WHERE  curriculum_id = $1;`,
            [curriculum_id]);
        // res.json(result.rows);
        res.status(201).send('update successfull');
        console.log();
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving section');
    }
});


app.put('/test/update_date_reject', async (req, res) => {

    const { curriculum_id } = req.body;
    // const id = req.id;
    // const name = req.name;

    try {
        await pool.query(`UPDATE basic_infos
      SET  date_cancel_request = Now()
      WHERE  curriculum_id = $1;`,
            [curriculum_id]);
        // res.json(result.rows);
        res.status(201).send('update successfull');
        console.log();
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving section');
    }
});



app.post('/Report_reject', async (req, res) => {
    // const input = req.body;

    const { curriculum_id, report_reject } = req.body;


    try {
        await pool.query(`INSERT report_reject(
	curriculum_id, report_reject, time_reject)
	VALUES ($1, $2, now());`,
            [
                curriculum_id, report_reject
            ]);
        res.status(201).send('Add successfull');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding authors');
    }
});


// select evaluation_score.* , report_for_each_side.* from evaluation_score
// join evaluate on evaluate.curriculum_id = evaluation_score.curriculum_id 
// and evaluate.evaluato_id = evaluation_score.evaluato_id
// join report_for_each_side on report_for_each_side.evaluato_id = evaluation_score.evaluato_id
// where evaluate.curriculum_id = 'C0001' 

// getคะแนนการประเมินของฟอร์มนั้นๆ กรอง curriculum_id แสดงข้อมูลคะเเนนการประเมินฟอร์มนั้นๆ เฉพาะประธานแต่ยังไม่ทำตัวเชื่อมที
app.get('/test/evaluation_score_report/:curriculum_id', async (req, res) => {
    const { curriculum_id } = req.params;
    try {
        const result = await pool.query(`select * from evaluation_score
join evaluate on evaluate.curriculum_id = evaluation_score.curriculum_id 
and evaluate.evaluato_id = evaluation_score.evaluato_id
join report_for_each_side on report_for_each_side.evaluato_id = evaluation_score.evaluato_id
and report_for_each_side.evaluate_id = evaluation_score.evaluate_id
where evaluate.curriculum_id = $1
` , [curriculum_id]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving section');
    }
});
// 

// INSERT INTO public.evaluation_results(
// 	curriculum_id, total_score, report, time_finish_evaluate, evaluato_id)
// 	VALUES (?, ?, ?, ?, ?);



// 
// 
// 
// 
app.post('/evaluation_results', async (req, res) => {
    // const input = req.body;

    const { curriculum_id, total_score, report1, report2, report3, report4, report5, evaluato_id, time_finish_evaluate } = req.body;


    try {
        await pool.query(`INSERT INTO evaluation_results(
	curriculum_id, total_score, report1,report2,report3,report4,report5, evaluato_id, time_finish_evaluate)
 	VALUES ($1, $2, $3, $4,$5,$6,$7,$8 ,now());`,
            [
                curriculum_id, total_score, report1, report2, report3, report4, report5, evaluato_id
            ]);
        res.status(201).send('Add successfull');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding authors');
    }
});


app.get('/get_evaluate_result/:curriculum_id', async (req, res) => {
    const { curriculum_id } = req.params;

    try {
        const result = await pool.query(`select * from evaluation_results where curriculum_id = $1
` , [curriculum_id]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving section');
    }

});
// 
// 
// 

// SELECT evaluator_position , evaluato_id , curriculum_id , status_evaluate
// 	FROM evaluate 

// getall evaluate ไว้ดูใครหัวหน้า แล้วทำเงื่อนไขกับ getคะแนนการประเมินของฟอร์มนั้นๆ
// 

// select user_info.* , evaluate.curriculum_id , evaluate.evaluator_position from user_info
// join evaluate on user_info.username = evaluate.evaluato_id 
// where evaluate.curriculum_id = 'C0005' 


// getชื่อของผู้ประเมินตามแบบประเมิน
app.get('/test/user_info_evaluate/:curriculum_id', async (req, res) => {
    const { curriculum_id } = req.params;
    try {
        const result = await pool.query(`select user_info.* , evaluate.curriculum_id , evaluate.evaluator_position from user_info
join evaluate on user_info.username = evaluate.evaluato_id 
where evaluate.curriculum_id = $1   
` , [curriculum_id]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving section');
    }
});




// 


// SELECT * FROM public.evaluate where evaluato_id = 'D004' and status_evaluate = 'เสร็จสิ้น'


// // getประเมินที่เสร็จสิ้นแล้วของเฉพาะของคนๆนั้น
// // 


// // getฟอร์มที่ต้องประเมิน กรอง username แสดงข้อมูลฟอร์มที่คนๆนั่นต้องประเมิน เฉพาะของตัวเอง
// app.get('/test/evaluate/:evaluato_id', async (req, res) => {
//     const { evaluato_id } = req.params;
//     try {
//         const result = await pool.query(`select * from evaluate 
// join basic_infos on basic_infos.curriculum_id = evaluate.curriculum_id 
// join course_analysis_information on basic_infos.curriculum_id = course_analysis_information.curriculum_id 
// join teaching_and_administration on basic_infos.curriculum_id = teaching_and_administration.curriculum_id 
// where evaluato_id = $1   
// ` , [evaluato_id]);
//         res.json(result.rows);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error retrieving section');
//     }
// });
// // 

// select * from evaluate 
// join basic_infos on basic_infos.curriculum_id = evaluate.curriculum_id 
// where evaluato_id = 'D001'

// 

app.listen(8080, () =>
    console.log(`Example app Listening on port ${port}`)
);