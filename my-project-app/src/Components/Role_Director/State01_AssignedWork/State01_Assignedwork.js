import React, { useRef, useEffect, useState } from 'react';
import {
  FormTextArea,
  FormRadio,
  FormGroup,
  Form,
} from 'semantic-ui-react';
import axios from 'axios';

const State01_Assignedwork = ({ isOpen, closeModal, selectedForm, studentData, teacherData, UpdateStatus }) => {
  const modalRef = useRef(null);
  const [assignData, setAssignData] = useState({
    num: '', //ตัวแปร 1
    report: [],    // ตัวแปร 2
  });

  const handleChange = (e, { name, value }) => {
    setAssignData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/add_basic_info', assignData)
      .then(response => {
        console.log('Data submitted successfully:', response.data);
        window.location.reload();
      })
      .catch(error => {
        console.error('Error submitting data:', error);
      });
  };

  // // เพิ่มการปิด modal เมื่อคลิกนอก modal
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (modalRef.current && !modalRef.current.contains(event.target)) {
  //       closeModal();
  //     }
  //   };
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [closeModal]);

  if (!isOpen || !selectedForm) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg min-w-3/4 rounded-full max-h-[650px] overflow-y-auto mt-16">
        {selectedForm && (
          <div className='text-gray-700'>
            {/* onSubmit={handleSubmit} */}
            <Form onSubmit={handleSubmit}>



              <FormGroup className="flex items-center space-x-3 p-12 pb-0">
                <label>ลักษณะของหลักสูตร</label>
                <FormRadio 
                  fluid
                  label="ระดับการประเมิน 1"
                  value="1"
                  checked={assignData.num === '1'}
                  name="num"
                  onChange={handleChange}
                />
                <FormRadio
                  fluid
                  label="ระดับการประเมิน 2"
                  value="2"
                  checked={assignData.num === '2'}
                  name="num"
                  onChange={handleChange}
                />
                <FormRadio
                  fluid
                  label="ระดับการประเมิน 3"
                  value="3"
                  checked={assignData.num === '3'}
                  name="num"
                  onChange={handleChange}
                />

                <FormRadio
                  fluid
                  label="ระดับการประเมิน 4"
                  value="4"
                  checked={assignData.num === '4'}
                  name="num"
                  onChange={handleChange}
                />
                <FormRadio
                  fluid
                  label="ระดับการประเมิน 5"
                  value="5"
                  checked={assignData.num === '5'}
                  name="num"
                  onChange={handleChange}
                />

              </FormGroup>

              <FormTextArea className="p-10  pt-0"
                fluid
                label="ผลลัพธ์การเรียนรู้ระดับหลักสูตร"
                placeholder="โปรดอธิบายรายละเอียด"
                name="learningoutcome"
                style={{ minHeight: '200px' }}
              />

              {/* <div className="flex justify-end gap-4">
                <button className="bg-gray-500 hover:bg-gray-700 hover:font-bold text-white px-5 py-3 rounded-lg ml-2" onClick={() => navigate('/homepage_user')}>
                  <div className="flex justify-start items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                    </svg>
                    ยกเลิก
                  </div>
                </button>

                <button className="bg-blue-500 hover:bg-blue-700 hover:font-bold text-white px-5 py-3 rounded-lg ml-2" type="submit">
                  <div className="flex justify-start items-center">
                    ต่อไป
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 ml-2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </button>

              </div> */}

              {/* Button */}
              <div className="gap-4 flex justify-center items-center mt-5">
                <button className="bg-blue-500 hover:bg-blue-700 hover:font-bold text-white px-5 py-3 rounded-lg ml-2" type="submit">
                  <div className="flex justify-start items-center">
                    ต่อไป
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

            </Form>


          </div>


        )}
      </div>
    </div>
  );
};

export default State01_Assignedwork;
