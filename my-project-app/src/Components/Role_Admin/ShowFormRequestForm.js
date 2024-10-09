import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import NavbarAdminFunctions from '../Navbar/NavbarAdminFunctions';

function ShowFormRequestForm() {
    const [dataUser, setDataUser] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [sentByInfo, setSentByInfo] = useState([]); //สำหรับดึงข้อมูล username จากตาราง user
    const [isModalOpen, setIsModalOpen] = useState(false); // สถานะของ Modal
    const [selectedForm, setSelectedForm] = useState(null); // ข้อมูล Form ที่เลือก
    const itemsPerPage = 4;
    const navigate = useNavigate();
    const modalRef = useRef(null); // ใช้เก็บ reference ของ Modal


    useEffect(() => {
        // Table form
        axios.get('http://localhost:8080/test/get_info')
            .then(res => setDataUser(res.data))
            .catch(err => console.error(err));

        // Table users all
        axios.get('http://localhost:8080/getinfo_user/all')
            .then(res => setSentByInfo(res.data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            setUserInfo(JSON.parse(loggedInUser));
        }
    }, []);

    const openModal = (form) => {
        setSelectedForm(form); // เก็บข้อมูลผู้ใช้ที่ถูกเลือก
        setIsModalOpen(true); // เปิด Modal
    };

    // ฟังก์ชันปิด Modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedForm(null);
    };

    // เพิ่มการตรวจจับการคลิกภายนอก Modal
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                closeModal();
            }
        };

        if (isModalOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isModalOpen]);

    const totalPages = Math.ceil(dataUser.length / itemsPerPage);
    const currentData = dataUser.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // function find username for sent_by
    const findUserByUsername = (username) => {
        return sentByInfo.find(user => user.username === username);
    };

    return (
        <div className="grid grid-cols-12 p-5 pt-0 content-start">
            <div className='col-start-2 col-span-8'>
                <div className="bg-white border-2 rounded-2xl p-10" style={{ minHeight: '930px' }}>
                    <h2 className='text-start text-gray-700'>คำขอเปิดหลักสูตร</h2>
                    <hr className='mb-5' />

                    <div className="grid grid-cols-12 gap-4 items-center mb-3 bg-gray-700 rounded-xl text-gray-100">
                        <div className="col-span-2 text-center p-5">
                            <p className="text-lg font-bold m-1">วันที่ยื่น</p>
                        </div>
                        <div className="col-span-3 text-center p-5">
                            <p className="text-lg font-bold m-1">คณะที่ยื่น</p>
                        </div>
                        <div className="col-span-5 text-center p-5">
                            <p className="text-lg font-bold m-1">หลักสูตร</p>
                        </div>
                        <div className="col-span-2 gap-2 flex justify-center items-center">
                            <p className="text-lg font-bold m-1">สถานะ</p>
                        </div>
                    </div>

                    {/* แสดงข้อมูลตามหน้าปัจจุบัน */}
                    {currentData.length === 0 ? (
                        <div className="flex items-center justify-center h-36 bg-gray-200 rounded-xl ">
                            <h4 className="text-gray-700 text-center">ไม่พบข้อมูลคำขอ</h4>
                        </div>
                    ) : (
                        currentData.map((info, index) => {
                            const user = findUserByUsername(info.sent_by);
                            return (
                                <div key={index} className="bg-gray-200 hover:bg-gray-100 p-6 rounded-xl w-full mb-4">
                                    <div className="grid grid-cols-12 gap-4 items-center">
                                        <div className="col-span-2 text-center">
                                            {/* {user ? (
                                            <p className="text-gray-700 font-bold m-1">{user.name}</p>
                                        ) : (
                                            <p className="text-gray-700 font-bold m-1">ไม่พบข้อมูล</p>
                                        )} */}
                                            <p className="text-gray-700">{info.sent_time ? new Date(info.sent_time).toLocaleDateString() : 'ไม่พบข้อมูล'}</p>
                                        </div>
                                        <div className="col-span-3 text-center">
                                            <p className="text-gray-700 font-bold m-1">คณะ{info.faculty}</p>
                                            <p className="text-gray-700">วิทยาเขต: {info.campus}</p>
                                        </div>
                                        <div className="col-span-5 text-center">
                                            <p className="text-gray-700 font-bold m-1">หลักสูตร{info.majorthai}</p>
                                            <p className="text-gray-700">({info.majoreng})</p>
                                        </div>
                                        <div className="col-span-2 text-center">
                                            <p className="text-gray-700 m-1">สถานะ</p>
                                            <p className="text-blue-600 font-bold">"รอการตอบรับ"</p>
                                        </div>
                                    </div>

                                    <hr className='border-white m-5 mt-4' />

                                    <div className="flex justify-end items-center mt-2">

                                        <button className="bg-red-500 hover:bg-red-700 hover:font-bold text-white px-4 py-2 rounded-lg ml-2">
                                            <div className="flex justify-start items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-2">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>
                                                ปฏิเสธการตอบรับ
                                            </div>
                                        </button>

                                        <button className="bg-blue-500 hover:bg-blue-700 hover:font-bold text-white px-4 py-2 rounded-lg ml-2">
                                            <div className="flex justify-start items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-2">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>
                                                ตอบรับคำขอ
                                            </div>
                                        </button>

                                        <button onClick={() => openModal(info)} className="bg-gray-500 hover:bg-gray-700 hover:font-bold text-white px-4 py-2 rounded-lg ml-2">
                                            <div className="flex justify-start items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-2">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                </svg>
                                                รายละเอียด
                                            </div>
                                        </button>
                                    </div>

                                </div>
                            );
                        })
                    )}


                    {/* แสดงเลขหน้าสำหรับการ pagination */}
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
                </div>
            </div>
            <NavbarAdminFunctions />


            {/* Modal for Imformation User */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div ref={modalRef} className="bg-white p-6 rounded-lg w-7/12 rounded-full max-h-[650px] overflow-y-auto mt-16">
                        {selectedForm && (
                            <div className='text-gray-700'>

                                <div className="grid grid-cols-12 gab-1 items-center">
                                    <div className="col-span-12 text-start p-5">
                                        <h2 className="font-bold m-0"> หลักสูตร{selectedForm.majorthai}</h2>
                                        <p className='text-gray-500 font-bold m-0'>"{selectedForm.majoreng}"</p>
                                    </div>
                                </div>

                                <hr className='border-gray-300 w-11/12 mx-auto' />
                                {/* Sent by */}
                                <p className=" text-start p-5 pb-0">
                                    <strong>ผู้ยื่นคำขอ:</strong>&nbsp;
                                    {findUserByUsername(selectedForm.sent_by)?.name || 'ไม่พบข้อมูลผู้ยื่น'}&nbsp;
                                    {findUserByUsername(selectedForm.sent_by)?.lastname || 'ไม่พบข้อมูลผู้ยื่น'}
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </p>
                                {/* Form Part I */}
                                <div className="text-start p-5 pt-2">
                                    <p className="text-xl font-bold text-gray-500">1.ข้อมูลเบื้องต้น</p>
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

                                <hr className='mt-10 border-gray-300 w-11/12 mx-auto' />
                                {/* Form Part II */}
                                <div className="text-start p-5 mt-8">
                                    <p className="text-xl font-bold text-gray-500">2.ข้อมูลการวิเคราะห์หลักสูตร</p>
                                </div>

                                <div className="pr-5 pl-5">
                                    <p className="m-1"><strong>2.1 หลักการและเหตุผลในการขอเปิดหลักสูตร :</strong></p>
                                    <p className="m-1 mt-2">{selectedForm.principle_reasons}</p>
                                </div>

                                <div className="mt-8 pr-5 pl-5">
                                    <p className="m-1"><strong>2.2 กลุ่มเป้าหมายของหลักสูตร :</strong> "{selectedForm.required_eq_id}"</p>
                                    <p className="m-1"><strong>ผลวิเคราะห์ความต้องการของกลุ่มเป้าหมายในการเข้าศึกษาหลักสูตรดังกล่าว <br />และระบุข้อมูลที่ใช้ในการคาดการณ์จำนวนผู้เรียนในอนาคต :</strong></p>
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

                                {/* Button */}
                                <div className="gap-4 flex justify-center items-center mt-5">
                                    <button className="bg-blue-500 hover:bg-blue-700 hover:font-bold text-white px-4 py-2 rounded-lg ml-2">
                                        <div className="flex justify-start items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-2">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                            ตอบรับคำขอ
                                        </div>
                                    </button>

                                    <button onClick={closeModal} className="bg-red-500 hover:bg-red-700 hover:font-bold text-white px-4 py-2 rounded-lg ml-2">
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
            )
            }
        </div>
    );
}

export default ShowFormRequestForm;
