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

export default function AddUser_Form() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = location.state;
    const [userMember, setUserMember] = useState({
        Name: user.Name,
        LastName: user.LastName,
        Username: user.Username,
        Password: user.Password,
        Affiliation: user.Affiliation,
        Email: user.Email,
        Phone: user.Phone,
        Campus: user.Campus
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
        axios.put(`https://sheet.best/api/sheets/3feab3e0-5ebe-4337-8133-894169c2ac60/Username/${user.Username}`, userMember)
            .then(res => {
                console.log(res);
                alert('แก้ไขข้อมูลสำเร็จ');
                navigate('/adduser'); // กลับไปยังหน้าหลักหรือหน้าที่ต้องการหลังแก้ไขเสร็จ
                window.location.reload();
            })
            .catch(err => {
                console.error(err);
                alert('ไม่สามารถแก้ไขข้อมูลได้');
            });

        setUserMember({
            Name: '', LastName: '', Username: '', Password: '', Email: '',
            Phone: '', Affiliation: '', Position: '', Campus: '',
        });
    };
    const [isEditing, setIsEditing] = useState(false);
    const [id, setid] = useState(null);

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

                    <FormButton color='blue' type='submit'>แก้ไขสมาชิก</FormButton>

                </Form>


            </div>
        </div>
    );
}
