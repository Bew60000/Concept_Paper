import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Table, } from 'semantic-ui-react';
import axios from 'axios';

function ShowFormRequestForm() {

    const [dataUser, setDataUser] = useState([]);
    const navigate = useNavigate(); // ใช้ useNavigate เพื่อทำการนำทาง  ไปยังหน้าแก้ไข

    useEffect(() => {
        // axios.get('https://sheet.best/api/sheets/12a6d6e6-5b9b-4502-bcc2-ec1aba194585')
        axios.get('http://localhost:8080/test/get_info')
            .then(res => setDataUser(res.data))
            .catch(err => console.error(err));
    }, []);


    const editinfo = (info) => {
        // นำทางไปยังหน้าส่วนแก้ไขข้อมูลพร้อมกับส่งข้อมูลของผู้ใช้ไปด้วย
        navigate('/edit-info', { state: { info } });
    };




    return (
        <div className="flex items-center justify-center grid grid-cols-12 auto-rows-auto p-5">
            <div className="bg-white col-span-10 col-start-2 py-20 px-8 border-2 rounded-2xl w-Screen">
                <div className="py-0 px-0">
                    <ul className="space-y-5">
                        {dataUser.map((info, index) => (
                            <React.Fragment key={index}>
                                <li onClick={() => editinfo(info)} className="bg-sky-200 p-8 rounded-lg shadow-md m-5">
                                    <h1 className="font-bold text-xl mb-2">{info.majorthai}</h1>
                                    <p className="text-gray-700">ชื่อภาษาอังกฤษ: {info.majoreng} คณะ: {info.faculty_id}</p>
                                    <p className="text-gray-700">วิทยาเขต: {info.campus} ปีที่เริ่มสอน: {info.yearstarted}</p>

                                </li>
                                {index < dataUser.length - 1 && <hr className="my-3 border-gray-300 w-11/12 mx-auto" />}
                            </React.Fragment>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default ShowFormRequestForm;
