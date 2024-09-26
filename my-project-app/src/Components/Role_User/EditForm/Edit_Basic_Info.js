import React, { useState, useEffect } from 'react';
import {
    FormTextArea,
    FormRadio,
    FormInput,
    FormGroup,
    FormButton,
    Form,
} from 'semantic-ui-react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import Background from '../../../img/Background.svg';
import Navbar from '../../Navbar/NavbarUser';

const Basic_Information = () => {
    const BackgroundImage = {
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }

    const navigate = useNavigate();
    const location = useLocation();
    const { info } = location.state;

    const [formData, setFormData] = useState({
        Nature: info.nature,
        AdditionalInfo: info.additionalInfo,
        Faculty: info.faculty_id,
        Campus: info.campus,
        MajorThai: info.majorthai,
        MajorEng: info.majoreng,
        DegreeName: info.degreename,
        Affiliation: info.affiliation,
        YearStarted: info.yearstarted,
        LearningOutcome: info.learn_outcomes,
    });


    const HandleChange = (e, { name, value }) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));

        if (name === 'Nature' && value === 'เฉพาะสาขาเดียว') {
            setFormData(prevState => ({
                ...prevState,
                AdditionalInfo: null,
            }));
        }
    };

    const UpdateSubmit = (e) => {
        e.preventDefault();
        const isFormComplete = Object.values(formData).every(
            (field) => field !== ''
        );

        if (isFormComplete) {
            try {
                axios.put(`http://localhost:8080/update_user/${info.id}`, formData)
                    .then(res => {
                        console.log(res);
                        console.log(info.id);
                        alert('แก้ไขข้อมูลสำเร็จ');
                        navigate('/'); // กลับไปยังหน้าหลักหรือหน้าที่ต้องการหลังแก้ไขเสร็จ
                        window.location.reload();
                    })
                    .catch(err => {
                        console.error(err);
                        console.log(info.id);

                        alert('ไม่สามารถแก้ไขข้อมูลได้');
                    });

                setFormData({
                    Name: '', LastName: '', Username: '', Password: '', Email: '',
                    Phone: '', Affiliation: '', Position: '', Campus: '',
                });
            } catch (error) {
                console.error('Error saving data:', error);
            }
        } else {
            alert('กรุณากรอกข้อมูลให้ครบถ้วน');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requiredFields = ['faculty', 'campus', 'majorthai',
            'majoreng', 'degreename', 'affiliation', 'yearstarted',
            'nature', 'learningoutcome'];

        const isFormComplete = requiredFields.every(
            (field) => formData[field] !== '' && formData[field] !== null && formData[field] !== undefined
        );

        if (isFormComplete) {
            try {
                const response = await axios.post('http://localhost:8080/add_basic_info', formData);
                const newCurriculumId = response.data.curriculum_id;
                console.log('Data saved with curriculum_id:', newCurriculumId);

                // ส่งค่า newCurriculumId ไปยังฟอร์มอื่น ๆ หรือทำการบันทึกค่าใน state เพื่อใช้งานต่อไป
                // ตัวอย่างการบันทึกใน state
                setFormData(prevForms =>
                    prevForms.map(f =>
                        f.id === formData.id ? { ...f, curriculum_id: newCurriculumId } : f
                    )
                );

                // navigate('/course_analysis_information', {
                //   state: { curriculum_id: newCurriculumId },
                // });

                // navigate('/StudentAdmission', {
                //   state: { curriculum_id: newCurriculumId },
                // });

                navigate('/homepage_user', { replace: true });

            } catch (error) {
                console.error('Error saving data:', error);
            }
        } else {
            alert('กรุณากรอกข้อมูลให้ครบถ้วน');
        }
    };

    return (
        <div className="bg-fixed min-w-screen min-h-screen" style={BackgroundImage}>
            <Navbar />
            <div className="grid grid-cols-12 auto-rows-auto gap-3 justify-center p-5 pt-20">
                <div className="bg-white col-span-10 col-start-2 p-20 border-2 rounded-2xl shadow-10">
                    <h1>ส่วนที่ 1 : ข้อมูลเบื้องต้นหลักสูตร</h1>
                    <hr />
                    <br />
                    <Form onSubmit={UpdateSubmit}>
                        <FormGroup widths="equal">
                            <FormInput
                                fluid
                                label="คณะ"
                                placeholder="โปรดระบุคณะ"
                                name="Faculty"
                                value={formData.Faculty}
                                onChange={HandleChange}
                            />
                            <FormInput
                                fluid
                                label="วิทยาเขต"
                                placeholder="โปรดระบุวิทยาเขต"
                                name="Campus"
                                value={formData.Campus}
                                onChange={HandleChange}
                            />
                        </FormGroup>

                        <FormGroup widths="equal">
                            <FormTextArea
                                fluid
                                label="ชื่อสาขาวิชา (ภาษาไทย)"
                                placeholder="โปรดระบุชื่อสาขาวิชา *ภาษาไทย"
                                name="MajorThai"
                                value={formData.MajorThai}
                                onChange={HandleChange}
                            />
                            <FormTextArea
                                fluid
                                label="ชื่อสาขาวิชา (ภาษาอังกฤษ)"
                                placeholder="โปรดระบุชื่อสาขาวิชา *ภาษาอังกฤษ"
                                name="MajorEng"
                                value={formData.MajorEng}
                                onChange={HandleChange}
                            />
                        </FormGroup>

                        <FormGroup widths="equal">
                            <FormInput
                                fluid
                                label="ชื่อปริญญา"
                                placeholder="โปรดระบุชื่อปริญญา"
                                name="DegreeName"
                                value={formData.DegreeName}
                                onChange={HandleChange}
                            />
                            <FormInput
                                fluid
                                label="สังกัด"
                                placeholder="โปรดระบุสังกัด"
                                name="Affiliation"
                                value={formData.Affiliation}
                                onChange={HandleChange}
                            />
                            <FormInput
                                fluid
                                label="ปีที่เริ่มดำเนินการเปิดสอน"
                                placeholder="โปรดระบุปีที่เริ่มดำเนินการเปิดสอน"
                                name="YearStarted"
                                value={formData.YearStarted}
                                onChange={HandleChange}
                            />
                        </FormGroup>

                        <FormGroup grouped inline>
                            <label>ลักษณะของหลักสูตร</label>
                            <FormRadio
                                fluid
                                label="เฉพาะสาขาเดียว"
                                value="เฉพาะสาขาเดียว"
                                checked={formData.Nature === 'เฉพาะสาขาเดียว'}
                                name="Nature"
                                onChange={HandleChange}
                            />
                            <FormRadio
                                fluid
                                label="พหุวิทยาการ"
                                value="พหุวิทยาการ"
                                checked={formData.Nature === 'พหุวิทยาการ'}
                                name="Nature"
                                onChange={HandleChange}
                            />
                            <FormRadio
                                fluid
                                label="มีจุดเด่นเฉพาะ"
                                value="มีจุดเด่นเฉพาะ"
                                checked={formData.Nature === 'มีจุดเด่นเฉพาะ'}
                                name="Nature"
                                onChange={HandleChange}
                            />

                            {(formData.Nature === 'พหุวิทยาการ' ||
                                formData.Nature === 'มีจุดเด่นเฉพาะ') && (
                                    <FormGroup widths="equal">
                                        <FormTextArea
                                            fluid
                                            label="รายละเอียดเพิ่มเติม (*ลักษณะของหลักสูตร)"
                                            placeholder="โปรดกรอกรายละเอียดเพิ่มเติม"
                                            name="AdditionalInfo"
                                            value={formData.AdditionalInfo}
                                            onChange={HandleChange}
                                        />
                                    </FormGroup>
                                )}
                        </FormGroup>

                        <FormTextArea
                            fluid
                            label="ผลลัพธ์การเรียนรู้ระดับหลักสูตร"
                            placeholder="โปรดอธิบายรายละเอียด"
                            name="LearningOutcome"
                            value={formData.LearningOutcome}
                            onChange={HandleChange}
                        />

                        <div className="flex justify-end gap-4">
                            <button type="button">
                                ยกเลิก
                            </button>
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

export default Basic_Information;
