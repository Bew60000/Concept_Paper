import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ModalDetailState01 from './State01_ModalDetailForm';
import NavbarAdminFunctions from '../../../Navbar/NavbarAdminFunctions';

function State01_ShowFormRequestForm() {
    const [dataForm, setDataForm] = useState([]);
    const [studentData, setStudentData] = useState([]);
    const [teacherData, setTeacherData] = useState([]);
    const [sentByInfo, setSentByInfo] = useState([]); //สำหรับดึงข้อมูล username จากตาราง user
    const [isModalOpen, setIsModalOpen] = useState(false); // สถานะของ Modal
    const [selectedForm, setSelectedForm] = useState(null); // ข้อมูล Form ที่เลือก
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const navigate = useNavigate();   

    useEffect(() => {
        const fetchForms = async () => {
            try {
                // เรียก API เพื่อดึงข้อมูลจาก endpoint ที่คุณระบุ
                const response = await axios.get('http://localhost:8080/test/get_data_info_analysis_teaching');
                // กรองเฉพาะฟอร์มที่มีสถานะ "ปฏิเสธการตอบรับ"                
                const awaitingForms = response.data.filter(form => form.status === 'รอการตอบรับ');
                setDataForm(awaitingForms); // เก็บข้อมูลที่กรองแล้วลงใน state
            } catch (error) {
                console.error('Error fetching forms:', error);
            }
        };
        fetchForms();

        // Table users all
        axios.get('http://localhost:8080/getinfo_user/all')
            .then(res => setSentByInfo(res.data))
            .catch(err => console.error(err));
    }, []);

    const fetchAdditionalData = (curriculumId) => {
        // ดึงข้อมูลจากตาราง student_admissions, teacher, และ teaching_and_administration โดยใช้ curriculum_id
        Promise.all([
            axios.get(`http://localhost:8080/test/student_admissions/${curriculumId}`),
            axios.get(`http://localhost:8080/test/teacher/${curriculumId}`),
            axios.get(`http://localhost:8080/test/teaching_and_administration/${curriculumId}`)
        ])
            .then(([studentRes, teacherRes, adminRes]) => {
                setStudentData(studentRes.data);
                setTeacherData(teacherRes.data);
            })
            .catch(err => console.error(err));
    };

    const openModal = (form) => {
        setSelectedForm(form);
        setIsModalOpen(true);
        fetchAdditionalData(form.curriculum_id);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedForm(null);
    };

    const totalPages = Math.ceil(dataForm.length / itemsPerPage);
    const currentData = dataForm.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // function find username for sent_by
    const findUserByUsername = (username) => {
        return sentByInfo.find(user => user.username === username);
    };

    const UpdateStatus = (curriculum_id, newStatus) => {
        axios.put(`http://localhost:8080/update_Status/${curriculum_id}`, { status: newStatus })
            .then(response => {
                console.log('Status updated successfully:', response.data);
                // หลังจากอัปเดตสถานะสำเร็จ ให้เรียกข้อมูลใหม่เพื่ออัปเดต UI
                setDataForm(prevData => prevData.map(info =>
                    info.curriculum_id === curriculum_id ? { ...info, status: newStatus } : info
                ));
                window.location.reload();
            })
            .catch(error => {
                console.error('Error updating status:', error);
            });
    };

    return (
        <div className="grid grid-cols-12 p-5 pt-0 content-start">
            <div className='col-start-2 col-span-8'>
                <div className="bg-white border-2 rounded-2xl p-10" style={{ minHeight: '930px' }}>

                    <h2 className='text-start text-gray-700 mb-0'>คำขอเปิดหลักสูตร</h2>
                    <p className='text-gray-500 mt-0 font-bold'>(รอการตอบรับ)</p>

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
                                            <p className="text-blue-600 font-bold">"{info.status}"</p>
                                        </div>
                                    </div>

                                    <hr className='border-white m-5 mt-4' />

                                    <div className="flex justify-end items-center mt-2">

                                        <button onClick={() => UpdateStatus(info.curriculum_id, 'ปฏิเสธการตอบรับ')}
                                            className="bg-red-500 hover:bg-red-700 hover:font-bold text-white px-4 py-2 rounded-lg ml-2">
                                            <div className="flex justify-start items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-2">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>
                                                ปฏิเสธการตอบรับ
                                            </div>
                                        </button>

                                        <button onClick={() => UpdateStatus(info.curriculum_id, 'กำลังดำเนินการประเมิน')}
                                            className="bg-blue-500 hover:bg-blue-700 hover:font-bold text-white px-4 py-2 rounded-lg ml-2">
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

            <ModalDetailState01
                isOpen={isModalOpen}
                closeModal={closeModal}
                selectedForm={selectedForm}
                studentData={studentData}
                teacherData={teacherData}
                findUserByUsername={findUserByUsername}
                UpdateStatus={UpdateStatus}
            />

        </div>
    );
}

export default State01_ShowFormRequestForm;
