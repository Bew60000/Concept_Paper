import React, { useState } from 'react';
import {
    FormTextArea,
    FormCheckbox,
    FormButton,
    FormGroup,
    Form,
} from 'semantic-ui-react';

const CourseAnalysisInformation = () => {
    const [targetGroups, setTargetGroups] = useState({
        highSchool: false,
        bachelor: false,
        master: false,
        doctorate: false,
        other: false,
    });

    const [otherDetails, setOtherDetails] = useState('');

    const handleCheckboxChange = (e, { name, checked }) => {
        setTargetGroups(prevState => ({
            ...prevState,
            [name]: checked,
        }));
    };

    const handleOtherDetailsChange = (e) => {
        setOtherDetails(e.target.value);
    };

    return (
        <div className="grid grid-cols-12 auto-rows-auto gap-3 justify-center p-5">
            <div className='bg-white col-span-10 col-start-2 p-20 border-2 rounded-2xl shadow-10'>
                <h1>ส่วนที่ 2 : ข้อมูลการวิเคราะห์หลักสูตร</h1>
                <hr />
                <br />
                <Form>
                    <FormTextArea
                        fluid
                        label='หลักการและเหตุผลในการขอเปิดหลักสูตร'
                        placeholder='โปรดอธิบายรายละเอียด'
                    />

                    <FormGroup grouped inline>
                        <label>กลุ่มเป้าหมายของหลักสูตร หลักสูตรเปิดรับผู้สำเร็จการศึกษาระดับ</label>
                        <FormCheckbox
                            label='มัธยมศึกษา'
                            name='highSchool'
                            checked={targetGroups.highSchool}
                            onChange={handleCheckboxChange}
                        />
                        <FormCheckbox
                            label='ปริญญาตรี'
                            name='bachelor'
                            checked={targetGroups.bachelor}
                            onChange={handleCheckboxChange}
                        />
                        <FormCheckbox
                            label='ปริญญาโท'
                            name='master'
                            checked={targetGroups.master}
                            onChange={handleCheckboxChange}
                        />
                        <FormCheckbox
                            label='ปริญญาเอก'
                            name='doctorate'
                            checked={targetGroups.doctorate}
                            onChange={handleCheckboxChange}
                        />
                        <FormCheckbox
                            label='อื่น ๆ'
                            name='other'
                            checked={targetGroups.other}
                            onChange={handleCheckboxChange}
                        />

                        {targetGroups.other && (
                            <FormTextArea
                                fluid
                                label='โปรดระบุรายละเอียดเพิ่มเติม'
                                placeholder='โปรดกรอกรายละเอียดเพิ่มเติม'
                                value={otherDetails}
                                onChange={handleOtherDetailsChange}
                            />
                        )}
                    </FormGroup>

                    <FormTextArea
                        fluid
                        label='ผลวิเคราะห์ความต้องการของกลุ่มเป้าหมายใน'
                        placeholder='วิเคราะห์ความต้องการของกลุ่มเป้าหมายในการเข้าศึกษาหลักสูตรดังกล่าว และระบุข้อมูลที่ใช้ในการคาดการณ์จำนวนผู้เรียนในอนาคต'
                    />

                    <FormTextArea
                        label='ความร่วมมือกับหน่วยงานจากภาคผู้ใช้บัณฑิต'
                        placeholder='โปรดอธิบายรายละเอียด'
                    />
                    <FormTextArea
                        label='จุดเด่นของหลักสูตรและการดำเนินการที่จะแข่งขันกับหลักสูตรอื่นที่ใกล้เคียง'
                        placeholder='โปรดอธิบายรายละเอียด'
                    />

                    <FormButton className='grid gap-4 place-items-end' type='submit'>ต่อไป</FormButton>
                </Form>
            </div>
        </div>
    );
};

export default CourseAnalysisInformation;
