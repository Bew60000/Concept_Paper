import React, { useState, useEffect } from 'react';
import { Table, } from 'semantic-ui-react';
import axios from 'axios';

function ShowFormRequestForm() {

    const [dataUser, setDataUser] = useState([]);

    useEffect(() => {
        axios.get('https://sheet.best/api/sheets/12a6d6e6-5b9b-4502-bcc2-ec1aba194585')
            .then(res => setDataUser(res.data))
            .catch(err => console.error(err));
    }, []);



    return (
        <div className="flex items-center justify-center grid grid-cols-12 auto-rows-auto p-5">
            <div className="bg-white col-span-10 col-start-2 py-20 px-8 border-2 rounded-2xl w-Screen">
                <div className="py-0 px-0">
                    <ul className="space-y-5">
                        {dataUser.map((user, index) => (
                            <React.Fragment key={index}>
                                <li className="bg-sky-200 p-8 rounded-lg shadow-md m-5">
                                    <h1 className="font-bold text-xl mb-2">{user.MajorThai}</h1>
                                    <p className="text-gray-700">ชื่อภาษาอังกฤษ: {user.MajorEng} คณะ: {user.Faculty}</p>
                                    <p className="text-gray-700">วิทยาเขต: {user.Campus} ปีที่เริ่มสอน: {user.YearStarted}</p>
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
