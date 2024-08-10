import React, { useState } from 'react';
import {
  FormTextArea,
  FormRadio,
  FormInput,
  FormGroup,
  FormButton,
  FormField,
  Form,
} from 'semantic-ui-react';
import axios from 'axios';

const BasicInformation = () => {
  const [formData, setFormData] = useState({
    Nature: '',
    AdditionalInfo: '',
    Faculty: '',
    Campus: '',
    MajorThai: '',
    MajorEng: '',
    DegreeName: '',
    Affiliation: '',
    YearStarted: '',
    LearningOutcome: '',
  });

  const HandleChange = (e, { name, value }) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));

    if (name === 'Nature' && value === 'เฉพาะสาขาเดียว') {
      setFormData(prevState => ({
        ...prevState,
        AdditionalInfo: null, 
        // AdditionalInfo: 'ไม่มีข้อมูล',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://sheet.best/api/sheets/12a6d6e6-5b9b-4502-bcc2-ec1aba194585', formData);
      console.log('Data successfully saved:', response.data);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <div className="grid grid-cols-12 auto-rows-auto gap-3 justify-center p-5">
      <div className='bg-white col-span-10 col-start-2 p-20 border-2 rounded-2xl shadow-10'>
        <h1>ส่วนที่ 1 : ข้อมูลเบื้องต้นหลักสูตร</h1>
        <hr />
        <br />
        <Form onSubmit={handleSubmit}>
          <FormGroup widths='equal'>
            <FormInput
              fluid
              label='คณะ'
              placeholder='โปรดระบุคณะ'
              name='Faculty'
              value={formData.Faculty}
              onChange={HandleChange}
            />
            <FormInput
              fluid
              label='วิทยาเขต'
              placeholder='โปรดระบุวิทยาเขต'
              name='Campus'
              value={formData.Campus}
              onChange={HandleChange}
            />
          </FormGroup>

          <FormGroup widths='equal'>
            <FormTextArea
              fluid
              label='ชื่อสาขาวิชา (ภาษาไทย)'
              placeholder='โปรดระบุชื่อสาขาวิชา *ภาษาไทย'
              name='MajorThai'
              value={formData.MajorThai}
              onChange={HandleChange}
            />
            <FormTextArea
              fluid
              label='ชื่อสาขาวิชา (ภาษาอังกฤษ)'
              placeholder='โปรดระบุชื่อสาขาวิชา *ภาษาอังกฤษ'
              name='MajorEng'
              value={formData.MajorEng}
              onChange={HandleChange}
            />
          </FormGroup>

          <FormGroup widths='equal'>
            <FormInput
              fluid
              label='ชื่อปริญญา'
              placeholder='โปรดระบุชื่อปริญญา'
              name='DegreeName'
              value={formData.DegreeName}
              onChange={HandleChange}
            />
            <FormInput
              fluid
              label='สังกัด'
              placeholder='โปรดระบุสังกัด'
              name='Affiliation'
              value={formData.Affiliation}
              onChange={HandleChange}
            />
            <FormInput
              fluid
              label='ปีที่เริ่มดำเนินการเปิดสอน'
              placeholder='โปรดระบุปีที่เริ่มดำเนินการเปิดสอน'
              name='YearStarted'
              value={formData.YearStarted}
              onChange={HandleChange}
            />
          </FormGroup>

          <FormGroup grouped inline>
            <label>ลักษณะของหลักสูตร</label>
            <FormRadio
              fluid
              label='เฉพาะสาขาเดียว'
              // value='Specifically'
              value='เฉพาะสาขาเดียว'
              checked={formData.Nature === 'เฉพาะสาขาเดียว'}
              name='Nature'
              onChange={HandleChange}
            />
            <FormRadio
              fluid
              label='พหุวิทยาการ'
              // value='Multiple'
              value='พหุวิทยาการ'
              checked={formData.Nature === 'พหุวิทยาการ'}
              name='Nature'
              onChange={HandleChange}
            />
            <FormRadio
              fluid
              label='มีจุดเด่นเฉพาะ'
              // value='Highlights'
              value='มีจุดเด่นเฉพาะ'
              checked={formData.Nature === 'มีจุดเด่นเฉพาะ'}
              name='Nature'
              onChange={HandleChange}
            />

            {(formData.Nature === 'พหุวิทยาการ' || formData.Nature === 'มีจุดเด่นเฉพาะ') && (
              <FormGroup widths='equal'>
                <FormTextArea
                  fluid
                  label='รายละเอียดเพิ่มเติม (*ลักษณะของหลักสูตร)'
                  placeholder='โปรดกรอกรายละเอียดเพิ่มเติม'
                  name='AdditionalInfo'
                  value={formData.AdditionalInfo}
                  onChange={HandleChange}
                />
              </FormGroup>
            )}
          </FormGroup>

          <FormTextArea
            fluid
            label='ผลลัพธ์การเรียนรู้ระดับหลักสูตร'
            placeholder='โปรดอธิบายรายละเอียด'
            name='LearningOutcome'
            value={formData.LearningOutcome}
            onChange={HandleChange}
          />

          <FormButton className='grid gap-4 place-items-end' type='submit'>ต่อไป</FormButton>
        </Form>
      </div>
    </div>
  );
};

export default BasicInformation;
