import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Loading';
import { Table, Button, } from 'semantic-ui-react';
import axios from 'axios';

import Navbar from '../../Navbar/NavbarAdmin';
import Background from '../../../img/Background.svg';
import UserStatistics from './UserStatistics';

function ShowUserData() {
    const BackgroundImage = {
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }

    const [dataUser, setDataUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const navigate = useNavigate();

    // const deleteUser = (username) => {
    const deleteUser = (id) => {
        axios.delete(`http://localhost:8080/test/delete_user/${id}`)
            // axios.delete(`https://sheet.best/api/sheets/3feab3e0-5ebe-4337-8133-894169c2ac60/username/${username}`)
            .then(response => {
                console.log('Delete Response:', response);
                // setDataUser(prevData => prevData.filter(user => user.username !== username));
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

    useEffect(() => {
        axios.get('http://localhost:8080/getinfo_user/all')
            // axios.get('https://sheet.best/api/sheets/3feab3e0-5ebe-4337-8133-894169c2ac60')
            .then(res => setDataUser(res.data))
            .catch(err => console.error(err));
    }, []);

    if (!dataUser || dataUser.length === 0) {
        return <Loading />;
    }

    // กำหนดข้อมูลที่จะแสดงในหน้าปัจจุบัน
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = dataUser.slice(indexOfFirstItem, indexOfLastItem);

    // คำนวณจำนวนหน้าทั้งหมด
    const totalPages = Math.ceil(dataUser.length / itemsPerPage);

    return (
        <div className="bg-fixed min-w-screen min-h-screen" style={BackgroundImage}>
            <Navbar />

            <UserStatistics />

            <div className="flex items-center justify-center grid grid-cols-12 auto-rows-auto p-5">

                <div className="bg-white col-span-10 col-start-2 p-20 border-2 rounded-2xl w-Screen">

                    <div className="flex justify-between gap-4 mb-10">
                        <h1>สมาชิก</h1>
                        <button
                            onClick={handleAddUserClick}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-3 rounded-xl"
                        >
                            เพิ่มสมาชิก
                        </button>
                    </div>

                    <br />
                    <Table selectable responsive basic='very'>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Count</Table.HeaderCell>
                                <Table.HeaderCell>Position</Table.HeaderCell>
                                <Table.HeaderCell><p className='text-center'>Name</p></Table.HeaderCell>
                                <Table.HeaderCell>Username</Table.HeaderCell>
                                <Table.HeaderCell>Password</Table.HeaderCell>
                                <Table.HeaderCell>Affiliation</Table.HeaderCell>
                                <Table.HeaderCell><p className='text-center'>Email</p></Table.HeaderCell>
                                <Table.HeaderCell>Phone</Table.HeaderCell>
                                <Table.HeaderCell>Campus</Table.HeaderCell>
                                <Table.HeaderCell>Action</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {currentItems.map((val, index) => (
                                <Table.Row key={index}>
                                    <Table.Cell><p className='text-center'>{indexOfFirstItem + index + 1}</p></Table.Cell>
                                    <Table.Cell><p className='text-center'>{val.position}</p></Table.Cell>
                                    <Table.Cell>{val.name}&nbsp;&nbsp;&nbsp;{val.lastname}</Table.Cell>
                                    <Table.Cell><p className='text-center'>{val.username}</p></Table.Cell>
                                    <Table.Cell><p className='text-center'>{val.password}</p></Table.Cell>
                                    <Table.Cell><p className='text-center'>{val.affiliation}</p></Table.Cell>
                                    <Table.Cell>{val.email ? val.email : 'ไม่พบข้อมูล'}</Table.Cell>
                                    <Table.Cell>{val.phone ? val.phone : 'ไม่พบข้อมูล'}</Table.Cell>
                                    <Table.Cell>{val.campus}</Table.Cell>
                                    <Table.Cell>
                                        <Button onClick={() => editUser(val)}>แก้ไข</Button>
                                        {/* <Button onClick={() => deleteUser(val.username)}>ลบ</Button> */}
                                        <Button onClick={() => deleteUser(val.id)}>ลบ</Button>

                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                    <div>
                        <Button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => prev - 1)}
                        >
                            หน้าก่อนหน้า
                        </Button>

                        <span> หน้าที่ {currentPage} จาก {totalPages} </span>

                        <Button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(prev => prev + 1)}
                        >
                            หน้าถัดไป
                        </Button>
                    </div>
                </div>


            </div>

        </div>
    );
}

export default ShowUserData;
