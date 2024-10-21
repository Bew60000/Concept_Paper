import React, { useEffect, useState } from 'react';
import {
    FormSelect,
    FormInput,
    FormGroup,
    FormButton,
    Form,
    FormField,
} from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Background from '../../../img/Background.svg';
import Navbar from '../../Navbar/NavbarUser';

// Dropdown options
const options = [
    { key: '1', text: 'ชั้นปีที่ 1', value: '1' },
    { key: '2', text: 'ชั้นปีที่ 2', value: '2' },
    { key: '3', text: 'ชั้นปีที่ 3', value: '3' },
    { key: '4', text: 'ชั้นปีที่ 4', value: '4' },
];

const EditStudentAdmission = () => {
    const BackgroundImage = {
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    const navigate = useNavigate();
    const location = useLocation();
    const { info, studentData } = location.state;


    const curriculum_id = location.state?.curriculum_id || '';
    const initialFormData = location.state?.formData || [{
        id: 1,
        year: '',
        count_students: '',
        curriculum_id: curriculum_id,
        year_offered: ''
    }];

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (id, field, value) => {
        setFormData(prevForms =>
            prevForms.map(form =>
                form.id === id ? { ...form, [field]: value } : form
            )
        );
    };

    const addForm = () => {
        setFormData(prevForms => [
            ...prevForms,
            {
                id: prevForms.length + 1,
                year: '',
                count_students: '',
                curriculum_id: curriculum_id,
                year_offered: ''
            }
        ]);
    };

    const removeForm = (id) => {
        setFormData(prevForms => prevForms.filter(form => form.id !== id));
    };

    const handleSubmit = async () => {
        try {
            for (let form of formData) {
                if (!form.year || !form.year_offered || !form.count_students) {
                    alert('โปรดกรอกข้อมูลให้ครบถ้วน');
                    return;
                }

                // Update the student admission plan
                const response = await axios.put(`http://localhost:8080/student_admissions_plan/${form.id}`, {
                    curriculum_id: form.curriculum_id,
                    year: form.year,
                    count_students: Number(form.count_students),
                    year_opened: Number(form.year_offered),
                });
                console.log('Data updated:', response.data);
            }

            // Redirect after successful submission
            navigate('/management_information', {
                state: { curriculum_id: curriculum_id },
            }, { replace: true });
            alert('บันทึกข้อมูลสำเร็จ!');
        } catch (error) {
            console.error('There was an error!', error);
            alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
        }
    };

    return (
        <div className="bg-fixed min-w-screen min-h-screen" style={BackgroundImage}>
            <Navbar />
            <div className="grid grid-cols-12 auto-rows-auto gap-3 justify-center p-5 pt-20">
                <div className='bg-white col-span-10 col-start-2 p-20 border-2 rounded-2xl shadow-10'>
                    <h1>แก้ไขข้อมูลแผนการรับนักศึกษา</h1>
                    <hr />
                    <br />
                    <Form>
                        {formData.map((form) => (
                            <div key={form.id}>
                                <FormGroup widths='equal'>
                                    <hr />
                                    <br />
                                    <FormSelect
                                        fluid
                                        label='ชั้นปี'
                                        options={options}
                                        placeholder='โปรดระบุชั้นปี'
                                        value={form.year}
                                        onChange={(e, { value }) => handleChange(form.id, 'year', value)}
                                    />
                                    <FormInput
                                        fluid
                                        label='ปีที่เปิดสอน'
                                        placeholder='โปรดระบุปีที่เปิดสอน'
                                        value={form.year_offered}
                                        onChange={(e) => handleChange(form.id, 'year_offered', e.target.value)}
                                    />
                                    <FormInput
                                        fluid
                                        label='จำนวนศึกษาที่เปิดรับ(คน)'
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

                        <div className="flex justify-between gap-4">
                            <button className="bg-gray-500 hover:bg-gray-700 hover:font-bold text-white px-5 py-3 rounded-lg ml-2" onClick={addForm}>
                                <div className="flex justify-start items-center">
                                    เพิ่มแผนการศึกษา
                                </div>
                            </button>

                            <button className="bg-blue-500 hover:bg-blue-700 hover:font-bold text-white px-5 py-3 rounded-lg ml-2" type="button" onClick={handleSubmit}>
                                <div className="flex justify-start items-center">
                                    บันทึกข้อมูล
                                </div>
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default EditStudentAdmission;
