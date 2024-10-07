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
                                <FormButton color='blue' type='submit'>เพิ่มสมาชิก</FormButton>
                                <FormButton color='grey' type='button' onClick={() => navigate('/show_user_data')}>
                                    ย้อนกลับ
                                </FormButton>
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
