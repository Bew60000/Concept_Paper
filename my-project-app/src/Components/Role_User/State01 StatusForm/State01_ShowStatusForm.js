import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavbarUserFunctions from '../../Navbar/NavbarUserFunctions';
import ModalDetailForm from './State01_ModalDetailForm';

function State01_ShowStatusForm() {
    const [dataForm, setDataForm] = useState([]);
    const [studentData, setStudentData] = useState([]);
    const [teacherData, setTeacherData] = useState([]);
    const [sentByInfo, setSentByInfo] = useState([]); //สำหรับดึงข้อมูล username จากตาราง user
    const [isModalOpen, setIsModalOpen] = useState(false); // สถานะของ Modal
    const [selectedForm, setSelectedForm] = useState(null); // ข้อมูล Form ที่เลือก
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const navigate = useNavigate();

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    useEffect(() => {
        axios.get('http://localhost:8080/test/get_data_info_analysis_teaching')
            .then(res => {
                console.log("ข้อมูลที่ได้รับจากเซิร์ฟเวอร์: ", res.data);
                setDataForm(res.data);
            })
            .catch(err => console.error(err));

        console.log("loggedInUser: ", loggedInUser);
    }, []);

    const deleteRequest = (info) => {
        axios.delete(`http://localhost:8080/deletebasic_info/${info.curriculum_id}`)
            .then(() => {
                // ลบข้อมูลจาก state หลังจากลบจากฐานข้อมูลเสร็จแล้ว
                setDataForm(prevData => prevData.filter(user => user.curriculum_id !== info.curriculum_id));
            })
            .catch(err => console.error(err));
    };


    useEffect(() => {
        const fetchForms = async () => {
            try {
                // เรียก API เพื่อดึงข้อมูลจาก endpoint ที่คุณระบุ
                const response = await axios.get('http://localhost:8080/test/get_data_info_analysis_teaching');
                // กรองฟอร์มที่มีสถานะไม่เท่ากับ "ยกเลิก", "ปฏิเสธ", และ "เสร็จสิ้น"
                const awaitingForms = response.data.filter(
                    form => form.status !== 'ยกเลิกคำขอ' && form.status !== 'ปฏิเสธการตอบรับ' && form.status !== 'ประเมินผลเสร็จสิ้น'
                );
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
                console.log('Student Data:', studentRes.data);
                setStudentData(studentRes.data);
                setTeacherData(teacherRes.data);
            })
            .catch(err => console.error(err));
    };

    const editRequest = (info, studentData) => {
        fetchAdditionalData(info.curriculum_id); // เรียกข้อมูลก่อน
        navigate('/edit_form', { state: { info, studentData } });
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

    // function find username for sent_by
    const findUserByUsername = (username) => {
        return sentByInfo.find(user => user.username === username);
    };

    const Updatecancel = (curriculum_id) => {
        axios.put(`http://localhost:8080/test/update_date_cancel`, { curriculum_id })
            .then(response => {
                console.log('date updated successfully:', response.data);
            })
            .catch(error => {
                console.error('Error updating status:', error);
            });
    };

    const UpdateStatus = (curriculum_id, newStatus) => {
        axios.put(`http://localhost:8080/update_Status/${curriculum_id}`, { status: newStatus })
            .then(response => {
                console.log('Status updated successfully:', response.data);
                // หลังจากอัปเดตสถานะสำเร็จ ให้เรียกข้อมูลใหม่เพื่ออัปเดต UI
                setDataForm(prevData => prevData.map(info =>
                    info.curriculum_id === curriculum_id ? { ...info, status: newStatus } : info
                ));
                // Updatecancel(curriculum_id)
                window.location.reload();
            })
            .catch(error => {
                console.error('Error updating status:', error);
            });
    };

    const filteredData = dataForm.filter(info => info.sent_by === loggedInUser.username);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="grid grid-cols-12 p-5 pt-0 content-start w-9/10 mx-auto">
            <div className="col-start-2 col-span-8">
                <div className="bg-white border-2 rounded-2xl p-10" style={{ minHeight: '930px' }}>
                    <h2 className='text-start text-gray-700 mb-0'>คำขอที่กำลังดำเนินการ</h2>
                    <p className='text-gray-500 mt-0 font-bold'>(คำขอทั้งหมดที่กำลังรอการดำเนินการ)</p>

                    <hr className='mb-5' />

                    <div className="grid grid-cols-12 gap-4 items-center mb-3 bg-gray-700 rounded-xl text-gray-100 p-6 py-5">
                        <div className="col-span-2 text-center">
                            <p className="text-lg font-bold m-1">วันที่ยื่นคำขอ</p>
                        </div>
                        <div className="col-span-3 text-center">
                            <p className="text-lg font-bold m-1">ผู้รับผิดชอบ</p>
                        </div>
                        <div className="col-span-5 text-center">
                            <p className="text-lg font-bold m-1">หลักสูตร</p>
                        </div>
                        <div className="col-span-2 text-center">
                            <p className="text-lg font-bold m-1">สถานะ</p>
                        </div>
                    </div>

                    {currentData.length === 0 ? (
                        <div className="flex items-center justify-center h-36 bg-gray-200 rounded-xl ">
                            <h4 className="text-gray-700 text-center">ไม่พบข้อมูลคำขอ</h4>
                        </div>
                    ) : (
                        currentData.map((info, index) => (
                            <div key={index} className="bg-gray-200 hover:bg-gray-100 p-6 rounded-xl w-full mb-4">
                                <div className="grid grid-cols-12 gap-4 items-center">

                                    <div className="col-span-2 text-center">
                                        <p className="text-gray-700">
                                            {info.sent_time ? new Date(info.sent_time).toLocaleDateString() : 'ไม่พบข้อมูล'}
                                        </p>
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
                                        <p className="text-blue-600 font-bold">"{info.status}"</p>
                                    </div>

                                </div>

                                <hr className='border-white m-5 mt-4' />

                                <div className="flex justify-end items-center mt-2">
                                    {/* <button className="bg-red-500 hover:bg-red-700 hover:font-bold text-white px-4 py-2 rounded-lg ml-2" onClick={() => deleteRequest(info)}>
                                        <div className="flex justify-start items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-2">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                            ยกเลิกคำขอ
                                        </div>
                                    </button> */}

                                    {info.status === 'รอการตอบรับ' && (
                                        <button onClick={() => UpdateStatus(info.curriculum_id, 'ยกเลิกคำขอ')}
                                            className="bg-red-500 hover:bg-red-700 hover:font-bold text-white px-4 py-2 rounded-lg ml-2">
                                            <div className="flex justify-start items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-2">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>
                                                ยกเลิกคำขอ
                                            </div>
                                        </button>
                                    )}
{/* 
                                    <button className="bg-blue-500 hover:bg-blue-700 hover:font-bold text-white px-4 py-2 rounded-lg ml-2" onClick={() => editRequest(info, studentData)}>
                                        <div className="flex justify-start items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-2">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>
                                            แก้ไขข้อมูล
                                        </div>
                                    </button> */}

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
                        ))
                    )}

                    {/* Pagination with page numbers */}
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

            <NavbarUserFunctions />

            <ModalDetailForm
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

export default State01_ShowStatusForm;
