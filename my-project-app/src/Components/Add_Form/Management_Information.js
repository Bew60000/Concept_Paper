import React, { Component } from 'react';
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
]

class Management_Information extends Component {
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
                    title: '',
                    firstName: '',
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
                                        onChange={(e, { value }) => this.handleChange(form.id, 'title', value)}
                                    />
                                    <FormInput
                                        fluid
                                        label='ชื่อ'
                                        placeholder='โปรดระบุชื่อ'
                                        value={form.firstName}
                                        onChange={(e) => this.handleChange(form.id, 'firstName', e.target.value)}
                                    />
                                    <FormInput
                                        fluid
                                        label='นามสกุล'
                                        placeholder='โปรดระบุนามสกุล'
                                        value={form.lastName}
                                        onChange={(e) => this.handleChange(form.id, 'lastName', e.target.value)}
                                    />
                                </FormGroup>

                                <FormTextArea
                                    fluid
                                    label='คุณวุฒิ'
                                    placeholder='โปรดระบุคุณวุฒิ'
                                    value={form.qualification}
                                    onChange={(e) => this.handleChange(form.id, 'qualification', e.target.value)}
                                />

                                <FormGroup widths='equal'>
                                    <FormInput
                                        fluid
                                        label='ตำแหน่งทางวิชาการ'
                                        placeholder='โปรดระบุตำแหน่งทางวิชาการ'
                                        value={form.academicPosition}
                                        onChange={(e) => this.handleChange(form.id, 'academicPosition', e.target.value)}
                                    />
                                </FormGroup>

                                <FormTextArea
                                    fluid
                                    label='ผลงานทางด้านวิชาการย้อนหลัง 3 ปี'
                                    placeholder='ผลงานทางด้านวิชาการ'
                                    value={form.academicWork}
                                    onChange={(e) => this.handleChange(form.id, 'academicWork', e.target.value)}
                                />

                                <FormButton className='flex justify-end gap-4'
                                    type='button'
                                    onClick={() => this.removeForm(form.id)}>
                                    ลบข้อมูล
                                </FormButton>
                                <br />
                                <hr />
                                <br />
                            </div>
                        ))}
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

export default Management_Information;
