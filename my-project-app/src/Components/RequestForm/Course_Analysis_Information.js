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
        required_eq_id: [],
        principle_reasons: '',
        analysis_of_future_target: '',
        cooperation: '',
        high_lights: '',
    });

    const handleCheckboxChange = (e, { name, checked }) => {
        setFormData(prevState => {
            const newRequiredEqId = checked
                // ถ้า checkbox ถูกเลือก ให้เพิ่มเข้า array
                ? [...prevState.required_eq_id, name]
                // ถ้า checkbox ถูกยกเลิก ให้เอาออกจาก array
                : prevState.required_eq_id.filter(item => item !== name); // ถ้า checkbox ถูกยกเลิก ให้เอาออกจาก array
            return {
                ...prevState,
                required_eq_id: newRequiredEqId,
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

            // const CurriculumId = response.data.curriculum_id;
            console.log('Data saved with curriculum_id:', curriculum_id);

            navigate('/homepage_user', {
                state: { curriculum_id: curriculum_id },
            }, { replace: true });

            // navigate('/student_admission');
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
                                    checked={formData.required_eq_id.includes(group.key)} // ตรวจสอบว่าถูกเลือกหรือไม่
                                    onChange={handleCheckboxChange}
                                />
                            ))}
                        </FormGroup>

                        <FormTextArea
                            label='ผลวิเคราะห์ความต้องการของกลุ่มเป้าหมาย'
                            placeholder='วิเคราะห์ความต้องการของกลุ่มเป้าหมายในการเข้าศึกษาหลักสูตรดังกล่าว'
                            name="analysis_of_future_target"
                            value={formData.analysis_of_future_target}
                            onChange={handleInputChange}
                        />

                        <FormTextArea
                            label='ความร่วมมือกับหน่วยงานจากภาคผู้ใช้บัณฑิต'
                            placeholder='โปรดอธิบายรายละเอียด'
                            name="cooperation"
                            value={formData.cooperation}
                            onChange={handleInputChange}
                        />
                        <FormTextArea
                            label='จุดเด่นของหลักสูตรและการดำเนินการที่จะแข่งขันกับหลักสูตรอื่นที่ใกล้เคียง'
                            placeholder='โปรดอธิบายรายละเอียด'
                            name="high_lights"
                            value={formData.high_lights}
                            onChange={handleInputChange}
                        />

                        <div className="flex justify-end gap-4">
                            <FormButton color='grey' type='button' onClick={() => navigate('/homepage_user')}>
                                ยกเลิก
                            </FormButton>
                            <FormButton type="submit">
                                ต่อไป
                            </FormButton>
                        </div>

                    </Form>
                </div>
            </div>
        </div>
    );
};

export default CourseAnalysisInformation;
