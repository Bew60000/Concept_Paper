import React, { useState, useCallback } from 'react';
import {
    FormTextArea,
    FormSelect,
    FormInput,
    FormGroup,
    FormButton,
    Form,
    FormField
} from 'semantic-ui-react';

const options = [
    { key: '1', text: 'ชั้นปีที่ 1', value: '1' },
    { key: '2', text: 'ชั้นปีที่ 2', value: '2' },
    { key: '3', text: 'ชั้นปีที่ 3', value: '3' },
    { key: '4', text: 'ชั้นปีที่ 4', value: '4' },
];

const StudentAdmission = () => {
    const [forms, setForms] = useState([{
        id: 1,
        year: '',
        count_students: ''
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
                year: '',
                count_students: ''
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
                <h1>ส่วนที่ 3 : แผนการรับนักศึกษา</h1>
                <hr />
                <br />
                <Form>
                    {forms.map((form) => (
                        <div key={form.id}>
                            <FormGroup widths='equal'>
                                <hr />
                                <br />
                                <FormSelect
                                    fluid
                                    label='ชั้นปีที่ที่เปิดสอน'
                                    options={options}
                                    placeholder='ชั้นปี**'
                                    value={form.year}
                                    onChange={(e, { value }) => handleChange(form.id, 'year', value)}
                                />
                                <FormInput
                                    fluid
                                    label='จำนวนศึกษาที่เปิดรับ'
                                    placeholder='โปรดระบุจำนวน'
                                    value={form.count_students}
                                    onChange={(e) => handleChange(form.id, 'count_students', e.target.value)}
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

                    <div className='flex justify-between gap-4'>
                        <FormButton type='button' onClick={addForm}>เพิ่มแผนการศึกษา</FormButton>
                        <FormButton type='submit'>ยืนยัน</FormButton>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default StudentAdmission;
