import React, { useState } from 'react';
import {
    FormTextArea,
    FormCheckbox,
    FormButton,
    FormGroup,
    Form,
} from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Background from '../../img/Background.svg';
import Navbar from '../Navbar/NavbarUser';

const CourseAnalysisInformation = () => {
    const BackgroundImage = {
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };
    const navigate = useNavigate();
    const location = useLocation();

    const curriculum_id = location.state?.curriculum_id;

    const [formData, setFormData] = useState({
        curriculum_id: curriculum_id,
        required_eq_id: '', // เปลี่ยนเป็น string แทน array
        principle_reasons: '',
        analysis_of_future_target: '',
        cooperation: '',
        high_lights: '',
    });

    // const handleCheckboxChange = (e, { name, checked }) => {
    //     setFormData(prevState => {
    //         let newRequiredEqIdArray = checked
    //             ? [...prevState.required_eq_id.split(','), name] // เพิ่มค่าลงใน array หาก checkbox ถูกเลือก
    //             : prevState.required_eq_id.split(',').filter(item => item !== name); // เอาออกจาก array หากยกเลิกการเลือก

    //         // แปลง array ให้กลายเป็น string โดยใช้คอมมาในการคั่น
    //         let newRequiredEqIdString = newRequiredEqIdArray.join(',');

    //         return {
    //             ...prevState,
    //             required_eq_id: newRequiredEqIdString, // เก็บค่าที่ถูกเลือกเป็น string
    //         };
    //     });
    // };

    const handleCheckboxChange = (e, { name, checked }) => {
        setFormData(prevState => {
            let newRequiredEqIdString = prevState.required_eq_id;
            if (checked) {
                // เพิ่มชื่อถ้าหากถูกเลือก
                newRequiredEqIdString = newRequiredEqIdString
                    ? `${newRequiredEqIdString},${name}` // เพิ่มเครื่องหมายจุลภาค
                    : name; // เริ่มต้นด้วยชื่อ
            } else {
                // ลบชื่อถ้าหากถูกยกเลิกเลือก
                newRequiredEqIdString = newRequiredEqIdString
                    .split(',') // แยกเป็น array
                    .filter(item => item !== name) // กรองออกชื่อที่ไม่ต้องการ
                    .join(','); // รวมกลับเป็น string
            }

            return {
                ...prevState,
                required_eq_id: newRequiredEqIdString, // เก็บเป็น string
            };
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/add_Course_Analysis_Information', formData);
            console.log('Data successfully saved:', response.data);
            // alert('ข้อมูลถูกบันทึกเรียบร้อยแล้ว');

            console.log('Data saved with curriculum_id:', curriculum_id);

            navigate('/student_admission', {
                state: { curriculum_id: curriculum_id },
            }, { replace: true });

        } catch (error) {
            console.error('Error saving data:', error);
            alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
        }
    };

    return (
        <div className="bg-fixed min-w-screen min-h-screen" style={BackgroundImage}>
            <Navbar />
            <div className="grid grid-cols-12 auto-rows-auto gap-3 justify-center p-5 pt-20">
                <div className='bg-white col-span-10 col-start-2 p-20 border-2 rounded-2xl shadow-10'>
                    <h1>ส่วนที่ 2 : ข้อมูลการวิเคราะห์หลักสูตร</h1>
                    <hr />
                    <br />
                    <Form onSubmit={handleSubmit}>
                        <FormTextArea
                            label='หลักการและเหตุผลในการขอเปิดหลักสูตร'
                            placeholder='โปรดอธิบายรายละเอียด'
                            name="principle_reasons"
                            style={{ minHeight: '100px' }}
                            value={formData.principle_reasons}
                            onChange={handleInputChange}
                        />

                        <FormGroup grouped inline>
                            <label>กลุ่มเป้าหมายของหลักสูตร หลักสูตรเปิดรับผู้สำเร็จการศึกษาระดับ</label>
                            {[
                                { key: 'มัธยมศึกษา', label: 'มัธยมศึกษา' },
                                { key: 'ปริญญาตรี', label: 'ปริญญาตรี' },
                                { key: 'ปริญญาโท', label: 'ปริญญาโท' },
                                { key: 'ปริญญาเอก', label: 'ปริญญาเอก' },
                                { key: 'other', label: 'อื่น ๆ' }
                            ].map(group => (
                                <FormCheckbox
                                    key={group.key}
                                    label={group.label}
                                    name={group.key}
                                    checked={formData.required_eq_id.split(',').includes(group.key)} // แปลง string เป็น array สำหรับตรวจสอบ
                                    onChange={handleCheckboxChange}
                                />
                            ))}
                        </FormGroup>

                        <FormTextArea
                            label='ผลวิเคราะห์ความต้องการของกลุ่มเป้าหมาย'
                            placeholder='วิเคราะห์ความต้องการของกลุ่มเป้าหมายในการเข้าศึกษาหลักสูตรดังกล่าว'
                            name="analysis_of_future_target"
                            style={{ minHeight: '100px' }}
                            value={formData.analysis_of_future_target}
                            onChange={handleInputChange}
                        />

                        <FormTextArea
                            label='ความร่วมมือกับหน่วยงานจากภาคผู้ใช้บัณฑิต'
                            placeholder='โปรดอธิบายรายละเอียด'
                            name="cooperation"
                            style={{ minHeight: '100px' }}
                            value={formData.cooperation}
                            onChange={handleInputChange}
                        />
                        <FormTextArea
                            label='จุดเด่นของหลักสูตรและการดำเนินการที่จะแข่งขันกับหลักสูตรอื่นที่ใกล้เคียง'
                            placeholder='โปรดอธิบายรายละเอียด'
                            name="high_lights"
                            value={formData.high_lights}
                            style={{ minHeight: '100px' }}
                            onChange={handleInputChange}
                        />

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

export default CourseAnalysisInformation;

