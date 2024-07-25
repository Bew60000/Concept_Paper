import React, { Component } from 'react';
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
]

class Student_Admission extends Component {
    state = {
        forms: [{
            id: 1,
            title: '',
            firstName: '',
            lastName: '',
            qualification: '',
            academicPosition: '',
            academicWork: ''
        }],
        formCount: 1
    }

    handleChange = (id, field, value) => {
        const updatedForms = this.state.forms.map(form => {
            if (form.id === id) {
                return { ...form, [field]: value }
            }
            return form
        })
        this.setState({ forms: updatedForms })
    }

    addForm = () => {
        this.setState(prevState => ({
            forms: [
                ...prevState.forms,
                {
                    id: prevState.formCount + 1,
                    year: '',
                    count_students: '',
                    lastName: '',
                    qualification: '',
                    academicPosition: '',
                    academicWork: ''
                }
            ],
            formCount: prevState.formCount + 1
        }))
    }

    removeForm = (id) => {
        this.setState(prevState => ({
            forms: prevState.forms.filter(form => form.id !== id)
        }))
    }

    render() {
        const { forms } = this.state
        return (
            <div className="grid grid-cols-12 auto-rows-auto gap-3 justify-center p-5">
                <div className='bg-white col-span-10 col-start-2 p-20 border-2 rounded-2xl shadow-10'>
                    <h1>ส่วนที่ 3 : แผนการรับนักศึกษา</h1>
                    <hr />
                    <br />
                    <Form>
                        {forms.map((form, index) => (
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
                                        onChange={(e, { value }) => this.handleChange(form.id, 'year', value)}
                                    />
                                    <FormInput
                                        fluid
                                        label='จำนวนศึกษาที่เปิดรับ'
                                        placeholder='โปรดระบุจำนวน'
                                        value={form.count_students}
                                        onChange={(e) => this.handleChange(form.id, 'count_students', e.target.value)}
                                    />

                                    <FormButton
                                        className='grid gap-4 content-end'
                                        type='button'
                                        onClick={() => this.removeForm(form.id)}>
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
                            <FormButton type='button' onClick={this.addForm}>เพิ่มผู้รับผิดชอบ</FormButton>
                            <FormButton type='submit'>ยืนยัน</FormButton>
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
}

export default Student_Admission;
