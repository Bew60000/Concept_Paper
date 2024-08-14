import React, { useState } from 'react';
import {
    FormTextArea,
    FormCheckbox,
    FormButton,
    FormGroup,
    Form,
} from 'semantic-ui-react';
import axios from 'axios';

const CourseAnalysisInformation = () => {
    
    const [formData, setFormData] = useState({
        targetGroups: {
            highSchool: false,
            bachelor: false,
            master: false,
            doctorate: false,
            other: false,
        },
        principle_reasons: '',
        required_eq_id: '',
        analysis_of_future_target: '',
        cooperation: '',
        high_lights: '',
    });

    const handleCheckboxChange = (e, { name, checked }) => {
        setFormData(prevState => ({
            ...prevState,
            targetGroups: {
                ...prevState.targetGroups,
                [name]: checked,
            }
        }));
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

        // Validate required fields
        const isFormComplete =
            formData.principle_reasons.trim() !== '' &&
            formData.analysis_of_future_target.trim() !== '' &&
            formData.cooperation.trim() !== '' &&
            formData.high_lights.trim() !== '';

        if (isFormComplete) {
            // Prepare required_eq_id from selected targetGroups
            const selectedTargetGroups = Object.keys(formData.targetGroups)
                .filter(key => formData.targetGroups[key])
                .join(', '); // Join selected groups into a string

            const dataToSubmit = {
                ...formData,
                required_eq_id: selectedTargetGroups, // Assign the joined string to required_eq_id
            };

            try {
                const response = await axios.post(
                    'http://localhost:8080/add_Course_Analysis_Information',
                    dataToSubmit
                );
                console.log('Data successfully saved:', response.data);
                alert('ข้อมูลถูกบันทึกเรียบร้อยแล้ว');
                // Reset form after successful submission
                setFormData({
                    targetGroups: {
                        highSchool: false,
                        bachelor: false,
                        master: false,
                        doctorate: false,
                        other: false,
                    },
                    principle_reasons: '',
                    required_eq_id: '',
                    analysis_of_future_target: '',
                    cooperation: '',
                    high_lights: '',
                });
            } catch (error) {
                console.error('Error saving data:', error);
                alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
            }
        } else {
            alert('กรุณากรอกข้อมูลให้ครบถ้วน');
        }
    };

    return (
        <div className="grid grid-cols-12 auto-rows-auto gap-3 justify-center p-5">
            <div className='bg-white col-span-10 col-start-2 p-20 border-2 rounded-2xl shadow-10'>
                <h1>ส่วนที่ 2 : ข้อมูลการวิเคราะห์หลักสูตร</h1>
                <hr />
                <br />
                <Form onSubmit={handleSubmit}>
                    <FormTextArea
                        fluid
                        label='หลักการและเหตุผลในการขอเปิดหลักสูตร'
                        placeholder='โปรดอธิบายรายละเอียด'
                        name="principle_reasons"
                        value={formData.principle_reasons}
                        onChange={handleInputChange}
                    />

                    <FormGroup grouped inline>
                        <label>กลุ่มเป้าหมายของหลักสูตร หลักสูตรเปิดรับผู้สำเร็จการศึกษาระดับ</label>
                        {['มัธยมศึกษา', 'ปริญญาตรี', 'ปริญญาโท', 'ปริญญาเอก', 'อื่น ๆ'].map(group => (
                            <FormCheckbox
                                key={group}
                                label={group === 'other' ? 'อื่น ๆ' : group}
                                name={group}
                                checked={formData.targetGroups[group]}
                                onChange={handleCheckboxChange}
                            />
                        ))}

                        {formData.targetGroups.other && (
                            <FormTextArea
                                fluid
                                label='โปรดระบุรายละเอียดเพิ่มเติม'
                                placeholder='โปรดกรอกรายละเอียดเพิ่มเติม'
                                name="required_eq_id"
                                value={formData.required_eq_id}
                                onChange={handleInputChange}
                            />
                        )}
                    </FormGroup>

                    <FormTextArea
                        fluid
                        label='ผลวิเคราะห์ความต้องการของกลุ่มเป้าหมายใน'
                        placeholder='วิเคราะห์ความต้องการของกลุ่มเป้าหมายในการเข้าศึกษาหลักสูตรดังกล่าว และระบุข้อมูลที่ใช้ในการคาดการณ์จำนวนผู้เรียนในอนาคต'
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

                    <FormButton className='grid gap-4 place-items-end' type='submit'>ต่อไป</FormButton>
                </Form>
            </div>
        </div>
    );
};

export default CourseAnalysisInformation;