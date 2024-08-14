import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ShowStatusForm() {
    const [dataUser, setDataUser] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://sheet.best/api/sheets/12a6d6e6-5b9b-4502-bcc2-ec1aba194585')
            .then(res => setDataUser(res.data))
            .catch(err => console.error(err));
    }, []);

    const deleteRequest = (info) => {
        axios.delete(`https://sheet.best/api/sheets/12a6d6e6-5b9b-4502-bcc2-ec1aba194585/majorthai/${info.majorthai}`)
            .then(() => {
                // ลบข้อมูลจาก state หลังจากลบจากฐานข้อมูลเสร็จแล้ว
                setDataUser(prevData => prevData.filter(user => user.majorthai !== info.majorthai));
            })
            .catch(err => console.error(err));
    };

    const editRequest = (info) => {
        // นำทางไปยังหน้าสำหรับแก้ไขข้อมูลพร้อมกับส่งข้อมูลไปด้วย
        navigate('/edit_form', { state: { info } });
    };

    return (
        <div className="flex flex-col items-center justify-center p-5 gap-5 pt-0">
            <div className="grid grid-cols-12 gap-4 w-full">
                <div className="bg-white p-4 col-start-2 col-span-10 border-2 rounded-xl text-center px-12 py-12">
                    <h1 className='text-start text-gray-500'>คำขอที่กำลังดำเนินการ</h1>
                    <hr className='mb-5' />

                    {dataUser.map((info, index) => (
                        <div key={index} className="bg-gray-200 p-6 rounded-xl w-full mb-4">
                            <div className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-2 text-center p-10">
                                    <p className="text-gray-700">วันที่ยื่น : {info.yearstarted}</p>
                                </div>
                                <div className="col-span-4 text-center">
                                    <p className="text-gray-700">คณะ{info.faculty}</p>
                                </div>
                                <div className="col-span-4 text-center">
                                    <p className="text-gray-700">หลักสูตร{info.majorthai}</p>
                                    <p className="text-gray-700">({info.majoreng})</p>
                                </div>
                                <div className="col-span-2 text-center">
                                    <p className="text-gray-700">สถานะ</p>
                                    <p className="text-blue-600">"รอการตอบรับ"</p>
                                </div>
                            </div>
                            <hr className='border-white m-5 mt-4' />
                            <div className="flex justify-end items-center mt-2">
                                <button 
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg ml-2"
                                    onClick={() => deleteRequest(info)}
                                >
                                    ยกเลิกคำขอ
                                </button>
                                <button 
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2"
                                    onClick={() => editRequest(info)}
                                >
                                    แก้ไขข้อมูล
                                </button>
                                <button className="bg-gray-500 text-white px-4 py-2 rounded-lg ml-2">
                                    ดูรายละเอียด
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ShowStatusForm;
