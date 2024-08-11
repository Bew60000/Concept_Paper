import React, { useState } from 'react';
import {
    FormInput,
    FormGroup,
    FormButton,
    Form,
    FormField,
} from 'semantic-ui-react';
import axios from 'axios';
import ShowUserData from './ShowUserData';
import Background from '../../img/Background.svg';
import Navbar from '../Navbar/Navbar';

export default function AddUser_Form() {

    const BackgroundImage = {
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }

    const [userMember, setUserMember] = useState({
        Name: '',
        LastName: '',
        Username: '',
        Password: '',
        Email: '',
        Phone: '',
        Affiliation: '',
        Position: '',
        Campus: '',
    });

    const HandleChange = (e) => {
        const { name, value } = e.target;
        setUserMember(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const HandleSubmit = (e) => {
        e.preventDefault();
        // axios.post('http://localhost:8080/test/add_info_User', userMember)
        axios.post('https://sheet.best/api/sheets/3feab3e0-5ebe-4337-8133-894169c2ac60', userMember)
            .then(res => {
                console.log(res);
                alert('กรอกข้อมูลเสร็จสิ้น');
                window.location.reload();
            })
            .catch(err => {
                console.error(err);
                alert('ไม่สามารถเพิ่มข้อมูลได้');
            });

        setUserMember({
            Name: '', LastName: '', Username: '', Password: '', Email: '',
            Phone: '', Affiliation: '', Position: '', Campus: '',
        });
    };

    return (
        <div className="bg-fixed min-w-screen min-h-screen" style={BackgroundImage}>
            <Navbar />
            <div className='pt-20'>

                <div className="flex items-center justify-center grid grid-cols-12 auto-rows-auto p-5">

                    <div className="bg-white col-span-10 col-start-2 p-20 border-2 rounded-2xl w-Screen">
                        <br />
                        <hr />
                        <h1>เพิ่มสมาชิก</h1>

                        <Form onSubmit={HandleSubmit}>
                            <FormGroup widths='equal'>
                                <FormInput
                                    fluid label='Username'
                                    type='text'
                                    name='Username'
                                    value={userMember.Username}
                                    onChange={HandleChange}
                                    placeholder='โปรดระบุ'
                                />
                                <FormInput
                                    fluid label='Password'
                                    type='text'
                                    name='Password'
                                    value={userMember.Password}
                                    onChange={HandleChange}
                                    placeholder='โปรดระบุ'
                                />
                                <FormField />
                            </FormGroup>

                            <FormGroup widths='equal'>
                                <FormInput
                                    fluid label='Position'
                                    type='text'
                                    name='Position'
                                    value={userMember.Position}
                                    onChange={HandleChange}
                                    placeholder='โปรดระบุ'
                                />
                                <FormInput
                                    fluid label='Campus'
                                    type='text'
                                    name='Campus'
                                    value={userMember.Campus}
                                    onChange={HandleChange}
                                    placeholder='โปรดระบุ'
                                />
                                <FormInput
                                    fluid label='Affiliation'
                                    type='text'
                                    name='Affiliation'
                                    value={userMember.Affiliation}
                                    onChange={HandleChange}
                                    placeholder='โปรดระบุ'
                                />
                            </FormGroup>

                            <FormGroup widths='equal'>
                                <FormInput
                                    fluid label='Name'
                                    type='text'
                                    name='Name'
                                    value={userMember.Name}
                                    onChange={HandleChange}
                                    placeholder='โปรดระบุ'
                                />
                                <FormInput
                                    fluid label='LastName'
                                    type='text'
                                    name='LastName'
                                    value={userMember.LastName}
                                    onChange={HandleChange}
                                    placeholder='โปรดระบุ'
                                />
                            </FormGroup>

                            <FormGroup widths='equal'>
                                <FormInput
                                    fluid label='Email'
                                    type='email'
                                    name='Email'
                                    value={userMember.Email}
                                    onChange={HandleChange}
                                    placeholder='โปรดระบุ'
                                />
                            </FormGroup>

                            <FormGroup widths='equal'>
                                <FormInput
                                    fluid label='Phone'
                                    type='tel'
                                    name='Phone'
                                    value={userMember.Phone}
                                    onChange={HandleChange}
                                    placeholder='โปรดระบุ'
                                />
                            </FormGroup>

                            <FormButton color='blue' type='submit'>เพิ่มสมาชิก</FormButton>

                        </Form>

                        <br />
                        <hr />
                        <h1>สมาชิก</h1>
                        <br />
                        <ShowUserData />
                    </div>


                </div>
            </div>


        </div>
    );
}
