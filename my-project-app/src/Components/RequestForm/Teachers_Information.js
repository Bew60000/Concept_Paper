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

//Part V
const TeachersInformation = () => {
    const BackgroundImage = {
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }
    const navigate = useNavigate();
    const location = useLocation();


    const [forms, setForms] = useState([{
        id: 1,
        // title: '',
        // firstName: '',
        // lastName: '',
        // qualification: '',
        // academicPosition: '',
        // academicWork: ''

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
                id: formCount + 1,
                // title: '',
                // firstName: '',
                // lastName: '',
                // qualification: '',
                // academicPosition: '',
                // academicWork: ''

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
                if (!form.teacher_perfix || !form.teacher_fname || !form.teacher_lname || !form.academic_ranks || !form.performance || !form.educational_qualifications) {
                    alert('โปรดกรอกข้อมูลให้ครบถ้วน');
                    return;
                }

                // Send the forms state to the backend API
                // const response = await axios.post('http://localhost:8080/api/teachers', { forms });
                const response = await axios.post('http://localhost:8080/api/teachers', {
                    teacher_perfix: form.teacher_perfix,
                    teacher_fname: form.teacher_fname,
                    teacher_lname: form.teacher_lname,
                    academic_ranks: form.academic_ranks,
                    performance: form.performance,
                    educational_qualifications: form.educational_qualifications
                });
                console.log('Success:', response.data);

            }
            alert('บันทึกข้อมูลสำเร็จ!');
            // Handle success (e.g., navigate to another page or show a success message)
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
                    <Form onSubmit={handleSubmit}>
                        <h1>ส่วนที่ 5 : อาจารย์ประจำหลักสูตร</h1>
                        <hr />
                        <br />

                        {forms.map((form, index) => (
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
                                    value={form.performance}
                                    onChange={(e) => handleChange(form.id, 'performance', e.target.value)}
                                />

                                <div className='flex justify-end gap-4'>
                                    <FormButton type='button' onClick={() => removeForm(form.id)}>ลบข้อมูล</FormButton>
                                </div>

                                <br />
                                <hr />
                                <br />
                            </div>
                        ))}

                        <div className='flex justify-between gap-4'>
                            <FormButton type='button' onClick={addForm}>เพิ่มอาจารย์</FormButton>
                            {/* <FormButton type='submit' onClick={handleSubmit}>ยืนยัน</FormButton> */}
                            <FormButton type='submit'>ยืนยัน</FormButton>

                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default TeachersInformation;
