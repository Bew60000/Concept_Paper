import React, { useState, useEffect } from 'react';
import {
    FormTextArea,
    FormCheckbox,
    FormGroup,
    Form,
} from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Background from '../../../img/Background.svg';
import Navbar from '../../Navbar/NavbarUser';

const EditCourseAnalysisInformation = () => {
    const BackgroundImage = {
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    const navigate = useNavigate();
    const location = useLocation();
    const curriculum_id = location.state?.curriculum_id;
    const { info, studentData } = location.state;


    const [formData, setFormData] = useState({
        curriculum_id: info.curriculum_id,
        required_eq_id: info.required_eq_id,
        principle_reasons: info.principle_reasons,
        analysis_of_future_target: info.analysis_of_future_target,
        cooperation: info.cooperation,
        high_lights: info.high_lights
    });
    console.log(info);
    console.log(studentData);

    // useEffect(() => {
    //     // ฟังก์ชันโหลดข้อมูลจาก API
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get(`http://localhost:8080/test/get_data_info_analysis_teaching/${curriculum_id}`);
    //             const data = response.data;
    //             console.log(data);
    //             setFormData(prevState => ({
    //                 ...prevState,
    //                 required_eq_id: data.required_eq_id,
    //                 principle_reasons: data.principle_reasons || '',
    //                 analysis_of_future_target: data.analysis_of_future_target || '',
    //                 cooperation: data.cooperation || '',
    //                 high_lights: data.high_lights || '',
    //             }));
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //             alert('เกิดข้อผิดพลาดในการโหลดข้อมูล');
    //         }
    //     };

    //     fetchData();
    // }, [curriculum_id]);

    const handleCheckboxChange = (e, { name, checked }) => {
        setFormData(prevState => {
            let newRequiredEqIdString = prevState.required_eq_id;
            if (checked) {
                newRequiredEqIdString = newRequiredEqIdString
                    ? `${newRequiredEqIdString},${name}`
                    : name;
            } else {
                newRequiredEqIdString = newRequiredEqIdString
                    .split(',')
                    .filter(item => item !== name)
                    .join(',');
            }

            return {
                ...prevState,
                required_eq_id: newRequiredEqIdString,
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
            await axios.put(`http://localhost:8080/Update_Course_Analysis_Information/${formData.curriculum_id}`, formData);
            // alert('ข้อมูลถูกอัปเดตเรียบร้อยแล้ว');
            // navigate('/student_admission', { state: { curriculum_id } });
        } catch (error) {
            console.error('Error updating data:', error);
            alert('เกิดข้อผิดพลาดในการอัปเดตข้อมูล');
        }
    };

    return (
        <div className="bg-fixed min-w-screen min-h-screen" style={BackgroundImage}>
            <Navbar />
            <div className="grid grid-cols-12 auto-rows-auto gap-3 justify-center p-5 pt-20">
                <div className='bg-white col-span-10 col-start-2 p-20 border-2 rounded-2xl shadow-10'>
                    <h1>แก้ไขข้อมูลการวิเคราะห์หลักสูตร</h1>
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
                            <label>กลุ่มเป้าหมายของหลักสูตร</label>
                            {['มัธยมศึกษา', 'ปริญญาตรี', 'ปริญญาโท', 'ปริญญาเอก', 'other'].map(group => (
                                <FormCheckbox
                                    key={group}
                                    label={group}
                                    name={group}
                                    checked={formData.required_eq_id.split(',').includes(group)}
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
                                ยกเลิก
                            </button>

                            <button className="bg-blue-500 hover:bg-blue-700 hover:font-bold text-white px-5 py-3 rounded-lg ml-2" type="submit">
                                บันทึก
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default EditCourseAnalysisInformation;
