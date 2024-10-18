import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';

const State02_Assign_work = ({ isOpen, closeModal, selectedForm, studentData, teacherData, UpdateStatus }) => {

  const [dataUser, setDataUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    axios.get('http://localhost:8080/getinfo_user/all')
      .then(res => {
        // กรองข้อมูลตามเงื่อนไข
        const filteredData = res.data.filter(user =>
          user.position === 'Director' && user.campus !== selectedForm.campus
        );
        setDataUser(filteredData);
      })
      .catch(err => console.error(err));
  }, [selectedForm]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataUser.slice(indexOfFirstItem, indexOfLastItem);


  const totalPages = Math.ceil(dataUser.length / itemsPerPage);

  if (!isOpen || !selectedForm) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-12 pt-6 rounded-lg w-11/12 rounded-full min-h-[650px] max-h-[650px]  mt-16">
        {selectedForm && (
          <div className='text-gray-700 px-12'>

            <div className="grid grid-cols-12 gab-1 items-center mb-3">
              <div className="col-span-12 text-start p-2">
                <h2 className="font-bold m-0 text-blue-900"> การเลือกคณะกรรมการประเมินผล</h2>
              </div>
            </div>

            {/* <hr className='border-gray-300 w-11/12 mx-auto' />\ */}

            <div className='mx-12'>
              <div className="bg-gray-100 p-6 rounded-xl w-full mb-4">
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-2 text-center">
                    <p className="text-gray-700 font-bold m-1">วันที่ยื่นคำขอ</p>
                    <p className="text-gray-700">{selectedForm.sent_time ? new Date(selectedForm.sent_time).toLocaleDateString() : 'ไม่พบข้อมูล'}</p>
                  </div>
                  <div className="col-span-3 text-start">
                    <p className="text-blue-800 font-bold m-0">หลักสูตร{selectedForm.majorthai}</p>
                    <p className='text-gray-500 m-0'>{selectedForm.majoreng}</p>
                  </div>
                  <div className="col-span-3 text-start">
                    <p className="text-gray-700 font-bold m-1">คณะ{selectedForm.faculty}</p>
                    <p className="text-gray-700">วิทยาเขต: {selectedForm.campus}</p>
                  </div>
                  <div className="col-span-4 text-start">
                    <p className="m-1"><strong>ชื่อปริญญา :</strong> {selectedForm.degreename}</p>
                    <p className="m-1"><strong>ปีที่เริ่มดำเนินการสอน :</strong> {selectedForm.yearstarted}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        <div className='mx-12 text-gray-700'>
          <hr className='mt-4 border-gray-300 w-11/12 mx-auto mb-4' />

          <div className="grid grid-cols-12 gab-1 items-center mb-3">
            <div className="col-span-12 text-start ml-12 p-2">
              <p className="font-bold text-xl m-0 mb-2 text-blue-900"> รายชื่อคณะกรรมการ</p>
            </div>
          </div>

          <div style={{ minHeight: '280px' }}>
            {currentItems.map((user, index) => (
              <div key={index} className='mx-12'>
                <div className="bg-gray-100 hover:bg-gray-200 p-3 rounded-xl w-full mb-2">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-3 col-start-1 ml-12 mr-2 text-start">
                      <p className="text-gray-800 font-bold m-0">{indexOfFirstItem + index + 1}. {user.name}&nbsp;{user.lastname}</p>
                    </div>
                    <div className="col-span-2 text-start">
                      <p className="text-gray-500"><strong>วิทยาเขต :</strong> {user.campus}</p>
                    </div>
                    <div className="col-span-3 text-start">
                      <p className="m-1"><strong>โทรศัพท์ :</strong> {user.phone}</p>
                      <p className="m-1"><strong>Email :</strong> {user.email}</p>
                    </div>
                    <div className="col-span-3 text-start">
                      <p className="m-1">หัวหน้ากรรมการ คณะกรรมการ</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          </div>

          {/* Count Page */}
          <div className="flex justify-center mt-4 space-x-2">
            {[...Array(totalPages)].map((_, pageIndex) => (
              <button
                key={pageIndex}
                onClick={() => setCurrentPage(pageIndex + 1)}
                className={`w-10 h-10 rounded-lg ${currentPage === pageIndex + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}
              >
                {pageIndex + 1}
              </button>
            ))}
          </div>


          {/* Button */}
          <div className="gap-4 flex justify-center items-center mt-5">
            <button className="bg-blue-500 hover:bg-blue-700 hover:font-bold text-white px-5 py-3 rounded-lg ml-2" type="submit">
              <div className="flex justify-start items-center">
                ยืนยันการมอบหมายงาน
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
      </div>
    </div>
  );
};

export default State02_Assign_work;
