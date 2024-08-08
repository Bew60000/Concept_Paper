import React, { useState } from 'react';
import {
    FormInput,
    FormGroup,
    FormButton,
    Form,
    Table,
} from 'semantic-ui-react';
import axios from 'axios';
import ShowUserData from './ShowUserData';

export default function AddUser_Form() {
    const [userMember, setUserMember] = useState({
        Name: '',
        LastName: '',
        ID: '',
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
        axios.post('http://localhost:8080/test/add_info_User', userMember)
            // axios.post('https://sheet.best/api/sheets/3feab3e0-5ebe-4337-8133-894169c2ac60', userMember)
            .then(res => {
                console.log(res);
                alert('กรอกข้อมูลเสร็จสิ้น');
                window.location.reload();
            })
            .catch(err => {
                console.error(err);
                alert('ไม่สามารถเพิ่มข้อมูลได้');
            })


        setUserMember({
            Name: '', LastName: '', ID: '', Password: '', Email: '',
            Phone: '', Affiliation: '', Position: '', Campus: '',
        });
    };

    return (
        <div className="grid grid-cols-12 auto-rows-auto gap-3 justify-center p-5">
            <div className='bg-white col-span-10 col-start-2 p-20 border-2 rounded-2xl shadow-10'>
                <h1>เพิ่มสมาชิก</h1>
                <br />
                <Form onSubmit={HandleSubmit}>
                    <FormGroup widths='equal'>
                        <FormInput
                            fluid label='ID'
                            type='text'
                            name='ID'
                            value={userMember.ID}
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
                        <FormInput
                            fluid label='Phone'
                            type='tel'
                            name='Phone'
                            value={userMember.Phone}
                            onChange={HandleChange}
                            placeholder='โปรดระบุ'
                        />
                    </FormGroup>
                    <FormGroup widths='equal'>
                        <FormInput
                            fluid label='Affiliation'
                            type='text'
                            name='Affiliation'
                            value={userMember.Affiliation}
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
                    </FormGroup>
                    <FormButton color='blue' type='submit'>เพิ่มสมาชิก</FormButton>
                </Form>

                <br />
                <hr />
                <h1>สมาชิก</h1>
                <br />

                <Table striped basic='very'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Count</Table.HeaderCell>
                            <Table.HeaderCell>Position</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>LastName</Table.HeaderCell>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Password</Table.HeaderCell>
                            <Table.HeaderCell>Affiliation</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>Phone</Table.HeaderCell>
                            <Table.HeaderCell>Action</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                </Table>

                <ShowUserData />

            </div>
        </div>
    );
}
