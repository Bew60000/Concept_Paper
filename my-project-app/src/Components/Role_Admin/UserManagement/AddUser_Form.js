import React, { useState } from 'react';
import {
    FormInput,
    FormGroup,
    FormButton,
    Form,
    FormSelect,
} from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Background from '../../../img/Background.svg';
import Navbar from '../../Navbar/NavbarAdmin';
import UserStatistics from './UserStatistics';

const options = [
    { key: 'A', text: 'Admin', value: 'Admin' },
    { key: 'U', text: 'User', value: 'User' },
    { key: 'D', text: 'Director', value: 'Director' },
];

const optionscampus = [
    { key: 'HY', text: 'หาดใหญ่', value: 'หาดใหญ่' },
    { key: 'PK', text: 'ภูเก็ต', value: 'ภูเก็ต' },
    { key: 'PT', text: 'ปัตตานี', value: 'ปัตตานี' },
    { key: 'T', text: 'ตรัง', value: 'ตรัง' },
    { key: 'SR', text: 'สุราษ', value: 'สุราษ' },
];


export default function AddUser_Form() {
    const navigate = useNavigate();

    const BackgroundImage = {
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    const [userMember, setUserMember] = useState({
        name: '',
        lastname: '',
        username: '',
        password: '',
        affiliation: '',
        position: '',
        campus: '',
        email: '',
        phone: '',
    });

    const HandleChange = (e, { name, value }) => {
        setUserMember(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const HandleSubmit = (e) => {
        e.preventDefault();

        const { name, lastname, username, password, affiliation, position, campus } = userMember;
        if (!name || !lastname || !username || !password || !affiliation || !position || !campus) {
            alert('กรุณากรอกข้อมูลให้ครบถ้วน');
            return;
        }

        axios.post('http://localhost:8080/add_info_User', userMember)
            .then(res => {
                console.log(res);
                alert('กรอกข้อมูลเสร็จสิ้น');
                navigate('/show_user_data', { replace: true });
            })
            .catch(err => {
                console.error(err);
                alert('ไม่สามารถเพิ่มข้อมูลได้');
            });

        setUserMember({
            name: '', lastname: '', username: '', password: '', email: '',
            phone: '', affiliation: '', position: '', campus: '',
        });
    };

    return (
        <div className="bg-fixed min-w-screen min-h-screen" style={BackgroundImage}>
            <Navbar />

            <div className="grid grid-cols-12 content-start auto-rows-auto text-gray-700 p-5 pt-20 ">

                <div className="col-span-8 col-start-2">

                    <div className='bg-white p-6 border-2 rounded-2xl'>
                        <h2 className='text-gray-700 pl-8'>เพิ่มสมาชิก</h2>
                    </div>

                    <div className='bg-white p-20 px-36 mt-4 border-2 rounded-2xl'>

                        <Form onSubmit={HandleSubmit}>
                            <FormGroup widths='equal'>
                                <FormInput
                                    fluid label='ชื่อผู้ใช้งาน'
                                    type='text'
                                    name='username'
                                    value={userMember.username}
                                    onChange={HandleChange}
                                    placeholder='โปรดระบุ'
                                />
                                <FormInput
                                    fluid label='รหัสผ่าน'
                                    type='text'
                                    name='password'
                                    value={userMember.password}
                                    onChange={HandleChange}
                                    placeholder='โปรดระบุ'
                                />
                            </FormGroup>

                            <FormGroup widths='equal'>
                                <FormSelect
                                    fluid
                                    label='ตำแหน่ง'
                                    options={options}
                                    name='position'
                                    placeholder='โปรดเลือก'
                                    value={userMember.position}
                                    onChange={HandleChange}
                                />
                                <FormSelect
                                    fluid
                                    label='วิทยาเขต'
                                    options={optionscampus}
                                    name='campus'
                                    placeholder='โปรดเลือก'
                                    value={userMember.campus}
                                    onChange={HandleChange}
                                />
                                <FormInput
                                    fluid label='สังกัด'
                                    type='text'
                                    name='affiliation'
                                    value={userMember.affiliation}
                                    onChange={HandleChange}
                                    placeholder='โปรดระบุ'
                                />
                            </FormGroup>

                            <FormGroup widths='equal'>
                                <FormInput
                                    fluid label='ชื่อ'
                                    type='text'
                                    name='name'
                                    value={userMember.name}
                                    onChange={HandleChange}
                                    placeholder='โปรดระบุ'
                                />
                                <FormInput
                                    fluid label='นามสกุล'
                                    type='text'
                                    name='lastname'
                                    value={userMember.lastname}
                                    onChange={HandleChange}
                                    placeholder='โปรดระบุ'
                                />
                            </FormGroup>

                            <FormGroup widths='equal'>
                                <FormInput
                                    fluid label='อีเมล'
                                    type='email'
                                    name='email'
                                    value={userMember.email}
                                    onChange={HandleChange}
                                    placeholder='ไม่บังคับ'
                                />
                            </FormGroup>

                            <FormGroup widths='equal'>
                                <FormInput
                                    fluid label='เบอร์ติดต่อ'
                                    type='tel'
                                    name='phone'
                                    value={userMember.phone}
                                    onChange={HandleChange}
                                    placeholder='ไม่บังคับ'
                                />
                            </FormGroup>

                            <FormGroup>
                                <button className="bg-blue-500 hover:bg-blue-700 hover:font-bold text-white px-4 py-2 rounded-lg ml-2" type="submit">
                                    <div className="flex justify-start items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                                        </svg>
                                        เพิ่มข้อมูลผู้ใช้ใหม่
                                    </div>
                                </button>
                                <button className="bg-gray-500 hover:bg-gray-700 hover:font-bold text-white px-4 py-2 rounded-lg ml-2" onClick={() => navigate('/show_user_data')}>
                                    <div className="flex justify-start items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                                        </svg>
                                        ยกเลิก
                                    </div>
                                </button>
                            </FormGroup>

                        </Form>
                    </div>

                </div>

                <div className="col-span-2 col-start-10">
                    <UserStatistics />
                </div>


            </div>

        </div>
    );
}
