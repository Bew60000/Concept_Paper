import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbartest from '../Navbar/Navbartest';

function ShowStatusForm() {
    const [dataUser, setDataUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/test/get_info')

            .then(res => setDataUser(res.data))
            .catch(err => console.error(err));
    }, []);

    const deleteRequest = (info) => {
        axios.delete(`http://localhost:8080/deletebasic_info/${info.curriculum_id}`)

            .then(() => {
                // ลบข้อมูลจาก state หลังจากลบจากฐานข้อมูลเสร็จแล้ว
                setDataUser(prevData => prevData.filter(user => user.curriculum_id !== info.curriculum_id));
            })
            .catch(err => console.error(err));
    };

    const editRequest = (info) => {
        // นำทางไปยังหน้าสำหรับแก้ไขข้อมูลพร้อมกับส่งข้อมูลไปด้วย
        navigate('/edit_form', { state: { info } });
    };

    const totalPages = Math.ceil(dataUser.length / itemsPerPage);
    const currentData = dataUser.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="grid grid-cols-12 p-5 pt-0 content-start">

            <div className="col-start-2 col-span-8">
                <div className="bg-white border-2 rounded-2xl p-10" style={{ minHeight: '930px' }}>
                    <h2 className='text-start text-gray-700'>คำขอที่กำลังดำเนินการ</h2>
                    <hr className='mb-5' />

                    <div className="grid grid-cols-12 gap-4 items-center mb-3 bg-gray-700 rounded-xl text-gray-100">

                        <div className="col-span-2 text-center p-5">
                            <p className="text-lg font-bold m-1">จัดส่งเมื่อ</p>
                        </div>

                        <div className="col-span-4 text-center p-5">
                            <p className="text-lg font-bold m-1">ผู้รับผิดชอบ</p>

                        </div>

                        <div className="col-span-4 gap-2 flex justify-center items-center">
                            <p className="text-lg font-bold m-1">หลักสูตร</p>
                        </div>

                        <div className="col-span-2 gap-2 flex justify-center items-center">
                            <p className="text-lg font-bold m-1">สถานะ</p>
                        </div>

                    </div>

                    {currentData.map((info, index) => (
                        <div key={index} className="bg-gray-200 hover:bg-gray-100 p-6 rounded-xl w-full mb-4" >
                            <div className="grid grid-cols-12 gap-4 items-center">

                                <div className="col-span-2 text-center">
                                    <p className="text-gray-700 m-1">ปีที่เปิดสอน</p>
                                    <p className="text-gray-700">'{info.yearstarted}'</p>
                                </div>

                                <div className="col-span-4 text-center">
                                    <p className="text-gray-700 font-bold m-1">คณะ{info.faculty}</p>
                                    <p className="text-gray-700">วิทยาเขต: {info.campus}</p>
                                </div>

                                <div className="col-span-4 text-center">
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
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg ml-2"
                                    onClick={() => deleteRequest(info)}
                                >
                                    ยกเลิกคำขอ
                                </button>
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg ml-2"
                                    onClick={() => editRequest(info)}
                                >
                                    แก้ไขข้อมูล
                                </button>
                                <button className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded-lg ml-2">
                                    ดูรายละเอียด
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

            <Navbartest />
        </div>
    )
}

export default ShowStatusForm;
