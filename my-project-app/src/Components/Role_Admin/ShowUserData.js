import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading';
import {
    Table,
    Button,
} from 'semantic-ui-react';
import axios from 'axios';

function ShowUserData() {
    const [dataUser, setDataUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const navigate = useNavigate(); // ใช้ useNavigate เพื่อทำการนำทาง   

    const deleteUser = (id) => {
        // const deleteUser = (Username) => {

        axios.delete(`http://localhost:8080/test/delete_user/${id}`)
            // axios.delete(`https://sheet.best/api/sheets/3feab3e0-5ebe-4337-8133-894169c2ac60/Username/${Username}`)
            .then(() => {
                // setDataUser(prevData => prevData.filter(user => user.Username !== Username));
                setDataUser(prevData => prevData.filter(user => user.id !== id));

            })
            .catch(err => console.error(err));
    };

    const editUser = (user) => {
        // นำทางไปยังหน้าส่วนแก้ไขข้อมูลพร้อมกับส่งข้อมูลของผู้ใช้ไปด้วย
        navigate('/edit-user', { state: { user } });
    };

    // const EditUser = (Username) => {
    //     axios.put('')
    //         .then(() => {
    //             window.location.reload();
    //         })
    //         .catch(err => {
    //             console.error(err);
    //             alert('ไม่สามารถแก้ไขข้อมูลได้');
    //         });
    // };

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
        <div>
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
                        <Table.HeaderCell><p className='text-center'>Action</p></Table.HeaderCell>
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
                            <Table.Cell>{val.email}</Table.Cell>
                            <Table.Cell>{val.phone ? val.phone : 'ไม่พบข้อมูล'}</Table.Cell>
                            <Table.Cell>{val.campus}</Table.Cell>
                            <Table.Cell>
                                {/* <Button onClick={() => EditUser(val.Username)}>แก้ไข</Button> */}
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
    );
}

export default ShowUserData;
