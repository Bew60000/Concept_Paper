import React, { useState, useEffect } from 'react';
import Loading from '../Loading';
import {
    Table,
    Button,
} from 'semantic-ui-react';
import axios from 'axios';

function ShowUserData() {
    const [dataUser, setDataUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const deleteUser = (id) => {
        axios.delete(`https://sheet.best/api/sheets/3feab3e0-5ebe-4337-8133-894169c2ac60/ID/${id}`)
            .then(() => {
                window.location.reload();
            })
            .catch(err => console.error(err));
    };

    useEffect(() => {
        axios.get('https://sheet.best/api/sheets/3feab3e0-5ebe-4337-8133-894169c2ac60')
            .then(res => setDataUser(res.data))
            .catch(err => console.error(err));
    }, []);

    if (!dataUser) {
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
            <Table striped basic='very'>
                <Table.Body>
                    {currentItems.map((val, index) => (
                        <Table.Row key={index}>
                            <Table.Cell>{indexOfFirstItem + index + 1}</Table.Cell>
                            <Table.Cell>{val.Position}</Table.Cell>
                            <Table.Cell>{val.Name}</Table.Cell>
                            <Table.Cell>{val.LastName}</Table.Cell>
                            <Table.Cell>{val.ID}</Table.Cell>
                            <Table.Cell>{val.Password}</Table.Cell>
                            <Table.Cell>{val.Affiliation}</Table.Cell>
                            <Table.Cell>{val.Email}</Table.Cell>
                            <Table.Cell>{val.Phone ? val.Phone : 'ไม่พบข้อมูล'}</Table.Cell>
                            <Table.Cell>
                                <Button onClick={() => deleteUser(val.ID)}>ลบ</Button>
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
    )
}

export default ShowUserData;