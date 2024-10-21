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
import { useNavigate, useLocation } from 'react-router-dom';
import Background from '../../img/Background.svg';
import Navbar from '../Navbar/NavbarUser';

//Dropdown
const options = [
    { key: '1', text: 'ชั้นปีที่ 1', value: '1' },
    { key: '2', text: 'ชั้นปีที่ 2', value: '2' },
    { key: '3', text: 'ชั้นปีที่ 3', value: '3' },
    { key: '4', text: 'ชั้นปีที่ 4', value: '4' },
];

//Part III
const StudentAdmission = () => {
    const BackgroundImage = {
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }
    const navigate = useNavigate();
    const location = useLocation();

    // รับค่า curriculum_id จากฟอร์มก่อนหน้า
    const curriculum_id = location.state?.curriculum_id || '';

    const [formData, setFormData] = useState([{
        id: 1,
        year: '',
        count_students: '',
        curriculum_id: curriculum_id, // ใส่ค่า curriculum_id ที่รับมา
        year_offered: ''
    }]);

    const handleChange = useCallback((id, field, value) => {
        setFormData(prevForms =>
            prevForms.map(form =>
                form.id === id ? { ...form, [field]: value } : form
            )
        );
    }, []);

    const addForm = useCallback(() => {
        setFormData(prevForms => [
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
        setFormData(prevForms => prevForms.filter(form => form.id !== id));
    }, []);

    const handleSubmit = async () => {
        try {
            for (let form of formData) {
                if (!form.year || !form.year_offered || !form.count_students) {
                    alert('โปรดกรอกข้อมูลให้ครบถ้วน');
                    return;
                }

                // Convert year_offered to number before sending
                const response = await axios.post('http://localhost:8080/student_admissions_plan', {
                    curriculum_id: form.curriculum_id,
                    year: form.year,
                    count_students: Number(form.count_students),
                    year_opened: Number(form.year_offered),
                });
                console.log('Data saved:', response.data);
                console.log('Data saved with curriculum_id:', curriculum_id);

                navigate('/management_information', {
                    state: { curriculum_id: curriculum_id },
                }, { replace: true });
            }
            // alert('บันทึกข้อมูลสำเร็จ!');
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
                    <h1>ส่วนที่ 3 : แผนการรับนักศึกษา</h1>
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
                                        // type='number'
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
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 mr-2">
                                        <path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
                                    </svg>
                                    เพิ่มแผนการศึกษา
                                </div>
                            </button>

                            <button className="bg-blue-500 hover:bg-blue-700 hover:font-bold text-white px-5 py-3 rounded-lg ml-2" type="submit" onClick={handleSubmit}>
                                <div className="flex justify-start items-center">
                                    ต่อไป
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 ml-2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                    </svg>
                                </div>
                            </button>
                        </div>

                    </Form>
                </div>
            </div>
        </div>
    );
};

export default StudentAdmission;
