import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Loading';
import axios from 'axios';
import Navbar from '../../Navbar/NavbarAdmin';
import Background from '../../../img/Background.svg';
import UserStatistics from './UserStatistics';
import { Icon } from 'semantic-ui-react';
import NavbarAdminFunctions from '../../Navbar/NavbarAdminFunctions';

function ShowUserData() {
    const BackgroundImage = {
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    const [dataUser, setDataUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false); // สถานะของ Modal
    const [selectedUser, setSelectedUser] = useState(null); // ข้อมูลผู้ใช้ที่เลือก
    const itemsPerPage = 5;
    const navigate = useNavigate();

    const deleteUser = (id) => {
        axios.delete(`http://localhost:8080/test/delete_user/${id}`)
            .then(response => {
                setDataUser(prevData => prevData.filter(user => user.id !== id));
            })
            .catch(err => {
                console.error('Error deleting user:', err.response ? err.response.data : err.message);
            });
    };

    const editUser = (user) => {
        navigate('/Update_User', { state: { user } });
    };

    const handleAddUserClick = () => {
        navigate('/add_user');
    };


    const openModal = (user) => {
        setSelectedUser(user); // เก็บข้อมูลผู้ใช้ที่ถูกเลือก
        setIsModalOpen(true); // เปิด Modal
    };

    // ฟังก์ชันปิด Modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    useEffect(() => {
        axios.get('http://localhost:8080/getinfo_user/all')
            .then(res => setDataUser(res.data))
            .catch(err => console.error(err));
    }, []);

    if (!dataUser || dataUser.length === 0) {
        return <Loading />;
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = dataUser.slice(indexOfFirstItem, indexOfLastItem);


    const totalPages = Math.ceil(dataUser.length / itemsPerPage);

    return (
        <div className="bg-fixed min-w-screen min-h-screen" style={BackgroundImage}>
            <Navbar />


            <div className="grid grid-cols-12 p-5 pt-20 content-start">
                <div className=" col-span-8 col-start-2  ">

                    <div className='bg-white p-6 border-2 rounded-2xl'>
                        <h2 className='text-gray-700 pl-8'>สมาชิก</h2>
                    </div>

                    <div className='bg-white border-2 rounded-2xl px-10 py-8 mt-4' style={{ minHeight: '810px' }}>
                        <div className="flex justify-end gap-4 mb-5 ">

                            <button onClick={handleAddUserClick} className="bg-gray-700 hover:bg-blue-700 text-white font-bold px-5 py-4 items-end rounded-xl">
                                <div className="flex justify-start items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                                    </svg>
                                    เพิ่มสมาชิก
                                </div>
                            </button>

                        </div>

                        <hr className='w-11/12 mx-auto' />

                        <br />

                        {/* ตารางข้อมูลผู้ใช้ */}
                        <div className='overflow-x-auto'>

                            <div className="grid grid-cols-12 gap-4 items-center mb-3 bg-gray-700 rounded-xl text-gray-100">
                                <div className="col-span-3 text-center p-5">
                                    <p className="text-lg font-bold m-1">ชื่อ-นามสกุล</p>

                                </div>

                                <div className="col-span-4 text-center p-5">
                                    <p className="text-lg font-bold m-1">สังกัด</p>

                                </div>

                                <div className="col-span-5 gap-2 flex justify-center items-center">
                                    <p className="text-lg font-bold m-1">การจัดการ</p>
                                </div>

                            </div>

                            {currentItems.map((val, index) => (
                                <div key={index} className="bg-gray-200 hover:bg-gray-100 p-2 rounded-xl w-full mb-4">
                                    <div className="grid grid-cols-12 gap-4 items-center">

                                        <div className="col-span-3 text-center p-5 break-words">
                                            <p className="text-gray-700 font-bold m-1">{indexOfFirstItem + index + 1}. {val.name}&nbsp;{val.lastname}</p>
                                            <p>{val.position}</p>
                                        </div>

                                        <div className="col-span-4 text-center p-5">
                                            <p className="text-gray-700 font-bold m-1">{val.affiliation}</p>
                                            <p className="text-gray-700">วิทยาเขต: {val.campus}</p>
                                        </div>

                                        <div className="col-span-5 gap-2 flex flex-wrap justify-center items-center">
                                            <button onClick={() => openModal(val)} className="bg-gray-500 hover:bg-gray-700 hover:font-bold text-white px-4 py-2 rounded-lg">
                                                <div className="flex justify-start items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-2">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                    </svg>
                                                    รายละเอียด
                                                </div>
                                            </button>

                                            <button onClick={() => editUser(val)} className="bg-blue-500 hover:bg-blue-700 hover:font-bold text-white px-4 py-2 rounded-lg">
                                                <div className="flex justify-start items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-2">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                    </svg>
                                                    แก้ไข
                                                </div>
                                            </button>

                                            <button onClick={() => deleteUser(val.id)} className="bg-red-500 hover:bg-red-700 hover:font-bold text-white px-4 py-2 rounded-lg">
                                                <div className="flex justify-start items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-2">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                    </svg>
                                                    ลบ
                                                </div>
                                            </button>
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
                    </div>

                </div>

                <div className="col-span-2 col-start-10">
                    <UserStatistics />
                </div>

            </div>


            {/* Modal for Imformation User */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-2/6 rounded-full">
                        {selectedUser && (
                            <div className='text-gray-700'>

                                <div className="grid grid-cols-12 gab-1 items-center">
                                    <div className="col-span-12 text-start p-5">
                                        <h2 className="font-bold m-1"> {selectedUser.name} {selectedUser.lastname} </h2>
                                        <p className='m-1'>Role: {selectedUser.position}</p>

                                    </div>
                                </div>

                                <hr className='border-gray-300 w-11/12 mx-auto' />

                                <div className="grid grid-cols-12 gap-4 items-center">
                                    <div className="col-span-12 text-start p-5">
                                        <h2 className="text-lg font-bold mb-4 text-gray-400">ข้อมูลผู้ใช้</h2>

                                        <p className="text-start m-1"><strong>ชื่อผู้ใช้งาน:</strong> {selectedUser.username}</p>
                                        <p className="text-start m-1"><strong>รหัสผ่าน:</strong> {selectedUser.password}</p>
                                        {/* <p className="m-1"><strong>ชื่อ:</strong>{selectedUser.name}</p>
                                        <p className="m-1"><strong>นามสกุล:</strong>{selectedUser.lastname}</p> */}
                                        <p className="m-1"><strong>สังกัด:</strong> {selectedUser.affiliation}</p>
                                        <p className="m-1"><strong>วิทยาเขต:</strong> {selectedUser.campus}</p>


                                    </div>
                                </div>

                                <div className="grid grid-cols-12 gap-4 items-center">
                                    <div className="col-span-12 text-start p-5">
                                        <h3 className="text-lg font-bold text-gray-400">ช่องทางการติดต่อ</h3>
                                        <p className="m-1"><strong>อีเมล:</strong> {selectedUser.email || 'ไม่มีข้อมูล'}</p>
                                        <p className="m-1"><strong>เบอร์ติดต่อ:</strong> {selectedUser.phone || 'ไม่มีข้อมูล'}</p>
                                    </div>
                                </div>

                                <div className="col-span-5 gap-2 flex justify-center items-center">

                                    <button onClick={() => editUser(selectedUser)} className="bg-blue-500 hover:bg-blue-700 hover:font-bold text-white px-4 py-2 rounded-lg">
                                        <div className="flex justify-start items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-2">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>
                                            แก้ไข
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
        </div >
    );
}

export default ShowUserData;
