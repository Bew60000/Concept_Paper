import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormInput, FormGroup, FormButton, Form, FormTextArea, FormRadio } from 'semantic-ui-react';
import axios from 'axios';

import Background from '../../img/Background.svg';
import Navbar from '../Navbar/NavbarUser';

export default function UpdateForm() {
    const BackgroundImage = {
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    const location = useLocation();
    const navigate = useNavigate();
    const { info } = location.state;
    const [formData, setFormData] = useState({
        id: info.id,
        faculty: info.faculty,
        campus: info.campus,
        majorthai: info.majorthai,
        majoreng: info.majoreng,
        degreename: info.degreename,
        affiliation: info.affiliation,
        yearstarted: info.yearstarted,
        nature: info.nature,
        additionalInfo: info.additionalInfo,
        learningoutcome: info.learningoutcome
    });
    const [id, setid] = useState(null);

    const HandleChange = (e, { name, value }) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        
        if (name === 'nature') {
            setFormData(prevState => ({
                ...prevState,
                additionalInfo: '',
            }));
        }
    };


    const HandleSubmit = async (e) => {
        e.preventDefault();

        const isFormComplete = Object.entries(formData).every(([key, value]) => {
            if (key === 'additionalInfo' && formData.nature === 'เฉพาะสาขาเดียว') {
                return true; 
            }
            return value !== ''; 
        });

        if (isFormComplete) {
            try {
                //const response = axios.gut('https://sheet.best/api/sheets/12a6d6e6-5b9b-4502-bcc2-ec1aba194585')
                const response = await axios.put(
                    `https://sheet.best/api/sheets/12a6d6e6-5b9b-4502-bcc2-ec1aba194585/majorthai/${formData.majorthai}`,
                    formData
                );
                console.log(response);
                alert('แก้ไขข้อมูลสำเร็จ');
                navigate('/homepage_user', { replace: true });
            } catch (err) {
                console.error(err);
                alert('ไม่สามารถแก้ไขข้อมูลได้');
            }
        } else {
            alert('กรุณากรอกข้อมูลให้ครบถ้วน');
        }
    };

    return (
        <div className="bg-fixed min-w-screen min-h-screen" style={BackgroundImage}>
            <Navbar />

            <div className="flex items-center justify-center grid grid-cols-12 auto-rows-auto p-5 pt-20">
                <div className="bg-white col-span-10 col-start-2 p-20 border-2 rounded-2xl">
                    <h1>แก้ไขข้อมูลส่วนที่ 1 </h1>
                    <hr />
                    <br />

                    <Form onSubmit={HandleSubmit}>
                        <FormGroup widths="equal">
                            <FormInput
                                fluid
                                label="คณะ"
                                placeholder="โปรดระบุคณะ"
                                name="faculty"
                                value={formData.faculty}
                                onChange={HandleChange}
                            />
                            <FormInput
                                fluid
                                label="วิทยาเขต"
                                placeholder="โปรดระบุวิทยาเขต"
                                name="campus"
                                value={formData.campus}
                                onChange={HandleChange}
                            />
                        </FormGroup>

                        <FormGroup widths="equal">
                            <FormTextArea
                                fluid
                                label="ชื่อสาขาวิชา (ภาษาไทย)"
                                placeholder="โปรดระบุชื่อสาขาวิชา *ภาษาไทย"
                                name="majorthai"
                                value={formData.majorthai}
                                onChange={HandleChange}
                            />
                            <FormTextArea
                                fluid
                                label="ชื่อสาขาวิชา (ภาษาอังกฤษ)"
                                placeholder="โปรดระบุชื่อสาขาวิชา *ภาษาอังกฤษ"
                                name="majoreng"
                                value={formData.majoreng}
                                onChange={HandleChange}
                            />
                        </FormGroup>

                        <FormGroup widths="equal">
                            <FormInput
                                fluid
                                label="ชื่อปริญญา"
                                placeholder="โปรดระบุชื่อปริญญา"
                                name="degreename"
                                value={formData.degreename}
                                onChange={HandleChange}
                            />
                            <FormInput
                                fluid
                                label="สังกัด"
                                placeholder="โปรดระบุสังกัด"
                                name="affiliation"
                                value={formData.affiliation}
                                onChange={HandleChange}
                            />
                            <FormInput
                                fluid
                                label="ปีที่เริ่มดำเนินการเปิดสอน"
                                placeholder="โปรดระบุปีที่เริ่มดำเนินการเปิดสอน"
                                name="yearstarted"
                                value={formData.yearstarted}
                                onChange={HandleChange}
                            />
                        </FormGroup>

                        <FormGroup grouped inline>
                            <label>ลักษณะของหลักสูตร</label>
                            <FormRadio
                                label="เฉพาะสาขาเดียว"
                                value="เฉพาะสาขาเดียว"
                                checked={formData.nature === 'เฉพาะสาขาเดียว'}
                                name="nature"
                                onChange={HandleChange}
                            />
                            <FormRadio
                                label="พหุวิทยาการ"
                                value="พหุวิทยาการ"
                                checked={formData.nature === 'พหุวิทยาการ'}
                                name="nature"
                                onChange={HandleChange}
                            />
                            <FormRadio
                                label="มีจุดเด่นเฉพาะ"
                                value="มีจุดเด่นเฉพาะ"
                                checked={formData.nature === 'มีจุดเด่นเฉพาะ'}
                                name="nature"
                                onChange={HandleChange}
                            />

                            {(formData.nature === 'พหุวิทยาการ' || formData.nature === 'มีจุดเด่นเฉพาะ') && (
                                <FormGroup widths="equal">
                                    <FormTextArea
                                        label="รายละเอียดเพิ่มเติม (*ลักษณะของหลักสูตร)"
                                        placeholder="โปรดกรอกรายละเอียดเพิ่มเติม"
                                        name="additionalInfo"
                                        value={formData.additionalInfo}
                                        onChange={HandleChange}
                                    />
                                </FormGroup>
                            )}
                        </FormGroup>

                        <FormTextArea
                            fluid
                            label="ผลลัพธ์การเรียนรู้ระดับหลักสูตร"
                            placeholder="โปรดอธิบายรายละเอียด"
                            name="learningoutcome"
                            value={formData.learningoutcome}
                            onChange={HandleChange}
                        />

                        <FormButton color='blue' type='submit'>แก้ไขฟอร์ม</FormButton>
                    </Form>
                </div>
            </div>
        </div>
    );
}
