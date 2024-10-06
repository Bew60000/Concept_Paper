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

// Dropdown options
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
  };

  const navigate = useNavigate();

  // Check if the user is logged in
  const loggedInUser = localStorage.getItem('loggedInUser');
  let username = ''; // Initial empty username
  if (loggedInUser) {
    const user = JSON.parse(loggedInUser); // Convert JSON string to object
    username = user.username; // Get username from the logged-in user
  }

  // If the user is not logged in, display an alert
  useEffect(() => {
    if (!username) {
      alert('กรุณาล็อกอินก่อนส่งแบบฟอร์ม');
      navigate('/login'); // Redirect to login page
    }
  }, [username, navigate]);

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
    sent_by: username, 
    sent_time: '', 
  });

  const handleChange = (e, { name, value }) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));

    if (name === 'nature' && value === 'เฉพาะสาขาเดียว') {
      setFormData(prevState => ({
        ...prevState,
        additionalinfo: null,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();    

    const requiredFields = ['faculty', 'campus', 'majorthai',
      'majoreng', 'degreename', 'affiliation', 'yearstarted',
      'nature', 'learningoutcome'];

    const isFormComplete = requiredFields.every(
      (field) => formData[field] !== '' && formData[field] !== null && formData[field] !== undefined
    );

    if (isFormComplete) {
      try {
        // Set sent_time when form is submitted
        const currentDateTime = new Date().toISOString();
        const updatedFormData = { ...formData, sent_time: currentDateTime, sent_by: username };

        const response = await axios.post('http://localhost:8080/add_basic_info', updatedFormData);
        const newCurriculumId = response.data.curriculum_id;
        console.log('Data saved with curriculum_id:', newCurriculumId);

        navigate('/course_analysis_information', {
          state: { curriculum_id: newCurriculumId },
        }, { replace: true });

      } catch (error) {
        console.error('Error saving data:', error);
      }
    } else {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    }
  };

  return (
    <div className="bg-fixed min-w-screen min-h-screen" style={BackgroundImage}>
      <Navbar />
      <div className="grid grid-cols-12 content-start auto-rows-auto text-gray-700 p-5 pt-20">
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
                onChange={handleChange}
              />

              <FormSelect
                fluid
                label='วิทยาเขต'
                options={optionscampus}
                name='campus'
                placeholder='โปรดเลือก'
                value={formData.campus}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup widths="equal">
              <FormTextArea
                fluid
                label="ชื่อสาขาวิชา (ภาษาไทย)"
                placeholder="โปรดระบุชื่อสาขาวิชา *ภาษาไทย"
                name="majorthai"
                value={formData.majorthai}
                onChange={handleChange}
              />
              <FormTextArea
                fluid
                label="ชื่อสาขาวิชา (ภาษาอังกฤษ)"
                placeholder="โปรดระบุชื่อสาขาวิชา *ภาษาอังกฤษ"
                name="majoreng"
                value={formData.majoreng}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup widths="equal">
              <FormInput
                fluid
                label="ชื่อปริญญา"
                placeholder="โปรดระบุชื่อปริญญา"
                name="degreename"
                value={formData.degreename}
                onChange={handleChange}
              />
              <FormInput
                fluid
                label="สังกัด"
                placeholder="โปรดระบุสังกัด"
                name="affiliation"
                value={formData.affiliation}
                onChange={handleChange}
              />
              <FormInput
                fluid
                label="ปีที่เริ่มดำเนินการเปิดสอน"
                placeholder="โปรดระบุปีที่เริ่มดำเนินการเปิดสอน"
                name="yearstarted"
                value={formData.yearstarted}
                onChange={handleChange}
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
                onChange={handleChange}
              />
              <FormRadio
                fluid
                label="พหุวิทยาการ"
                value="พหุวิทยาการ"
                checked={formData.nature === 'พหุวิทยาการ'}
                name="nature"
                onChange={handleChange}
              />
              <FormRadio
                fluid
                label="มีจุดเด่นเฉพาะ"
                value="มีจุดเด่นเฉพาะ"
                checked={formData.nature === 'มีจุดเด่นเฉพาะ'}
                name="nature"
                onChange={handleChange}
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
                      onChange={handleChange}
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
              onChange={handleChange}
            />

            <div className="flex justify-end gap-4">
              <FormButton color='grey' type='button' onClick={() => navigate('/homepage_user')}>
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
