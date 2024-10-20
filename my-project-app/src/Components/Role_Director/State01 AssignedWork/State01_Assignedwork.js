import React, { useRef, useEffect, useState } from 'react';
import {
  FormTextArea,
  FormRadio,
  FormGroup,
  Form,
} from 'semantic-ui-react';
import axios from 'axios';
import { Tooltip } from 'react-tooltip'; // ใช้ Tooltip จาก react-tooltip
import 'react-tooltip/dist/react-tooltip.css'; // นำเข้าการตั้งค่า CSS ของ Tooltip

const State01_Assignedwork = ({ isOpen, closeModal, selectedForm, studentData, teacherData, UpdateStatus }) => {
  const modalRef = useRef(null);
  const [assignData, setAssignData] = useState({
    aspect_1: '',
    aspect_2: '',
    aspect_3: '',
    aspect_4: '',
    aspect_5: '',
    report01: '',
    report02: '',
    report03: '',
    report04: '',
    report05: '',
  });



  const UpdateEvaluateStatus = (status_evaluate, evaluato_id, curriculum_id) => {
    axios.put('http://localhost:8080/test/update_evaluate_status', { status_evaluate, evaluato_id, curriculum_id })
      .then(response => {
        console.log('Evaluate status updated successfully:', response.data);
      })
      .catch(error => {
        console.error('Error updating evaluate status:', error);
      });
  };

  const [groupedEvaluations, setGroupedEvaluations] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8080/evaluate_data')
      .then(response => {
        const groupedData = response.data.reduce((acc, item) => {
          if (!acc[item.evaluation_aspect]) {
            acc[item.evaluation_aspect] = [];
          }
          acc[item.evaluation_aspect].push(item);
          return acc;
        }, {});
        setGroupedEvaluations(groupedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


  // Check if the user is logged in
  const loggedInUser = localStorage.getItem('loggedInUser');
  let username = ''; // Initial empty username
  if (loggedInUser) {
    const user = JSON.parse(loggedInUser); // Convert JSON string to object
    username = user.username; // Get username from the logged-in user
  }

  console.log('Data submitted successfully:', username);


  const handleChange = (e, { name, value }) => {
    setAssignData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Include curriculum_id from selectedForm in the assignData
    const dataToSubmit = {
      ...assignData,
      curriculum_id: selectedForm.curriculum_id,
      evaluato_id: username // Add curriculum_id to the submitted data
    };

    axios.post('http://localhost:8080/api/evaluation_score', dataToSubmit)
      .then(response => {
        // window.location.reload();
        console.log('Data submitted successfully:', response.data);
        UpdateEvaluateStatus('ประเมินผลเสร็จสิ้น', username, selectedForm.curriculum_id)
        window.location.reload();
      })
      .catch(error => {
        console.error('Error submitting data:', error);
      });
  };

  if (!isOpen || !selectedForm) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-12 rounded-lg w-11/12 rounded-full max-h-[650px] overflow-y-auto mt-16">
        {selectedForm && (
          <div className='text-gray-700 px-12'>

            <div className="grid grid-cols-12 gab-1 items-center ">
              <div className="col-span-12 text-start p-5">
                <h2 className="font-bold m-0"> การประเมินหลักสูตร{selectedForm.majorthai}</h2>
                <p className='text-gray-500 font-bold m-0'>"{selectedForm.majoreng}"</p>
              </div>
            </div>

            <hr className='border-gray-300 w-11/12 mx-auto' />

            <div className="text-start p-5 pt-8 pb-0">
              <p className="text-2xl font-bold text-blue-800">การประเมินด้านที่ 1 : กลุ่มผู้เรียนเป้าหมาย</p>
            </div>
            {/* Form Part I */}
            <div className='mx-8'>
              <div className="text-start p-5 pt-2 pb-1">
                <p className="text-xl font-bold text-gray-800">ข้อมูลเบื้องต้น</p>
              </div>
              <div className="pr-5 pl-5">
                <p className="m-1"><strong>คณะ :</strong> {selectedForm.faculty}</p>
                <p className="m-1"><strong>วิทยาเขต :</strong>{selectedForm.campus}</p>
                <p className="m-1"><strong>สังกัด:</strong>&nbsp;{selectedForm.affiliation}</p>
              </div>
              <div className="mt-8 pr-5 pl-5">
                <p className="m-1"><strong>ชื่อปริญญา :</strong> {selectedForm.degreename}</p>
                <p className="m-1"><strong>ปีที่เริ่มดำเนินการสอน :</strong> {selectedForm.yearstarted}</p>
              </div>
              <div className="mt-8 pr-5 pl-5">
                <p className="m-1"><strong>ลักษณของหลักสูตร:</strong>&nbsp;{selectedForm.nature}</p>
                <p className="m-1"><strong>รายละเอียดลักษณของหลักสูตรเพิ่มเติม:</strong></p>
                <p className="m-1">{selectedForm.additionalinfo}</p>
              </div>
              <div className="mt-8 pr-5 pl-5">
                <p className="m-1"><strong>ผลลัพธ์การเรียนรู้ระดับหลักสูตร :</strong></p>
                <p className="m-1 mt-2">{selectedForm.learningoutcome}</p>
              </div>
            </div>

            <hr className='mt-10 border-gray-300 w-11/12 mx-auto' />

            <div className="text-start p-5 pt-8 mb-5">
              <p className="text-2xl font-bold text-blue-800">เกณฑ์การประเมินด้านที่ 1 : กลุ่มผู้เรียนเป้าหมาย</p>

              {groupedEvaluations['Aspect01']?.map((item, index) => (
                <div key={index} className='bg-gray-100 p-6 rounded-xl w-11/12 mx-auto mb-4'>
                  <div className='grid grid-cols-12 gap-4 items-center'>
                    <div className="col-span-2 text-center">
                      <p className='font-bold'>ระดับการประเมิน {item.evaluation_level} :</p>
                    </div>

                    <div className="col-span-10 text-start">
                      <p >{item.detailed_evaluation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ประเมินด้านที่ 1 */}
            <Form >
              <label className='pl-10 pt-8 text-lg text-gray-700 font-bold'>ระดับคะแนนการประเมิน</label>
              <FormGroup className="flex items-center space-x-3 p-12 pt-3 pb-5">
                <FormRadio
                  fluid
                  label="ระดับการประเมิน 1"
                  value="1"
                  checked={assignData.aspect_1 === '1'}
                  name="aspect_1"
                  onChange={handleChange}
                />
                <FormRadio
                  fluid
                  label="ระดับการประเมิน 2"
                  value="2"
                  checked={assignData.aspect_1 === '2'}
                  name="aspect_1"
                  onChange={handleChange}
                />
                <FormRadio
                  fluid
                  label="ระดับการประเมิน 3"
                  value="3"
                  checked={assignData.aspect_1 === '3'}
                  name="aspect_1"
                  onChange={handleChange}
                />

                <FormRadio
                  fluid
                  label="ระดับการประเมิน 4"
                  value="4"
                  checked={assignData.aspect_1 === '4'}
                  name="aspect_1"
                  onChange={handleChange}
                />
                <FormRadio
                  fluid
                  label="ระดับการประเมิน 5"
                  value="5"
                  checked={assignData.aspect_1 === '5'}
                  name="aspect_1"
                  onChange={handleChange}
                />


              </FormGroup>

              <label className='pl-10 pt-8 text-lg text-gray-700 font-bold'>หลักการพิจารณาด้านเหตุผล</label>
              <FormTextArea className="p-10  pt-2"
                fluid
                placeholder="โปรดอธิบายรายละเอียด"
                name="report01"
                style={{ minHeight: '150px' }}
                value={assignData.report01}
                onChange={handleChange}
              />
            </Form>

            <hr className='border-gray-300 w-11/12 mx-auto' />

            <div className="text-start p-5 pt-8 pb-0">
              <p className="text-2xl font-bold text-blue-800">การประเมินด้านที่ 2 : ความเหมาะสมและความทันสมัยของหลักสูตร</p>
            </div>
            {/* Form Part II */}
            <div className='mx-8'>
              <div className="text-start p-5 pt-2 pb-1">
                <p className="text-xl font-bold text-gray-800">ข้อมูลการวิเคราะห์หลักสูตร</p>
              </div>
              <div className="pr-5 pl-5">
                <p className="m-1"><strong>2.1 หลักการและเหตุผลในการขอเปิดหลักสูตร :</strong></p>
                <p className="m-1 mt-2">{selectedForm.principle_reasons}</p>
              </div>
              <div className="mt-8 pr-5 pl-5">
                <div className='flex'>
                  <p className="m-1"><strong>2.2 กลุ่มเป้าหมายของหลักสูตร หลักสูตรเปิดรับผู้สำเร็จการศึกษาระดับ :</strong></p>
                  <p className='text-blue-700 font-bold'>"{selectedForm.required_eq_id}"</p>
                </div>
                <p className="m-1"><strong>ผลวิเคราะห์ความต้องการของกลุ่มเป้าหมายในการเข้าศึกษาหลักสูตรดังกล่าว และระบุข้อมูลที่ใช้ในการคาดการณ์จำนวนผู้เรียนในอนาคต :</strong></p>
                <p className="m-1 mt-2">{selectedForm.analysis_of_future_target}</p>
              </div>
              <div className="mt-8 pr-5 pl-5">
                <p className="m-1"><strong>2.3 ความร่วมมือกับหน่วยงานจากภาคผู้ใช้บัณฑิต </strong> (ในการออกแบบหลักสูตร แหล่งฝึก ส่งคนมาเรียน รับบัณฑิตเข้าทำงานโดยตรง) : </p>
                <p className="m-1 mt-2">{selectedForm.cooperation}</p>
              </div>
              <div className="mt-8 pr-5 pl-5">
                <p className="m-1"><strong>2.4 หลักสูตรดังกล่าวมีความใกล้เคียงกับหลักสูตรอื่นอย่างไร</strong> กรณีที่มีความคล้ายคลึงกับหลักสูตรอื่น ให้ระบุถึง<strong>"จุดเด่นของหลักสูตร"</strong>และการดำเนินการที่จะ
                  <strong>"เเข่งขัน"</strong>กับหลักสูตรอื่นที่ใกล้เคียง: </p>
                <p className="m-1 mt-2">{selectedForm.high_lights}</p>
              </div>
            </div>

            <hr className='mt-10 border-gray-300 w-11/12 mx-auto' />

            <div className="text-start p-5 pt-8 mb-5">
              <p className="text-2xl font-bold text-blue-800">เกณฑ์การประเมินด้านที่ 2 : ความเหมาะสมและความทันสมัยของหลักสูตร</p>
              {groupedEvaluations['Aspect02']?.map((item, index) => (
                <div key={index} className='bg-gray-100 p-6 rounded-xl w-11/12 mx-auto mb-4'>
                  <div className='grid grid-cols-12 gap-4 items-center'>
                    <div className="col-span-2 text-center">
                      <p className='font-bold'>ระดับการประเมิน {item.evaluation_level} :</p>
                    </div>

                    <div className="col-span-10 text-start">
                      <p >{item.detailed_evaluation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>


            {/* ประเมินด้านที่ 2 */}
            <Form >
              <label className='pl-10 pt-8 text-lg text-gray-700 font-bold'>ระดับคะแนนการประเมิน</label>
              <FormGroup className="flex items-center space-x-3 p-12 pt-3 pb-3">
                <FormRadio
                  fluid
                  label="ระดับการประเมิน 1"
                  value="1"
                  checked={assignData.aspect_2 === '1'}
                  name="aspect_2"
                  onChange={handleChange}
                />
                <FormRadio
                  fluid
                  label="ระดับการประเมิน 2"
                  value="2"
                  checked={assignData.aspect_2 === '2'}
                  name="aspect_2"
                  onChange={handleChange}
                />
                <FormRadio
                  fluid
                  label="ระดับการประเมิน 3"
                  value="3"
                  checked={assignData.aspect_2 === '3'}
                  name="aspect_2"
                  onChange={handleChange}
                />

                <FormRadio
                  fluid
                  label="ระดับการประเมิน 4"
                  value="4"
                  checked={assignData.aspect_2 === '4'}
                  name="aspect_2"
                  onChange={handleChange}
                />
                <FormRadio
                  fluid
                  label="ระดับการประเมิน 5"
                  value="5"
                  checked={assignData.aspect_2 === '5'}
                  name="aspect_2"
                  onChange={handleChange}
                />

              </FormGroup>

              <label className='pl-10 text-lg text-gray-700 font-bold'>หลักการพิจารณาด้านเหตุผล</label>
              <FormTextArea className="p-10  pt-2"
                fluid
                placeholder="โปรดอธิบายรายละเอียด"
                name="report02"
                style={{ minHeight: '200px' }}
                value={assignData.report02}
                onChange={handleChange}
              />
            </Form>

            <hr className='border-gray-300 w-11/12 mx-auto' />

            <div className="text-start p-5 pt-8 pb-0">
              <p className="text-2xl font-bold text-blue-800">การประเมินด้านที่ 3 : ความเชื่อมโยงกับหลักสูตรที่มีอยู่ในมหาวิทยาลัย</p>
            </div>
            {/* Form Part III */}
            <div className='mx-8'>
              <div className="text-start p-5 pt-2 pb-1">
                <p className="text-xl font-bold text-gray-800">แผนการรับนักศึกษา</p>
              </div>
              {studentData.length > 0 && Object.entries(studentData.reduce((groupedData, student) => {
                // จัดกลุ่มตามปีการศึกษา
                if (!groupedData[student.year_opened]) {
                  groupedData[student.year_opened] = [];
                }
                groupedData[student.year_opened].push(student);
                return groupedData;
              }, {})).map(([yearOpened, students], index) => (
                <div key={index} className="mt-5 p-2 mb-5">
                  <p className='font-bold mb-1'>• ปีการศึกษา {yearOpened}</p>
                  {students.map((student, idx) => (
                    <div key={idx}>
                      <p>&nbsp;&nbsp;&nbsp;&nbsp;ชั้นปีที่ {student.year} จำนวนนักศึกษาที่เปิดรับ: {student.count_students}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <hr className='mt-10 border-gray-300 w-11/12 mx-auto' />

            <div className="text-start p-5 pt-8 mb-5">
              <p className="text-2xl font-bold text-blue-800">เกณฑ์การประเมินด้านที่ 3 : ความเชื่อมโยงกับหลักสูตรที่มีอยู่ในมหาวิทยาลัย</p>
              {groupedEvaluations['Aspect03']?.map((item, index) => (
                <div key={index} className='bg-gray-100 p-6 rounded-xl w-11/12 mx-auto mb-4'>
                  <div className='grid grid-cols-12 gap-4 items-center'>
                    <div className="col-span-2 text-center">
                      <p className='font-bold'>ระดับการประเมิน {item.evaluation_level} :</p>
                    </div>

                    <div className="col-span-10 text-start">
                      <p >{item.detailed_evaluation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ประเมินด้านที่ 3 */}
            <Form>
              <label className='pl-10 pt-8 text-lg text-gray-700 font-bold'>ระดับคะแนนการประเมิน</label>
              <FormGroup className="flex items-center space-x-3 p-12 pt-3 pb-3">
                <FormRadio
                  fluid
                  label="ระดับการประเมิน 1"
                  value="1"
                  checked={assignData.aspect_3 === '1'}
                  name="aspect_3"
                  onChange={handleChange}
                />
                <FormRadio
                  fluid
                  label="ระดับการประเมิน 2"
                  value="2"
                  checked={assignData.aspect_3 === '2'}
                  name="aspect_3"
                  onChange={handleChange}
                />
                <FormRadio
                  fluid
                  label="ระดับการประเมิน 3"
                  value="3"
                  checked={assignData.aspect_3 === '3'}
                  name="aspect_3"
                  onChange={handleChange}
                />

                <FormRadio
                  fluid
                  label="ระดับการประเมิน 4"
                  value="4"
                  checked={assignData.aspect_3 === '4'}
                  name="aspect_3"
                  onChange={handleChange}
                />
                <FormRadio
                  fluid
                  label="ระดับการประเมิน 5"
                  value="5"
                  checked={assignData.aspect_3 === '5'}
                  name="aspect_3"
                  onChange={handleChange}
                />

              </FormGroup>

              <label className='pl-10 text-lg text-gray-700 font-bold'>หลักการพิจารณาด้านเหตุผล</label>
              <FormTextArea className="p-10  pt-2"
                fluid
                placeholder="โปรดอธิบายรายละเอียด"
                name="report03"
                style={{ minHeight: '200px' }}
                value={assignData.report03}
                onChange={handleChange}
              />
            </Form>

            <hr className='border-gray-300 w-11/12 mx-auto' />

            <div className="text-start p-5 pt-8 pb-0">
              <p className="text-2xl font-bold text-blue-800">การประเมินด้านที่ 4 : ความร่วมมือกับองค์กรภาครัฐ เอกชน และสถาบันการศึกษาต่างประเทศ</p>
            </div>
            {/* Form Part IV */}
            <div className='mx-8'>
              <div className="text-start p-5 pt-2 pb-1">
                <p className="text-xl font-bold text-gray-800">รูปแบบการจัดการเรียนการสอนและการบริหารจัดการ</p>
              </div>
              <div className="pr-5 pl-5">
                <p className="m-1"><strong>4.1 รูปแบบของการจัดการเรียนการสอนที่มีการเรียนรู้จากประสบการณ์จริง :</strong></p>
                <p className="m-1 mt-2">{selectedForm.teaching}</p>
              </div>

              <div className="mt-8 pr-5 pl-5">
                <p className="m-1"><strong>4.2 หลักสูตรฯ มีการควบคุมต้นทุนของการจัดการเรียนการสอนของการจัดการศึกษาอย่างไรบ้าง :</strong></p>
                <p className="m-1 mt-2">{selectedForm.cost_control}</p>
              </div>

              <div className="mt-8 pr-5 pl-5">
                <p className="m-1"><strong>4.3 ความพร้อมในการจัดการเรียนการสอน</strong> (ทรัพยากรการเรียนรู้ ศักยภาพของบุคลากร คู่ความร่วมมือ งบประมาณสนับสนุนจากภายนอกมหาวิทยาลัย รวมถึงวามเชื่อมโยงกับสิ่งที่คณะมีอยู่) : </p>
                <p className="m-1 mt-2">{selectedForm.readiness}</p>
              </div>
            </div>

            <hr className='mt-10 border-gray-300 w-11/12 mx-auto' />

            <div className="text-start p-5 pt-8 mb-5">
              <p className="text-2xl font-bold text-blue-800">เกณฑ์การประเมินด้านที่ 4 : ความร่วมมือกับองค์กรภาครัฐ เอกชน และสถาบันการศึกษาต่างประเทศ</p>
              {groupedEvaluations['Aspect02']?.map((item, index) => (
                <div key={index} className='bg-gray-100 p-6 rounded-xl w-11/12 mx-auto mb-4'>
                  <div className='grid grid-cols-12 gap-4 items-center'>
                    <div className="col-span-2 text-center">
                      <p className='font-bold'>ระดับการประเมิน {item.evaluation_level} :</p>
                    </div>

                    <div className="col-span-10 text-start">
                      <p >{item.detailed_evaluation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ประเมินด้านที่ 4 */}
            <Form >
              <label className='pl-10 pt-8 text-lg text-gray-700 font-bold'>ระดับคะแนนการประเมิน</label>
              <FormGroup className="flex items-center space-x-3 p-12 pt-3 pb-3">
                <FormRadio
                  fluid
                  label="ระดับการประเมิน 1"
                  value="1"
                  checked={assignData.aspect_4 === '1'}
                  name="aspect_4"
                  onChange={handleChange}
                />
                <FormRadio
                  fluid
                  label="ระดับการประเมิน 2"
                  value="2"
                  checked={assignData.aspect_4 === '2'}
                  name="aspect_4"
                  onChange={handleChange}
                />
                <FormRadio
                  fluid
                  label="ระดับการประเมิน 3"
                  value="3"
                  checked={assignData.aspect_4 === '3'}
                  name="aspect_4"
                  onChange={handleChange}
                />

                <FormRadio
                  fluid
                  label="ระดับการประเมิน 4"
                  value="4"
                  checked={assignData.aspect_4 === '4'}
                  name="aspect_4"
                  onChange={handleChange}
                />
                <FormRadio
                  fluid
                  label="ระดับการประเมิน 5"
                  value="5"
                  checked={assignData.aspect_4 === '5'}
                  name="aspect_4"
                  onChange={handleChange}
                />

              </FormGroup>

              <label className='pl-10 text-lg text-gray-700 font-bold'>หลักการพิจารณาด้านเหตุผล</label>
              <FormTextArea className="p-10  pt-2"
                fluid
                placeholder="โปรดอธิบายรายละเอียด"
                name="report04"
                style={{ minHeight: '200px' }}
                value={assignData.report04}
                onChange={handleChange}
              />
            </Form>

            <hr className='border-gray-300 w-11/12 mx-auto' />

            <div className="text-start p-5 pt-8 pb-0">
              <p className="text-2xl font-bold text-blue-800">การประเมินด้านที่ 5 : ประโยชน์ต่อสังคมและประเทศ
              </p>
            </div>
            {/* Form Part V VI */}
            <div className='mx-8'>
              <div className="text-start p-5 pt-2 pb-1">
                <p className="text-xl font-bold text-gray-800">อาจารย์ผู้รับผิดชอบหลักสูตร</p>
              </div>
              <div className="pr-5 pl-5">
                {teacherData.length > 0 && (
                  <div className="mt-3">
                    <p className="m-1 mb-5"><strong>5.1 อาจารย์ผู้รับผิดชอบหลักสูตร</strong></p>
                    <div className='pl-5'>
                      {teacherData
                        .filter(teacher => teacher.teacher_role === 'อาจารย์ผู้รับผิดชอบหลักสูตร')
                        .map((teacher, index) => (
                          <div key={index}>
                            <p className="m-1 mt-5 text-lg font-bold text-blue-700">
                              {`${index + 1}. ${teacher.teacher_perfix} ${teacher.teacher_fname} ${teacher.teacher_lname}`}
                            </p>
                            <p className="m-1 mt-2"><strong>ตำแหน่งทางวิชาการ :</strong> {teacher.academic_ranks}</p>
                            <p className="m-1 mt-2"><strong>คุณวุฒิ :</strong></p>
                            <p className="m-1 mt-2">{teacher.educational_qualifications}</p>
                            <p className="m-1 mt-2"><strong>ผลงานทางด้านวิชาการย้อนหลัง 3 ปี :</strong></p>
                            <p className="m-1 mt-2 pb-8">{teacher.performance}</p>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                )}
              </div>

              <div className="text-start p-5 pt-2 pb-1">
                <p className="text-xl font-bold text-gray-800">อาจารย์ประจำหลักสูตร</p>
              </div>
              <div className="pr-5 pl-5">
                {teacherData.length > 0 && (
                  <div className="mt-3">
                    <p className="m-1 mb-5"><strong>5.2 อาจารย์ประจำหลักสูตร</strong></p>
                    <div className='pl-5'>
                      {teacherData
                        .filter(teacher => teacher.teacher_role === 'อาจารย์ประจำหลักสูตร')
                        .map((teacher, index) => (
                          <div key={index}>
                            <p className="text-lg font-bold text-blue-700">
                              {`${index + 1}. ${teacher.teacher_perfix} ${teacher.teacher_fname} ${teacher.teacher_lname}`}
                            </p>
                            <p className="m-1"><strong>ตำแหน่งทางวิชาการ :</strong> {teacher.academic_ranks}</p>
                            <p className="m-1 mt-2"><strong>คุณวุฒิ :</strong></p>
                            <p className="m-1 mt-2">{teacher.educational_qualifications}</p>
                            <p className="m-1 mt-2"><strong>ผลงานทางด้านวิชาการย้อนหลัง 3 ปี :</strong></p>
                            <p className="m-1 mt-2 pb-8">{teacher.performance}</p>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                )}
              </div>
            </div>

            <hr className='mt-10 border-gray-300 w-11/12 mx-auto' />

            <div className="text-start p-5 pt-8 mb-5">
              <p className="text-2xl font-bold text-blue-800">เกณฑ์การประเมินด้านที่ 5 : ประโยชน์ต่อสังคมและประเทศ
              </p>
              {groupedEvaluations['Aspect02']?.map((item, index) => (
                <div key={index} className='bg-gray-100 p-6 rounded-xl w-11/12 mx-auto mb-4'>
                  <div className='grid grid-cols-12 gap-4 items-center'>
                    <div className="col-span-2 text-center">
                      <p className='font-bold'>ระดับการประเมิน {item.evaluation_level} :</p>
                    </div>

                    <div className="col-span-10 text-start">
                      <p >{item.detailed_evaluation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ประเมินด้านที่ 5 */}
            <Form >
              <label className='pl-10 pt-8 text-lg text-gray-700 font-bold'>ระดับคะแนนการประเมิน</label>
              <FormGroup className="flex items-center space-x-3 p-12 pt-3 pb-3">
                <FormRadio
                  fluid
                  label="ระดับการประเมิน 1"
                  value="1"
                  checked={assignData.aspect_5 === '1'}
                  name="aspect_5"
                  onChange={handleChange}
                />
                <FormRadio
                  fluid
                  label="ระดับการประเมิน 2"
                  value="2"
                  checked={assignData.aspect_5 === '2'}
                  name="aspect_5"
                  onChange={handleChange}
                />
                <FormRadio
                  fluid
                  label="ระดับการประเมิน 3"
                  value="3"
                  checked={assignData.aspect_5 === '3'}
                  name="aspect_5"
                  onChange={handleChange}
                />

                <FormRadio
                  fluid
                  label="ระดับการประเมิน 4"
                  value="4"
                  checked={assignData.aspect_5 === '4'}
                  name="aspect_5"
                  onChange={handleChange}
                />
                <FormRadio
                  fluid
                  label="ระดับการประเมิน 5"
                  value="5"
                  checked={assignData.aspect_5 === '5'}
                  name="aspect_5"
                  onChange={handleChange}
                />

              </FormGroup>

              <label className='pl-10 text-lg text-gray-700 font-bold'>หลักการพิจารณาด้านเหตุผล</label>
              <FormTextArea className="p-10  pt-2"
                fluid
                placeholder="โปรดอธิบายรายละเอียด"
                name="report05"
                style={{ minHeight: '200px' }}
                value={assignData.report05}
                onChange={handleChange}
              />
            </Form>

            {/* Button */}
            <div className="gap-4 flex justify-center items-center mt-5">
              <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 hover:font-bold text-white px-5 py-3 rounded-lg ml-2" type="submit">
                <div className="flex justify-start items-center">
                  ส่งผลการประเมิน
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 ml-2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </button>

              <button onClick={closeModal} className="bg-red-500 hover:bg-red-700 hover:font-bold text-white px-5 py-3 rounded-lg ml-2">
                <div className="flex justify-start items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  ปิด
                </div>
              </button>
            </div>


          </div>


        )}
      </div>
    </div>
  );
};

export default State01_Assignedwork;
