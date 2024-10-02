
// API to handle form submission
app.post('/submit', (req, res) => {
    const {
        teachingStyle, curriculumDetails, readiness, role, name, surname, comments, division, results
    } = req.body;

    // Insert data into table 1 (for section h1)
    const query1 = `
      INSERT INTO section4 (teaching_style, curriculum_details, readiness)
      VALUES ($1, $2, $3)
      RETURNING id
    `;

    const values1 = [teachingStyle, curriculumDetails, readiness];

    pool.query(query1, values1, (error, result1) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error saving data to the section4 table');
        } else {
            const section4Id = result1.rows[0].id;

            // Insert data into table 2 (for section h2)
            const query2 = `
          INSERT INTO section4_1 (role, name, surname, comments, division, results, section4_id)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;

            const values2 = [role, name, surname, comments, division, results, section4Id];

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