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

class Course_Analysis_Information extends Component {
    state = {}

    handleChange = (e, { value }) => this.setState({ value })

    render() {
        const { value } = this.state
        return (
            <div className="grid grid-cols-12 auto-rows-auto gap-3 justify-center p-5">
                <div className='bg-white col-span-8 col-start-3 p-20 border-2 rounded-2xl shadow-10'>
                    <Form>

                        <FormTextArea fluid label='หลักการและเหตุผลในการขอเปิดหลักสูตร' placeholder='โปรดอธิบายรายละเอียด' />

                        <FormGroup grouped inline>
                            <label>กลุ่มเป้าหมายของหลักสูตร หลักสูตรเปิดรับผู้สำเร็จการศึกษาระดับ</label>
                            {/* <FormField label='This one' control='input' type='checkbox' />
                            <FormField label='That one' control='input' type='checkbox' /> */}
                            <FormCheckbox label='มัธยมศึกษา' />
                            <FormCheckbox label='ปริญญาตรี' />
                            <FormCheckbox label='ปริญญาโท' />
                            <FormCheckbox label='ปริญญาเอก' />
                            <FormCheckbox label='อื่น ๆ' />
                        </FormGroup>

                        <FormTextArea fluid label='ผลวิเคราะห์ความต้องการของกลุ่มเป้าหมายใน'
                            placeholder='วิเคราะห์ความต้องการของกลุ่มเป้าหมายในการเข้าศึกษาหลักสูตรดังกล่าว และระบุข้อมูลที่ใช้ในการคาดการณ์จำนวนผู้เรียนในอนาคต' />



                        <FormTextArea label='ความร่วมมือกับหน่วยงานจากภาคผู้ใช้บัณฑิต' placeholder='โปรดอธิบายรายละเอียด' />
                        <FormTextArea label='จุดเด่นของหลักสูตรและการดำเนินการที่จะแข่งขันกับหลักสูตรอื่นที่ใกล้เคียง' placeholder='โปรดอธิบายรายละเอียด' />

                        <FormButton className='grid gap-4 place-items-end'>ต่อไป</FormButton>
                    </Form>
                </div>
            </div>


        )
    }
}

export default Course_Analysis_Information