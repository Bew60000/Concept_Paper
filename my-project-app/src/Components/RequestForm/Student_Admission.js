import React, { useState, useCallback } from 'react';
import {
    FormSelect,
    FormInput,
    FormGroup,
    FormButton,
    Form,
    FormField
} from 'semantic-ui-react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const options = [
    { key: '1', text: 'ชั้นปีที่ 1', value: '1' },
    { key: '2', text: 'ชั้นปีที่ 2', value: '2' },
    { key: '3', text: 'ชั้นปีที่ 3', value: '3' },
    { key: '4', text: 'ชั้นปีที่ 4', value: '4' },
];

const StudentAdmission = () => {
    const location = useLocation();

    // รับค่า curriculum_id จากฟอร์มก่อนหน้า
    const curriculum_id = location.state?.curriculum_id || '';

    const [forms, setForms] = useState([{
        id: 1,
        year: '',
        count_students: '',
        curriculum_id: curriculum_id, // ใส่ค่า curriculum_id ที่รับมา
        year_offered: ''
    }]);

    const handleChange = useCallback((id, field, value) => {
        setForms(prevForms =>
            prevForms.map(form =>
                form.id === id ? { ...form, [field]: value } : form
            )
        );
    }, []);

    const addForm = useCallback(() => {
        setForms(prevForms => [
            ...prevForms,
            {
                id: prevForms.length + 1,
                year: '',
                count_students: '',
                curriculum_id: curriculum_id, // ใส่ค่า curriculum_id ในฟอร์มใหม่
                year_offered: ''
            }
        ]);
    }, [curriculum_id]);

    const removeForm = useCallback((id) => {
        setForms(prevForms => prevForms.filter(form => form.id !== id));
    }, []);

    const handleSubmit = async () => {
        try {
            for (let form of forms) {
                // Convert year_offered to number before sending
                const response = await axios.post('http://localhost:8080/student_admissions_plan', {
                    curriculum_id: form.curriculum_id,
                    year: form.year,
                    count_students: form.count_students,
                    year_opened: Number(form.year_offered) // Make sure it's a number
                });
                console.log('Data saved:', response.data);
            }
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    return (
        <div className="grid grid-cols-12 auto-rows-auto gap-3 justify-center p-5">
            <div className='bg-white col-span-10 col-start-2 p-20 border-2 rounded-2xl shadow-10'>
                <h1>ส่วนที่ 3 : แผนการรับนักศึกษา</h1>
                <hr />
                <br />
                <Form onSubmit={handleSubmit}>
                    {forms.map((form) => (
                        <div key={form.id}>
                            <FormGroup widths='equal'>
                                <hr />
                                <br />
                                <FormSelect
                                    fluid
                                    label='หลักสูตร'
                                    options={options}
                                    placeholder='โปรดเลือกระบบหลักสูตร'
                                    value={form.year}
                                    onChange={(e, { value }) => handleChange(form.id, 'year', value)}
                                />
                                <FormInput
                                    fluid
                                    label='ปีที่เปิดสอน'
                                    placeholder='โปรดระบุปีที่เปิดสอน'
                                    type='number'
                                    value={form.year_offered}
                                    onChange={(e) => handleChange(form.id, 'year_offered', e.target.value)}
                                />
                                <FormInput
                                    fluid
                                    label='จำนวนศึกษาที่เปิดรับ'
                                    placeholder='โปรดระบุจำนวน'
                                    value={form.count_students}
                                    onChange={(e) => handleChange(form.id, 'count_students', e.target.value)}
                                />

                                <FormButton
                                    className='grid gap-4 content-end'
                                    type='button'
                                    onClick={() => removeForm(form.id)}
                                >
                                    ลบข้อมูล
                                </FormButton>
                                <FormField />
                            </FormGroup>
                        </div>
                    ))}

                    <br />
                    <hr />
                    <br />

                    <div className='flex justify-between gap-4'>
                        <FormButton type='button' onClick={addForm}>เพิ่มแผนการศึกษา</FormButton>
                        <FormButton type='submit'>ยืนยัน</FormButton>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default StudentAdmission;
