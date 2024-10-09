
// API to handle form submission
app.post('/submit', async (req, res) => {
    const {
        curriculum_id, teaching, cost_control, readiness, teacher_id, teacher_perfix, teacher_fname, teacher_lname, academic_ranks, performance, educational_qualifications
    } = req.body;

    const result = await pool.query('SELECT teacher_id FROM teacher ORDER BY teacher DESC LIMIT 1');
    let lastId = result.rows[0]?.teacher_id || 'T0000';


    let idNumber = parseInt(lastId.replace('T', ''), 10) + 1;
    let newTeacherId = `T${idNumber.toString().padStart(4, '0')}`;

    // Insert data into table 1 (for section h1)
    const query1 = `
      INSERT INTO teaching_and_administration(
	curriculum_id, teaching, cost_control, readiness)
	VALUES ($1, $2, $3, $4 );
      
    `;

    const values1 = [curriculum_id, teaching, cost_control, readiness];

    pool.query(query1, values1, (error, result1) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error saving data to the section4 table');
        } else {
            const section4Id = result1.rows[0].id;

            // Insert data into table 2 (for section h2)
            const query2 = `
          INSERT INTO teacher(
	teacher_id, teacher_perfix, teacher_fname, teacher_lname, academic_ranks, performance, educational_qualifications)
	VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;

            const values2 = [newTeacherId, teacher_perfix, teacher_fname, teacher_lname, academic_ranks, performance, educational_qualifications];

            pool.query(query2, values2, (error, result2) => {
                if (error) {
                    console.error(error);
                    res.status(500).send('Error saving data to the section4_1 table');
                } else {
                    res.status(200).send('Data saved successfully to both tables');
                }
            });
        }
    });
});