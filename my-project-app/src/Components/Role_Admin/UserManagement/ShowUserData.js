import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Loading';
import axios from 'axios';
import Navbar from '../../Navbar/NavbarAdmin';
import Background from '../../../img/Background.svg';
import UserStatistics from './UserStatistics';

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
                        <h1 className='text-gray-500 pl-8'>สมาชิก</h1>
                    </div>

                    <div className='bg-white border-2 rounded-2xl px-10 py-8 mt-4' style={{ minHeight: '930px' }}>
                        <div className="flex justify-end gap-4 mb-5 ">

                            <button
                                onClick={handleAddUserClick}
                                className="bg-sky-900 hover:bg-blue-700 text-white font-bold px-5 py-4 items-end rounded-xl"
                            >
                                เพิ่มสมาชิก
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
                                <div key={index} className="bg-gray-100 hover:bg-gray-200 p-6 rounded-xl w-full mb-4">
                                    <div className="grid grid-cols-12 gap-4 items-center">

                                        <div className="col-span-3 text-center p-5">
                                            <p className="text-gray-700 font-bold m-1">{indexOfFirstItem + index + 1}. {val.name} {val.lastname}</p>
                                            <p>{val.position}</p>
                                        </div>

                                        <div className="col-span-4 text-center p-5">
                                            <p className="text-gray-700 font-bold m-1">{val.affiliation}</p>
                                            <p className="text-gray-700">วิทยาเขต: {val.campus}</p>
                                        </div>

                                        <div className="col-span-5 gap-2 flex flex-wrap justify-center items-center">
                                            <button
                                                onClick={() => openModal(val)}
                                                className="bg-sky-800 hover:bg-blue-500 text-white py-3 px-5 rounded"
                                            >
                                                รายละเอียด
                                            </button>

                                            <button
                                                onClick={() => editUser(val)}
                                                className="bg-gray-400 hover:bg-green-600 text-white py-3 px-5 rounded"
                                            >
                                                แก้ไข
                                            </button>

                                            <button
                                                onClick={() => deleteUser(val.id)}
                                                className="bg-red-500 hover:bg-red-700 text-white py-3 px-5 rounded"
                                            >
                                                ลบ
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

                <div className="col-span-2 col-start-10" style={{ minHeight: '1030px' }}>
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

                                    <button
                                        onClick={() => editUser(selectedUser)}
                                        className="bg-gray-400 hover:bg-green-600 text-white py-3 px-5 rounded"
                                    >
                                        แก้ไข
                                    </button>

                                    <button
                                        onClick={closeModal}
                                        className="bg-red-500 hover:bg-red-700 text-white py-3 px-5 rounded ml-2"
                                    >
                                        ปิด
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
