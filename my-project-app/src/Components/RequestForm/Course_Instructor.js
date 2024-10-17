import React, { useState, useCallback } from 'react';
import {
    FormTextArea,
    FormSelect,
    FormInput,
    FormGroup,
    FormButton,
    Form,
} from 'semantic-ui-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Background from '../../img/Background.svg';
import Navbar from '../Navbar/NavbarUser';
import axios from 'axios';


//Dropdown
const options = [
    { key: 'A', text: 'นาย', value: 'นาย' },
    { key: 'B', text: 'นาง', value: 'นาง' },
    { key: 'C', text: 'นางสาว', value: 'นางสาว' },
]
//Part IV
const Course_Instructor = () => {
    const BackgroundImage = {
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }
    const navigate = useNavigate();
    const location = useLocation();

    const curriculum_id = location.state?.curriculum_id;

    const [forms, setForms] = useState([{
        curriculum_id: curriculum_id,
        id: 1,
        teacher_perfix: '',
        teacher_fname: '',
        teacher_lname: '',
        academic_ranks: '',
        performance: '',
        educational_qualifications: ''
    }]);

    const [formCount, setFormCount] = useState(1);

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
                curriculum_id: curriculum_id,
                id: formCount + 1,
                teacher_perfix: '',
                teacher_fname: '',
                teacher_lname: '',
                academic_ranks: '',
                performance: '',
                educational_qualifications: ''
            }
        ]);
        setFormCount(prevCount => prevCount + 1);
    }, [formCount]);

    const removeForm = useCallback((id) => {
        setForms(prevForms => prevForms.filter(form => form.id !== id));
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            for (let form of forms) {
                if (!form.teacher_perfix || !form.teacher_fname || !form.teacher_lname || !form.academic_ranks || !form.performance || !form.educational_qualifications
                ) {
                    alert('โปรดกรอกข้อมูลให้ครบถ้วน');
                    return;
                }

                const response = await axios.post('http://localhost:8080/add_teacher_instructor', {
                    curriculum_id: curriculum_id,
                    teacher_perfix: form.teacher_perfix,
                    teacher_fname: form.teacher_fname,
                    teacher_lname: form.teacher_lname,
                    academic_ranks: form.academic_ranks,
                    performance: form.performance,
                    educational_qualifications: form.educational_qualifications
                })
                console.log('Success:', response.data);

                console.log('Data saved with curriculum_id:', curriculum_id);

                navigate('/teachers_information', {
                    state: { curriculum_id: curriculum_id },
                }, { replace: true });
            }
            // alert('บันทึกข้อมูลสำเร็จ!');

        } catch (error) {
            console.error('Error submitting form:', error);
            // Handle error (e.g., show an error message)
        }
    };

    return (
        <div className="bg-fixed min-w-screen min-h-screen" style={BackgroundImage}>
            <Navbar />
            <div className="grid grid-cols-12 auto-rows-auto gap-3 justify-center p-5 pt-20">
                <div className='bg-white col-span-10 col-start-2 p-20 border-2 rounded-2xl shadow-10'>
                    <h1>ส่วนที่ 5 : อาจารย์ผู้รับผิดชอบหลักสูตร</h1>
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
                                        label='คำนำหน้า'
                                        options={options}
                                        placeholder='คำนำหน้า'
                                        value={form.teacher_perfix}
                                        onChange={(e, { value }) => handleChange(form.id, 'teacher_perfix', value)}
                                    />
                                    <FormInput
                                        fluid
                                        label='ชื่อ'
                                        placeholder='โปรดระบุชื่อ'
                                        value={form.teacher_fname}
                                        onChange={(e) => handleChange(form.id, 'teacher_fname', e.target.value)}
                                    />
                                    <FormInput
                                        fluid
                                        label='นามสกุล'
                                        placeholder='โปรดระบุนามสกุล'
                                        value={form.teacher_lname}
                                        onChange={(e) => handleChange(form.id, 'teacher_lname', e.target.value)}
                                    />
                                </FormGroup>

                                <FormTextArea
                                    fluid
                                    label='คุณวุฒิ'
                                    placeholder='โปรดระบุคุณวุฒิ'
                                    value={form.educational_qualifications}
                                    onChange={(e) => handleChange(form.id, 'educational_qualifications', e.target.value)}
                                />

                                <FormGroup widths='equal'>
                                    <FormInput
                                        fluid
                                        label='ตำแหน่งทางวิชาการ'
                                        placeholder='โปรดระบุตำแหน่งทางวิชาการ'
                                        value={form.academic_ranks}
                                        onChange={(e) => handleChange(form.id, 'academic_ranks', e.target.value)}
                                    />
                                </FormGroup>

                                <FormTextArea
                                    fluid
                                    label='ผลงานทางด้านวิชาการย้อนหลัง 3 ปี'
                                    placeholder='ผลงานทางด้านวิชาการ'
                                    style={{ minHeight: '150px' }}
                                    value={form.performance}
                                    onChange={(e) => handleChange(form.id, 'performance', e.target.value)}
                                />

                                <FormButton
                                    className='flex justify-end gap-4'
                                    type='button'
                                    onClick={() => removeForm(form.id)}
                                >
                                    ลบข้อมูล
                                </FormButton>
                                <br />
                                <hr />
                                <br />
                            </div>
                        ))}
                        <div className="flex justify-between gap-4">
                            <button className="bg-gray-500 hover:bg-gray-700 hover:font-bold text-white px-5 py-3 rounded-lg ml-2" onClick={addForm}>
                                <div className="flex justify-start items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 mr-2">
                                        <path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
                                    </svg>
                                    เพิ่มอาจารย์ประจำหลักสูตร
                                </div>
                            </button>

                            <button className="bg-blue-500 hover:bg-blue-700 hover:font-bold text-white px-5 py-3 rounded-lg ml-2" type="submit">
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

export default Course_Instructor;
