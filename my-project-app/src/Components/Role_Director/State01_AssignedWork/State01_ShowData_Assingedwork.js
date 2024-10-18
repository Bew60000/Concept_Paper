import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Step01_ModalDetailForm from './State01_ModalDetailForm';
import State01_Assignedwork from './State01_Assignedwork';
import NavbarDirectorFunctions from '../../Navbar/NavbarDirectorFunctions';

const State01_ShowData_Assingedwork = () => {
    const [dataForm, setDataForm] = useState([]);
    const [studentData, setStudentData] = useState([]);
    const [teacherData, setTeacherData] = useState([]);
    const [selectedForm, setSelectedForm] = useState(null); // ข้อมูล Form ที่เลือก
    const [selectedFormAssigned, setSelectedFormAssigned] = useState({}); // ข้อมูล Form ที่เลือก
    const [userInfo, setUserInfo] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setisModalOpen] = useState(false);
    const [isAssignedWork, setisAssignedWork] = useState(false);
    const itemsPerPage = 4;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchForms = async () => {
            try {
                // เรียก API เพื่อดึงข้อมูลจาก endpoint ที่คุณระบุ
                const response = await axios.get('http://localhost:8080/test/get_data_info_analysis_teaching');

                // กรองเฉพาะฟอร์มที่มีสถานะ "ปฏิเสธการตอบรับ"
                const awaitingForms = response.data.filter(form => form.status === 'อยู่ระหว่างการประเมินผล');
                setDataForm(awaitingForms); // เก็บข้อมูลที่กรองแล้วลงใน state
            } catch (error) {
                console.error('Error fetching forms:', error);
            }
        };

        fetchForms();
    }, []);

    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            setUserInfo(JSON.parse(loggedInUser));
        }
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

    const openAssignedword = (form) => {
        setSelectedFormAssigned(form);
        setisAssignedWork(true);
        fetchAdditionalData(form.curriculum_id);

        // console.log('Data saved with curriculum_id:', form.curriculum_id);

    };

    const closeAssignedword = () => {
        setisAssignedWork(false);
        setSelectedFormAssigned(null);
    };

    const openModal = (form) => {
        setSelectedForm(form);
        setisModalOpen(true);
        fetchAdditionalData(form.curriculum_id);
    };

    const closeModal = () => {
        setisModalOpen(false);
        setSelectedForm(null);
    };

    const totalPages = Math.ceil(dataForm.length / itemsPerPage);
    const currentData = dataForm.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="grid grid-cols-12 p-5 pt-0 content-start">

            <div className='col-start-2 col-span-8'>
                <div className="bg-white border-2 rounded-2xl p-10" style={{ minHeight: '930px' }}>
                    <h2 className='text-start text-gray-700'>งานที่ได้รับมอบหมาย</h2>
                    <hr className='mb-5' />

                    <div className="grid grid-cols-12 gap-4 items-center mb-3 bg-gray-700 rounded-xl text-gray-100">
                        <div className="col-span-3 text-center p-5">
                            <p className="text-lg font-bold m-1">คณะที่ยื่น</p>

                        </div>

                        <div className="col-span-6 text-center p-5">
                            <p className="text-lg font-bold m-1">หลักสูตร</p>

                        </div>

                        <div className="col-span-3 gap-2 flex justify-center items-center">
                            <p className="text-lg font-bold m-1">สถานะ</p>
                        </div>

                    </div>

                    {/* แสดง Card เฉพาะในหน้าปัจจุบัน */}
                    {currentData.map((info, index) => (
                        <div key={index} className="bg-gray-200 hover:bg-gray-100 p-6 rounded-xl w-full mb-4">
                            <div className="grid grid-cols-12 gap-4 items-center">

                                <div className="col-span-3 text-center">
                                    <p className="text-gray-700 font-bold m-1">คณะ{info.faculty}</p>
                                    <p className="text-gray-700">วิทยาเขต: {info.campus}</p>
                                </div>
                                <div className="col-span-6 text-center">
                                    <p className="text-gray-700 font-bold m-1">หลักสูตร{info.majorthai}</p>
                                    <p className="text-gray-700">({info.majoreng})</p>
                                </div>
                                <div className="col-span-3 text-center">
                                    <p className="text-gray-700 m-1">สถานะ</p>
                                    <p className="text-blue-600 font-bold">"{info.status}"</p>
                                </div>
                            </div>

                            <hr className='border-white m-5 mt-4' />

                            <div className="flex justify-end items-center mt-2">
                                <button onClick={() => openModal(info)} className="bg-gray-500 hover:bg-gray-700 hover:font-bold text-white px-4 py-2 rounded-lg ml-2">
                                    <div className="flex justify-start items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                        รายละเอียด
                                    </div>
                                </button>

                                <button onClick={() => openAssignedword(info)} className="bg-blue-500 hover:bg-blue-700 hover:font-bold text-white px-4 py-2 rounded-lg ml-2">
                                    <div className="flex justify-start items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                        </svg>
                                        ประเมินผล
                                    </div>
                                </button>
                            </div>
                        </div>
                    ))}

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

            <NavbarDirectorFunctions />

            <Step01_ModalDetailForm
                isOpen={isModalOpen}
                closeModal={closeModal}
                selectedForm={selectedForm}
                studentData={studentData}
                teacherData={teacherData}
            // UpdateStatus={UpdateStatus}
            />

            <State01_Assignedwork
                isOpen={isAssignedWork}
                closeModal={closeAssignedword}
                selectedForm={selectedFormAssigned}
                studentData={studentData}
                teacherData={teacherData}
            // UpdateStatus={UpdateStatus}
            />



        </div>
    );
}

export default State01_ShowData_Assingedwork;
