import React, { useState, useCallback } from 'react';
import {
    FormTextArea,
    FormSelect,
    FormInput,
    FormGroup,
    FormButton,
    Form,
} from 'semantic-ui-react';

const options = [
    { key: 'm', text: 'อาจารย์', value: 'male' },
    { key: 'f', text: 'ผศ.ดร', value: 'female' },
    { key: 'o', text: 'ศ.ดร', value: 'other' },
];

const ManagementInformation = () => {
    const [forms, setForms] = useState([{
        id: 1,
        title: '',
        firstName: '',
        lastName: '',
        qualification: '',
        academicPosition: '',
        academicWork: ''
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
                title: '',
                firstName: '',
                lastName: '',
                qualification: '',
                academicPosition: '',
                academicWork: ''
            }
        ]);
        setFormCount(prevCount => prevCount + 1);
    }, [formCount]);

    const removeForm = useCallback((id) => {
        setForms(prevForms => prevForms.filter(form => form.id !== id));
    }, []);

    return (
        <div className="grid grid-cols-12 auto-rows-auto gap-3 justify-center p-5">
            <div className='bg-white col-span-10 col-start-2 p-20 border-2 rounded-2xl shadow-10'>
                <h1>ส่วนที่ 4 : รูปแบบการจัดการเรียนการสอนและการบริหารจัดการ</h1>
                <hr />
                <br />
                <Form>

                    <FormTextArea
                        fluid
                        label='รูปแบบของการจัดการเรียนการสอนที่มีการเรียนรู้จากประสบการณ์จริง'
                        placeholder='โปรดอธิบายรายละเอียด'
                    />
                    <FormTextArea
                        fluid
                        label='หลักสูตรฯ มีการควบคุมต้นทุนของการศึกษาอย่างไร'
                        placeholder='โปรดอธิบายรายละเอียด'
                    />
                    <FormTextArea
                        fluid
                        label='ความพร้อมในการจัดการเรียนการสอน'
                        placeholder='โปรดอธิบายรายละเอียด'
                    />

                    <br />
                    
                    <h2>ส่วนที่ 4.1 : ผู้รับผิดชอบหลักสูตร</h2>
                    <hr />
                    <br />

                    {forms.map((form) => (
                        <div key={form.id}>
                            <FormGroup widths='equal'>
                                <hr />
                                <br />
                                <FormSelect
                                    fluid
                                    label='คำนำหน้า'
                                    options={options}
                                    placeholder='คำนำหน้า'
                                    value={form.title}
                                    onChange={(e, { value }) => handleChange(form.id, 'title', value)}
                                />
                                <FormInput
                                    fluid
                                    label='ชื่อ'
                                    placeholder='โปรดระบุชื่อ'
                                    value={form.firstName}
                                    onChange={(e) => handleChange(form.id, 'firstName', e.target.value)}
                                />
                                <FormInput
                                    fluid
                                    label='นามสกุล'
                                    placeholder='โปรดระบุนามสกุล'
                                    value={form.lastName}
                                    onChange={(e) => handleChange(form.id, 'lastName', e.target.value)}
                                />
                            </FormGroup>

                            <FormTextArea
                                fluid
                                label='คุณวุฒิ'
                                placeholder='โปรดระบุคุณวุฒิ'
                                value={form.qualification}
                                onChange={(e) => handleChange(form.id, 'qualification', e.target.value)}
                            />

                            <FormGroup widths='equal'>
                                <FormInput
                                    fluid
                                    label='ตำแหน่งทางวิชาการ'
                                    placeholder='โปรดระบุตำแหน่งทางวิชาการ'
                                    value={form.academicPosition}
                                    onChange={(e) => handleChange(form.id, 'academicPosition', e.target.value)}
                                />
                            </FormGroup>

                            <FormTextArea
                                fluid
                                label='ผลงานทางด้านวิชาการย้อนหลัง 3 ปี'
                                placeholder='ผลงานทางด้านวิชาการ'
                                value={form.academicWork}
                                onChange={(e) => handleChange(form.id, 'academicWork', e.target.value)}
                            />

                            <FormButton
                                className='flex justify-end gap-4'
                                type='button'
                                onClick={() => removeForm(form.id)}
                            >
                                ลบข้อมูล
                            </FormButton>
                            <br />
                            <hr />
                            <br />
                        </div>
                    ))}
                    <div className='flex justify-between gap-4'>
                        <FormButton type='button' onClick={addForm}>เพิ่มผู้รับผิดชอบ</FormButton>
                        <FormButton type='submit'>ยืนยัน</FormButton>
                    </div>                        
                </Form>
            </div>
        </div>
    );
};

export default ManagementInformation;
