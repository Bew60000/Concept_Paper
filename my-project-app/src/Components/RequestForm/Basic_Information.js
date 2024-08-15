import React, { useState, useEffect } from 'react';
import {
  FormTextArea,
  FormRadio,
  FormInput,
  FormGroup,
  FormButton,
  Form,
  FormSelect,
} from 'semantic-ui-react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import Background from '../../img/Background.svg';
import Navbar from '../Navbar/NavbarUser';

const optionscampus = [
  { key: 'HY', text: 'หาดใหญ่', value: 'หาดใหญ่' },
  { key: 'PK', text: 'ภูเก็ต', value: 'ภูเก็ต' },
  { key: 'PT', text: 'ปัตตานี', value: 'ปัตตานี' },
  { key: 'T', text: 'ตรัง', value: 'ตรัง' },
  { key: 'SR', text: 'สุราษ', value: 'สุราษ' },
];

const Basic_Information = () => {
  const BackgroundImage = {
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  const [formData, setFormData] = useState({
    curriculum_id: '',
    nature: '',
    additionalinfo: '',
    majorthai: '',
    majoreng: '',
    faculty: '',
    degreename: '',
    affiliation: '',
    campus: '',
    yearstarted: '',
    learningoutcome: '',
  });

  const navigate = useNavigate();

  const HandleChange = (e, { name, value }) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));

    if (name === 'Nature' && value === 'เฉพาะสาขาเดียว') {
      setFormData(prevState => ({
        ...prevState,
        additionalinfo: null,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const isFormComplete = Object.values(formData).every(
    //   (field) => field !== ''
    // );

    // if (isFormComplete) {
    try {
      const response = await axios.post('http://localhost:8080/add_basic_info', formData);
      // const response = await axios.post(
      //   'https://sheet.best/api/sheets/12a6d6e6-5b9b-4502-bcc2-ec1aba194585',
      //   formData
      // );

      const newCurriculumId = response.data.curriculum_id;
      console.log('Data saved with curriculum_id:', newCurriculumId);

      // ส่งค่า newCurriculumId ไปยังฟอร์มอื่น ๆ หรือทำการบันทึกค่าใน state เพื่อใช้งานต่อไป
      // ตัวอย่างการบันทึกใน state
      setFormData(prevForms =>
        prevForms.map(f =>
          f.id === formData.id ? { ...f, curriculum_id: newCurriculumId } : f
        )
      );

      console.log('Data successfully saved:', response.data);
      navigate('/course_analysis_information', {
        state: { curriculum_id: newCurriculumId },
      });
      // navigate('/homepage_user', { replace: true });
    } catch (error) {
      console.error('Error saving data:', error);
    }
    // } else {
    //   alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    // }

  };


  return (
    <div className="bg-fixed min-w-screen min-h-screen" style={BackgroundImage}>
      <Navbar />
      <div className="grid grid-cols-12 auto-rows-auto gap-3 justify-center p-5 pt-20">
        <div className="bg-white col-span-10 col-start-2 p-20 border-2 rounded-2xl shadow-10">
          <h1>ส่วนที่ 1 : ข้อมูลเบื้องต้นหลักสูตร</h1>
          <hr />
          <br />
          <Form onSubmit={handleSubmit}>
            <FormGroup widths="equal">
              <FormInput
                fluid
                label="คณะ"
                placeholder="โปรดระบุคณะ"
                name="faculty"
                value={formData.faculty}
                onChange={HandleChange}
              />

              <FormSelect
                fluid
                label='วิทยาเขต'
                options={optionscampus}
                name='campus'
                placeholder='โปรดเลือก'
                value={formData.campus}
                onChange={HandleChange}
              />
            </FormGroup>

            <FormGroup widths="equal">
              <FormTextArea
                fluid
                label="ชื่อสาขาวิชา (ภาษาไทย)"
                placeholder="โปรดระบุชื่อสาขาวิชา *ภาษาไทย"
                name="majorthai"
                value={formData.majorthai}
                onChange={HandleChange}
              />
              <FormTextArea
                fluid
                label="ชื่อสาขาวิชา (ภาษาอังกฤษ)"
                placeholder="โปรดระบุชื่อสาขาวิชา *ภาษาอังกฤษ"
                name="majoreng"
                value={formData.majoreng}
                onChange={HandleChange}
              />
            </FormGroup>

            <FormGroup widths="equal">
              <FormInput
                fluid
                label="ชื่อปริญญา"
                placeholder="โปรดระบุชื่อปริญญา"
                name="degreename"
                value={formData.degreename}
                onChange={HandleChange}
              />
              <FormInput
                fluid
                label="สังกัด"
                placeholder="โปรดระบุสังกัด"
                name="affiliation"
                value={formData.affiliation}
                onChange={HandleChange}
              />
              <FormInput
                fluid
                label="ปีที่เริ่มดำเนินการเปิดสอน"
                placeholder="โปรดระบุปีที่เริ่มดำเนินการเปิดสอน"
                name="yearstarted"
                value={formData.yearstarted}
                onChange={HandleChange}
              />
            </FormGroup>

            <FormGroup grouped inline>
              <label>ลักษณะของหลักสูตร</label>
              <FormRadio
                fluid
                label="เฉพาะสาขาเดียว"
                value="เฉพาะสาขาเดียว"
                checked={formData.nature === 'เฉพาะสาขาเดียว'}
                name="nature"
                onChange={HandleChange}
              />
              <FormRadio
                fluid
                label="พหุวิทยาการ"
                value="พหุวิทยาการ"
                checked={formData.nature === 'พหุวิทยาการ'}
                name="nature"
                onChange={HandleChange}
              />
              <FormRadio
                fluid
                label="มีจุดเด่นเฉพาะ"
                value="มีจุดเด่นเฉพาะ"
                checked={formData.nature === 'มีจุดเด่นเฉพาะ'}
                name="nature"
                onChange={HandleChange}
              />

              {(formData.nature === 'พหุวิทยาการ' ||
                formData.nature === 'มีจุดเด่นเฉพาะ') && (
                  <FormGroup widths="equal">
                    <FormTextArea
                      fluid
                      label="รายละเอียดเพิ่มเติม (*ลักษณะของหลักสูตร)"
                      placeholder="โปรดกรอกรายละเอียดเพิ่มเติม"
                      name="additionalinfo"
                      value={formData.additionalinfo}
                      onChange={HandleChange}
                    />
                  </FormGroup>
                )}
            </FormGroup>

            <FormTextArea
              fluid
              label="ผลลัพธ์การเรียนรู้ระดับหลักสูตร"
              placeholder="โปรดอธิบายรายละเอียด"
              name="learningoutcome"
              value={formData.learningoutcome}
              onChange={HandleChange}
            />

            <div className="flex justify-end gap-4">
              <FormButton>
                ยกเลิก
              </FormButton>
              <FormButton type="submit">
                ต่อไป
              </FormButton>
            </div>

          </Form>
        </div>
      </div>


    </div>
  );
};

export default Basic_Information;
