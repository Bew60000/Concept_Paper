import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    FormInput,
    FormGroup,
    FormButton,
    Form,
    FormField,
} from 'semantic-ui-react';
import axios from 'axios';

import Background from '../../../img/Background.svg';
import Navbar from '../../Navbar/NavbarAdmin';


export default function Update_user() {
    const BackgroundImage = {
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    const location = useLocation();
    const navigate = useNavigate();
    const { user } = location.state;
    const [userMember, setUserMember] = useState({
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        username: user.username,
        password: user.password,
        position: user.position,
        affiliation: user.affiliation,
        email: user.email,
        phone: user.phone,
        campus: user.campus

    });
    const [id, setid] = useState(null);

    const HandleChange = (e) => {
        const { name, value } = e.target;
        setUserMember(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const HandleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8080/update_user/${user.id}`, userMember)
            // axios.put(`https://sheet.best/api/sheets/3feab3e0-5ebe-4337-8133-894169c2ac60/username/${user.username}`, userMember)
            .then(res => {
                console.log(res);
                console.log(res);

                alert('แก้ไขข้อมูลสำเร็จ');
                navigate('/show_user_data', { replace: true });
            })
            .catch(err => {
                console.error(err);
                alert('ไม่สามารถแก้ไขข้อมูลได้');
            });

        setUserMember({
            name: '', lastname: '', username: '', password: '', email: '',
            phone: '', affiliation: '', position: '', campus: '',
        });
    };



    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8080/test/get_user/${id}`)
                .then(res => {
                    setUserMember(res.data);
                })
                .catch(err => {
                    console.error(err);
                    alert('ไม่สามารถดึงข้อมูลผู้ใช้ได้');
                });
        }
    }, [id]);

    return (

        <div className="bg-fixed min-w-screen min-h-screen" style={BackgroundImage}>
            <Navbar />

            <div className="flex items-center justify-center grid grid-cols-12 auto-rows-auto p-5 pt-20">
                <div className="bg-white col-span-10 col-start-2 p-20 border-2 rounded-2xl w-Screen">

                    <h1>แก้ไขข้อมูล</h1>
                    <hr />
                    <br />

                    <Form onSubmit={HandleSubmit}>
                        <FormGroup widths='equal'>
                            <FormInput
                                fluid label='Username'
                                type='text'
                                name='username'
                                value={userMember.username}
                                onChange={HandleChange}
                                placeholder='โปรดระบุ'
                            />
                            <FormInput
                                fluid label='Password'
                                type='text'
                                name='password'
                                value={userMember.password}
                                onChange={HandleChange}
                                placeholder='โปรดระบุ'
                            />
                            <FormField />
                        </FormGroup>

                        <FormGroup widths='equal'>
                            <FormInput
                                fluid label='Position'
                                type='text'
                                name='position'
                                value={userMember.position}
                                onChange={HandleChange}
                                placeholder='โปรดระบุ'
                            />
                            <FormInput
                                fluid label='Campus'
                                type='text'
                                name='campus'
                                value={userMember.campus}
                                onChange={HandleChange}
                                placeholder='โปรดระบุ'
                            />
                            <FormInput
                                fluid label='Affiliation'
                                type='text'
                                name='affiliation'
                                value={userMember.affiliation}
                                onChange={HandleChange}
                                placeholder='โปรดระบุ'
                            />
                        </FormGroup>

                        <FormGroup widths='equal'>
                            <FormInput
                                fluid label='Name'
                                type='text'
                                name='name'
                                value={userMember.name}
                                onChange={HandleChange}
                                placeholder='โปรดระบุ'
                            />
                            <FormInput
                                fluid label='Lastname'
                                type='text'
                                name='lastname'
                                value={userMember.lastname}
                                onChange={HandleChange}
                                placeholder='โปรดระบุ'
                            />
                        </FormGroup>

                        <FormGroup widths='equal'>
                            <FormInput
                                fluid label='Email'
                                type='email'
                                name='email'
                                value={userMember.email}
                                onChange={HandleChange}
                                placeholder='โปรดระบุ'
                            />
                        </FormGroup>

                        <FormGroup widths='equal'>
                            <FormInput
                                fluid label='Phone'
                                type='tel'
                                name='phone'
                                value={userMember.phone}
                                onChange={HandleChange}
                                placeholder='โปรดระบุ'
                            />
                        </FormGroup>

                        <FormButton color='blue' type='submit'>แก้ไขสมาชิก</FormButton>

                    </Form>


                </div>
            </div>

        </div>
    );
}
