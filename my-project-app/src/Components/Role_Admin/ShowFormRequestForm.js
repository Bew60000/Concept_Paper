import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Table, } from 'semantic-ui-react';
import axios from 'axios';

function ShowFormRequestForm() {
    const [dataUser, setDataUser] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/test/get_info')
            .then(res => setDataUser(res.data))
            .catch(err => console.error(err));
    }, []);



    return (
        <div className="flex flex-col items-center justify-center p-5 gap-5 pt-0">

            <div className="flex justify-between gap-5 pt-0">

                <div className="bg-white p-3 px-5 border-2 rounded-xl text-center">
                    <h5 className='text-gray-600'>รอการตอบรับ</h5>
                </div>
                <div className="bg-white p-3 px-5 border-2 rounded-xl text-center">
                    <h5 className='text-gray-600'>ดำเนินการคัดเลือกกรรมการ</h5>
                </div>
                <div className="bg-white p-3 px-5 border-2 rounded-xl text-center">
                    <h5 className='text-gray-600'>อยู่ระหว่างการประเมินผล</h5>
                </div>
                <div className="bg-white p-3 px-5 border-2 rounded-xl text-center">
                    <h5 className='text-gray-600'>รอการสรุปผล</h5>
                </div>
                <div className="bg-white p-3 px-5 border-2 rounded-xl text-center">
                    <h5 className='text-gray-600'>แจ้งผลประเมิน</h5>
                </div>
                <div className="bg-white p-3 px-5 border-2 rounded-xl text-center">
                    <h5 className='text-gray-600'>สิ้นสุดกระบวนการ</h5>
                </div>


            </div>

            <div className="grid grid-cols-12 gap-4 w-full">

                <div className="bg-white p-4 col-start-2 col-span-10 border-2 rounded-xl text-center px-12 py-12">
                    <h1 className='text-start text-gray-500'>คำขอเปิดหลักสูตร</h1>
                    <hr className='mb-5' />



                    {dataUser.map((info, index) => (
                        <div key={index} className="bg-gray-200 p-6 rounded-xl w-full mb-4">
                            <div className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-2 text-center p-10">
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
                                    className="bg-gray-500 text-white px-4 py-2 rounded-lg ml-2"
                                >
                                    ดูรายละเอียด
                                </button>
                                <button
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg ml-2"
                                >
                                    ปฏิเสธการตอบรับ
                                </button>
                                <button
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg ml-2"
                                >
                                    ตอบรับ
                                </button>
                            </div>
                        </div>
                    ))}

                </div>

            </div>

        </div>
    )
}

export default ShowFormRequestForm;
