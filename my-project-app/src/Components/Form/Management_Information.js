import React, { Component } from 'react'
import {
    FormTextArea,
    FormSelect,
    FormRadio,
    FormInput,
    FormGroup,
    FormCheckbox,
    FormButton,
    FormField,
    Form,
} from 'semantic-ui-react'

const options = [
    { key: 'm', text: 'อาจารย์', value: 'male' },
    { key: 'f', text: 'ผศ.ดร', value: 'female' },
    { key: 'o', text: 'ศ.ดร', value: 'other' },
]

class Management_Information extends Component {
    state = {}

    handleChange = (e, { value }) => this.setState({ value })

    render() {
        const { value } = this.state
        return (
            <div className="grid grid-cols-12 auto-rows-auto gap-3 justify-center p-5">
                <div className='bg-white col-span-8 col-start-3 p-20 border-2 rounded-2xl shadow-10'>
                    <Form>
                        <FormTextArea fluid label='รูปแบบของการจัดการเรียนการสอนที่มีการเรียนรู้จากประสบการณ์จริง' placeholder='โปรดอธิบายรายละเอียด' />
                        <FormTextArea fluid label='หลักสูตรฯ มีการควบคุมต้นทุนของการศึกษาอย่างไร' placeholder='โปรดอธิบายรายละเอียด' />
                        <FormTextArea fluid label='ความพร้อมในการจัดการเรียนการสอน' placeholder='โปรดอธิบายรายละเอียด' />

                        <FormGroup widths='equal'>
                            <FormSelect
                                fluid
                                label='คำนำหน้า'
                                options={options}
                                placeholder='คำนำหน้า'
                            />
                            <FormInput fluid label='ชื่อ' placeholder='โปรดระบุชื่อ' />
                            <FormInput fluid label='นามสกุล' placeholder='โปรดระบุนามสกุล' />
                        </FormGroup>

                        <FormTextArea fluid label='คุณวุฒิ' placeholder='โปรดระบุคุณวุฒิ' />

                        <FormGroup widths='equal'>
                            <FormInput fluid label='ตำแหน่งทางวิชาการ' placeholder='โปรดระบุตำแหน่งทางวิชาการ' />
                            <FormField />
                        </FormGroup>

                        <FormTextArea fluid label='ผลงานทางด้านวิชาการย้อนหลัง 3 ปี' placeholder='ผลงานทางด้านวิชาการ' />


                        <FormButton className='grid gap-4 place-items-end'>ยืนยัน</FormButton>
                    </Form>
                </div>
            </div>


        )
    }
}

export default Management_Information