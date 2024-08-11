import React, { useState, useEffect } from 'react';
import {
  FormTextArea,
  FormRadio,
  FormInput,
  FormGroup,
  FormButton,
  Form,
} from 'semantic-ui-react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import Background from '../../img/Background.svg';
import Navbar from '../Navbar/Navbar';

const BasicInformation = () => {
  const BackgroundImage = {
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
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

  const navigate = useNavigate();
  // const location = useLocation();

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
      // const response = await axios.post('https://sheet.best/api/sheets/12a6d6e6-5b9b-4502-bcc2-ec1aba194585', formData);
      const response = await axios.post('http://localhost:8080/add_basic_info', formData);
      console.log('Data successfully saved:', response.data);
    } catch (error) {
      console.error('Error saving data:', error);
      const isFormComplete = Object.values(formData).every(
        (field) => field !== ''
      );

      if (isFormComplete) {
        try {
          const response = await axios.post(
            'https://sheet.best/api/sheets/12a6d6e6-5b9b-4502-bcc2-ec1aba194585',
            formData
          );
          console.log('Data successfully saved:', response.data);

          navigate('/course_analysis_information', { replace: true });
        } catch (error) {
          console.error('Error saving data:', error);
        }
      } else {
        alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      }
    };

    // useEffect(() => {
    //   window.history.pushState(null, null, location.href);
    //   window.onpopstate = () => {
    //     window.history.pushState(null, null, location.href);
    //   };
    // }, [location]);

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
                  name="Faculty"
                  value={formData.Faculty}
                  onChange={HandleChange}
                />
                <FormInput
                  fluid
                  label="วิทยาเขต"
                  placeholder="โปรดระบุวิทยาเขต"
                  name="Campus"
                  value={formData.Campus}
                  onChange={HandleChange}
                />
              </FormGroup>

              <FormGroup widths="equal">
                <FormTextArea
                  fluid
                  label="ชื่อสาขาวิชา (ภาษาไทย)"
                  placeholder="โปรดระบุชื่อสาขาวิชา *ภาษาไทย"
                  name="MajorThai"
                  value={formData.MajorThai}
                  onChange={HandleChange}
                />
                <FormTextArea
                  fluid
                  label="ชื่อสาขาวิชา (ภาษาอังกฤษ)"
                  placeholder="โปรดระบุชื่อสาขาวิชา *ภาษาอังกฤษ"
                  name="MajorEng"
                  value={formData.MajorEng}
                  onChange={HandleChange}
                />
              </FormGroup>

              <FormGroup widths="equal">
                <FormInput
                  fluid
                  label="ชื่อปริญญา"
                  placeholder="โปรดระบุชื่อปริญญา"
                  name="DegreeName"
                  value={formData.DegreeName}
                  onChange={HandleChange}
                />
                <FormInput
                  fluid
                  label="สังกัด"
                  placeholder="โปรดระบุสังกัด"
                  name="Affiliation"
                  value={formData.Affiliation}
                  onChange={HandleChange}
                />
                <FormInput
                  fluid
                  label="ปีที่เริ่มดำเนินการเปิดสอน"
                  placeholder="โปรดระบุปีที่เริ่มดำเนินการเปิดสอน"
                  name="YearStarted"
                  value={formData.YearStarted}
                  onChange={HandleChange}
                />
              </FormGroup>

              <FormGroup grouped inline>
                <label>ลักษณะของหลักสูตร</label>
                <FormRadio
                  fluid
                  label="เฉพาะสาขาเดียว"
                  value="เฉพาะสาขาเดียว"
                  checked={formData.Nature === 'เฉพาะสาขาเดียว'}
                  name="Nature"
                  onChange={HandleChange}
                />
                <FormRadio
                  fluid
                  label="พหุวิทยาการ"
                  value="พหุวิทยาการ"
                  checked={formData.Nature === 'พหุวิทยาการ'}
                  name="Nature"
                  onChange={HandleChange}
                />
                <FormRadio
                  fluid
                  label="มีจุดเด่นเฉพาะ"
                  value="มีจุดเด่นเฉพาะ"
                  checked={formData.Nature === 'มีจุดเด่นเฉพาะ'}
                  name="Nature"
                  onChange={HandleChange}
                />

                {(formData.Nature === 'พหุวิทยาการ' ||
                  formData.Nature === 'มีจุดเด่นเฉพาะ') && (
                    <FormGroup widths="equal">
                      <FormTextArea
                        fluid
                        label="รายละเอียดเพิ่มเติม (*ลักษณะของหลักสูตร)"
                        placeholder="โปรดกรอกรายละเอียดเพิ่มเติม"
                        name="AdditionalInfo"
                        value={formData.AdditionalInfo}
                        onChange={HandleChange}
                      />
                    </FormGroup>
                  )}
              </FormGroup>

              <FormTextArea
                fluid
                label="ผลลัพธ์การเรียนรู้ระดับหลักสูตร"
                placeholder="โปรดอธิบายรายละเอียด"
                name="LearningOutcome"
                value={formData.LearningOutcome}
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
};
export default BasicInformation;
