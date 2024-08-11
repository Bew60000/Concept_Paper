import React, { useState, useEffect } from 'react';
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

    const deleteUser = (Username) => {
        axios.delete(`https://sheet.best/api/sheets/3feab3e0-5ebe-4337-8133-894169c2ac60/Username/${Username}`)
            .then(() => {
                setDataUser(prevData => prevData.filter(user => user.Username !== Username));
            })
            .catch(err => console.error(err));
    };

    const EditUser = (Username) => {
        axios.put('')
            .then(() => {
                window.location.reload();
            })
            .catch(err => {
                console.error(err);
                alert('ไม่สามารถแก้ไขข้อมูลได้');
            });
    };

    useEffect(() => {
        // axios.get('http://localhost:8080/getinfo_user/all')
        axios.get('https://sheet.best/api/sheets/3feab3e0-5ebe-4337-8133-894169c2ac60')
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
                            <Table.Cell><p className='text-center'>{val.Position}</p></Table.Cell>
                            <Table.Cell>{val.Name}&nbsp;&nbsp;&nbsp;{val.LastName}</Table.Cell>
                            <Table.Cell><p className='text-center'>{val.Username}</p></Table.Cell>
                            <Table.Cell><p className='text-center'>{val.Password}</p></Table.Cell>
                            <Table.Cell><p className='text-center'>{val.Affiliation}</p></Table.Cell>
                            <Table.Cell>{val.Email}</Table.Cell>
                            <Table.Cell>{val.Phone ? val.Phone : 'ไม่พบข้อมูล'}</Table.Cell>
                            <Table.Cell>{val.Campus}</Table.Cell>
                            <Table.Cell>
                                <Button onClick={() => EditUser(val.Username)}>แก้ไข</Button>
                                <Button onClick={() => deleteUser(val.Username)}>ลบ</Button>
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
