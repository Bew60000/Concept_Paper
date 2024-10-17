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
const ManagementInformation = () => {
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
        teaching: '',
        cost_control: '',
        readiness: '',
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
            // ส่งข้อมูลส่วนแรก (teaching, cost_control, readiness) แค่ 1 ครั้ง
            const firstPartResponse = await axios.post('http://localhost:8080/add_teaching_and_administration', {
                curriculum_id: curriculum_id,
                teaching: forms[0].teaching,
                cost_control: forms[0].cost_control,
                readiness: forms[0].readiness,
            });

            console.log('ส่งข้อมูลส่วนแรกสำเร็จ:', firstPartResponse.data);
            navigate('/course_instructor', {
                state: { curriculum_id: curriculum_id },
            }, { replace: true });

        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการส่งข้อมูล:', error);
        }
    };


    return (
        <div className="bg-fixed min-w-screen min-h-screen" style={BackgroundImage}>
            <Navbar />
            <div className="grid grid-cols-12 auto-rows-auto gap-3 justify-center p-5 pt-20">
                <div className='bg-white col-span-10 col-start-2 p-20 border-2 rounded-2xl shadow-10'>
                    <h1>ส่วนที่ 4 : รูปแบบการจัดการเรียนการสอนและการบริหารจัดการ</h1>
                    <hr />
                    <br />
                    <Form onSubmit={handleSubmit}>

                        <FormTextArea
                            fluid
                            label='รูปแบบของการจัดการเรียนการสอนที่มีการเรียนรู้จากประสบการณ์จริง'
                            placeholder='โปรดอธิบายรายละเอียด'
                            name="teaching"
                            style={{ minHeight: '100px' }}
                            value={forms.teaching}
                            onChange={(e, { value }) => handleChange(1, 'teaching', value)}

                        />
                        <FormTextArea
                            fluid
                            label='หลักสูตรฯ มีการควบคุมต้นทุนของการศึกษาอย่างไร'
                            placeholder='โปรดอธิบายรายละเอียด'
                            name="cost_control"
                            style={{ minHeight: '100px' }}
                            value={forms.cost_control}
                            onChange={(e, { value }) => handleChange(1, 'cost_control', value)}

                        />
                        <FormTextArea
                            fluid
                            label='ความพร้อมในการจัดการเรียนการสอน'
                            placeholder='โปรดอธิบายรายละเอียด'
                            name="readiness"
                            style={{ minHeight: '100px' }}
                            value={forms.readiness}
                            onChange={(e, { value }) => handleChange(1, 'readiness', value)}

                        />

                        <br />
                        <div className="flex justify-end gap-4">
                            <button className="bg-gray-500 hover:bg-gray-700 hover:font-bold text-white px-5 py-3 rounded-lg ml-2" onClick={() => navigate('/homepage_user')}>
                                <div className="flex justify-start items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                                    </svg>
                                    ยกเลิก
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

export default ManagementInformation;
