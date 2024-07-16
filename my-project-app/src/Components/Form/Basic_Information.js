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
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]

class Basic_Information extends Component {
  state = {}

  handleChange = (e, { value }) => this.setState({ value })

  render() {
    const { value } = this.state
    return (
      <div className="grid grid-cols-12 auto-rows-auto gap-3 justify-center p-5">
        <div className='bg-white col-span-8 col-start-3 p-20 border-2 rounded-2xl shadow-10'>
          <Form>
            <FormGroup widths='equal'>
              <FormInput fluid label='คณะ' placeholder='โปรดระบุคณะ' />
              <FormInput fluid label='วิทยาเขต' placeholder='โปรดระบุวิทยาเขต' />
              {/* <FormSelect
                fluid
                label='Gender'
                options={options}
                placeholder='Gender'
              /> */}
              <FormField />
              <FormField />
            </FormGroup>

            <FormGroup widths='equal'>
              <FormTextArea fluid label='ชื่อสาขาวิชา (ภาษาไทย)' placeholder='โปรดระบุชื่อสาขาวิชา *ภาษาไทย' />
              <FormTextArea fluid label='ชื่อสาขาวิชา (ภาษาอังกฤษ)' placeholder='โปรดระบุชื่อสาขาวิชา *ภาษาอังกฤษ' />
            </FormGroup>

            <FormGroup widths='equal'>
              <FormInput fluid label='ชื่อปริญญา' placeholder='โปรดระบุชื่อปริญญา' />
              <FormInput fluid label='สังกัด' placeholder='โปรดระบุสังกัด' />
              <FormInput fluid label='ปีที่เริ่มดำเนินการเปิดสอน' placeholder='โปรดระบุปีที่เริ่มดำเนินการเปิดสอน' />
            </FormGroup>

            <FormGroup inline>
              <label>ลักษณะของหลักสูตร</label>
              <FormRadio
                label='เฉพาะสาขาเดียว'
                value='sm'
                checked={value === 'sm'}
                onChange={this.handleChange}
              />
              <FormRadio
                label='พหุวิทยาการ'
                value='md'
                checked={value === 'md'}
                onChange={this.handleChange}
              />
              <FormRadio
                label='มีจุดเด่นเฉพาะ'
                value='lg'
                checked={value === 'lg'}
                onChange={this.handleChange}
              />

            </FormGroup>
            <FormTextArea label='ผลลัพธ์การเรียนรู้ระดับหลักสูตร' placeholder='โปรดอธิบายรายละเอียด' />
            {/* <FormCheckbox label='I agree to the Terms and Conditions' /> */}
            <FormButton className='grid gap-4 place-items-end'>ต่อไป</FormButton>
          </Form>
        </div>
      </div>


    )
  }
}

export default Basic_Information