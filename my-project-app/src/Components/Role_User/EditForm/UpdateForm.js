import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    FormInput, FormGroup, FormButton, Form, FormTextArea, FormRadio, FormSelect, FormCheckbox,
    FormField
} from 'semantic-ui-react';
import axios from 'axios';

import Background from '../../../img/Background.svg';
import Navbar from '../../Navbar/NavbarUser';

const optionscampus = [
    { key: 'HY', text: 'หาดใหญ่', value: 'หาดใหญ่' },
    { key: 'PK', text: 'ภูเก็ต', value: 'ภูเก็ต' },
    { key: 'PT', text: 'ปัตตานี', value: 'ปัตตานี' },
    { key: 'T', text: 'ตรัง', value: 'ตรัง' },
    { key: 'SR', text: 'สุราษ', value: 'สุราษ' },
];


// Dropdown options
const options = [
    { key: '1', text: 'ชั้นปีที่ 1', value: '1' },
    { key: '2', text: 'ชั้นปีที่ 2', value: '2' },
    { key: '3', text: 'ชั้นปีที่ 3', value: '3' },
    { key: '4', text: 'ชั้นปีที่ 4', value: '4' },
];
export default function UpdateForm() {
    const BackgroundImage = {
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    const location = useLocation();
    const navigate = useNavigate();
    const { info, studentData } = location.state;
    const [formData, setFormData] = useState({
        curriculum_id: info.curriculum_id,
        faculty: info.faculty,
        campus: info.campus,
        majorthai: info.majorthai,
        majoreng: info.majoreng,
        degreename: info.degreename,
        affiliation: info.affiliation,
        yearstarted: info.yearstarted,
        nature: info.nature,
        additionalinfo: info.additionalinfo,
        learningoutcome: info.learningoutcome,
        required_eq_id: info.required_eq_id,
        principle_reasons: info.principle_reasons,
        analysis_of_future_target: info.analysis_of_future_target,
        cooperation: info.cooperation,
        high_lights: info.high_lights,
        id: 1,
        year: studentData.year,
        count_students: studentData.count_students,
        year_offered: studentData.year_offered,
    });


    console.log(info, studentData);

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
    // console.log(studentData);


    const handleChangestudent = useCallback((id, field, value) => {
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
                curriculum_id: info.curriculum_id, // ใส่ค่า curriculum_id ในฟอร์มใหม่
                year_offered: ''
            }
        ]);
    }, [info.curriculum_id]);

    const removeForm = useCallback((id) => {
        setFormData(prevForms => prevForms.filter(form => form.id !== id));
    }, []);


    const HandleChange = (e, { name, value }) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const HandleSubmit = async (e) => {
        e.preventDefault();


        try {

            const response = await axios.put(
                `http://localhost:8080/update_basic_info/${formData.curriculum_id}`, formData);
            await axios.put(`http://localhost:8080/Update_Course_Analysis_Information/${formData.curriculum_id}`, formData);
            console.log(response);
            console.log(formData.curriculum_id);
            // alert('แก้ไขข้อมูลสำเร็จ');
            navigate('/edit_course_analysis_information', { state: { info, studentData } });
            // navigate('/homepage_user', { replace: true });
        } catch (err) {
            console.error(err);
            alert('ไม่สามารถแก้ไขข้อมูลได้');
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
                            <FormSelect
                                fluid
                                label='วิทยาเขต'
                                options={optionscampus}
                                name='campus'
                                placeholder='โปรดเลือก'
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
                                        name="additionalinfo"
                                        value={formData.additionalinfo}
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

                        <FormTextArea
                            label='หลักการและเหตุผลในการขอเปิดหลักสูตร'
                            placeholder='โปรดอธิบายรายละเอียด'
                            name="principle_reasons"
                            style={{ minHeight: '100px' }}
                            value={formData.principle_reasons}
                            onChange={HandleChange}
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
                            onChange={HandleChange}
                        />

                        <FormTextArea
                            label='ความร่วมมือกับหน่วยงานจากภาคผู้ใช้บัณฑิต'
                            placeholder='โปรดอธิบายรายละเอียด'
                            name="cooperation"
                            style={{ minHeight: '100px' }}
                            value={formData.cooperation}
                            onChange={HandleChange}
                        />
                        <FormTextArea
                            label='จุดเด่นของหลักสูตรและการดำเนินการที่จะแข่งขันกับหลักสูตรอื่นที่ใกล้เคียง'
                            placeholder='โปรดอธิบายรายละเอียด'
                            name="high_lights"
                            value={formData.high_lights}
                            style={{ minHeight: '100px' }}
                            onChange={HandleChange}
                        />

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
                                        onChange={(e, { value }) => handleChangestudent(form.id, 'year', value)}
                                    />
                                    <FormInput
                                        fluid
                                        label='ปีที่เปิดสอน'
                                        placeholder='โปรดระบุปีที่เปิดสอน'
                                        value={form.year_offered}
                                        onChange={(e) => handleChangestudent(form.id, 'year_offered', e.target.value)}
                                    />
                                    <FormInput
                                        fluid
                                        label='จำนวนศึกษาที่เปิดรับ(คน)'
                                        placeholder='โปรดระบุจำนวน'
                                        value={form.count_students}
                                        onChange={(e) => handleChangestudent(form.id, 'count_students', e.target.value)}
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

                        <div className="flex justify-start gap-4">

                            <button className="bg-blue-500 hover:bg-blue-700 hover:font-bold text-white px-5 py-3 rounded-lg ml-2" type="submit">
                                <div className="flex justify-start items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                    แก้ไข
                                </div>
                            </button>

                            <button className="bg-gray-500 hover:bg-gray-700 hover:font-bold text-white px-5 py-3 rounded-lg ml-2" onClick={() => navigate('/homepage_user')}>
                                <div className="flex justify-start items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                                    </svg>
                                    ยกเลิก
                                </div>
                            </button>

                        </div>

                    </Form>
                </div>

            </div>
        </div>
    );
}
