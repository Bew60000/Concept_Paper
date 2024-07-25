import React, { useState, useEffect } from 'react';
import {
    FormInput,
    FormGroup,
    FormButton,
    Form,
    Table,
    Button,
} from 'semantic-ui-react';
import axios from 'axios';
import Loading from '../Loading';

export default function Form_Add_Member() {
    const [Name, setName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Email, setEmail] = useState('');
    const [Phone, setPhone] = useState('');
    const [Affiliation, setAffiliation] = useState('');
    const [Position, setPosition] = useState('');
    const [ID, setID] = useState('');
    const [Password, setPassword] = useState('');

    const [DataUser, setDataUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [currentID, setCurrentID] = useState(null);

    const UserMember = {
        Name, LastName, ID, Password, Email, Phone, Affiliation, Position,
    }

    const SubmitHandler = (e) => {
        e.preventDefault();
        if (isEditing) {
            axios.put(`https://sheet.best/api/sheets/3feab3e0-5ebe-4337-8133-894169c2ac60/${currentID}`, UserMember)
                .then(res => {
                    console.log(res);
                    alert('แก้ไขข้อมูลเสร็จสิ้น');
                    setIsEditing(false);
                    setCurrentID(null);
                });
        } else {
            axios.post('https://sheet.best/api/sheets/3feab3e0-5ebe-4337-8133-894169c2ac60', UserMember)
                .then(res => {
                    console.log(res);
                    alert('กรอกข้อมูลเสร็จสิ้น');
                });
        }
        setName('');
        setLastName('');
        setID('');
        setPassword('');
        setEmail('');
        setPhone('');
        setAffiliation('');
        setPosition('');
        window.location.reload();
    }

    const editUser = (user) => {
        setIsEditing(true);
        setCurrentID(user.ID);
        setName(user.Name);
        setLastName(user.LastName);
        setID(user.ID);
        setPassword(user.Password);
        setEmail(user.Email);
        setPhone(user.Phone);
        setAffiliation(user.Affiliation);
        setPosition(user.Position);
    }

    useEffect(() => {
        axios.get('https://sheet.best/api/sheets/3feab3e0-5ebe-4337-8133-894169c2ac60')
            .then(res => setDataUser(res.data))
            .catch(err => console.error(err));
    }, []);

    if (!DataUser) {
        return <Loading />
    }

    return (
        <div className="grid grid-cols-12 auto-rows-auto gap-3 justify-center p-5">
            <div className='bg-white col-span-8 col-start-3 p-20 border-2 rounded-2xl shadow-10'>
                <h1>{isEditing ? 'แก้ไขสมาชิก' : 'เพิ่มสมาชิก'}</h1>
                <hr />
                <br />
                <Form onSubmit={SubmitHandler}>
                    <FormGroup widths='equal'>
                        <FormInput fluid label='ID'
                            type='text'
                            value={ID}
                            onChange={(e) => setID(e.target.value)}
                            placeholder='โปรดระบุ' />

                        <FormInput fluid label='Password'
                            type='text'
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='โปรดระบุ' />
                    </FormGroup>

                    <FormGroup widths='equal'>
                        <FormInput fluid label='Position'
                            type='text'
                            value={Position}
                            onChange={(e) => setPosition(e.target.value)}
                            placeholder='โปรดระบุ' />

                        <FormInput fluid label='Name'
                            type='text'
                            value={Name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='โปรดระบุ' />

                        <FormInput fluid label='Lastname'
                            type='text'
                            value={LastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder='โปรดระบุ' />
                    </FormGroup>

                    <FormGroup widths='equal'>
                        <FormInput fluid label='Email'
                            type='text'
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='โปรดระบุ' />

                        <FormInput fluid label='Phone'
                            type='text'
                            value={Phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder='โปรดระบุ' />
                    </FormGroup>

                    <FormInput fluid label='Affiliation'
                        type='text'
                        value={Affiliation}
                        onChange={(e) => setAffiliation(e.target.value)}
                        placeholder='โปรดระบุ' />

                    <FormButton color='blue' type='submit' >{isEditing ? 'แก้ไข' : 'เพิ่ม'}</FormButton>

                </Form>

                <br />
                <h1>สมาชิก</h1>
                <hr />
                <br />

                <Table striped basic='very'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Position</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>LastName</Table.HeaderCell>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Password</Table.HeaderCell>
                            <Table.HeaderCell>Affiliation</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>Phone</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {DataUser.map((val, index) =>
                            <Table.Row key={index}>
                                <Table.Cell>{val.Position}</Table.Cell>
                                <Table.Cell>{val.Name}</Table.Cell>
                                <Table.Cell>{val.LastName}</Table.Cell>
                                <Table.Cell>{val.ID}</Table.Cell>
                                <Table.Cell>{val.Password}</Table.Cell>
                                <Table.Cell>{val.Affiliation}</Table.Cell>
                                <Table.Cell>{val.Email}</Table.Cell>
                                <Table.Cell>
                                    {val.Phone !== undefined && val.Phone !== null ? val.Phone : 'ไม่พบข้อมูล'}
                                </Table.Cell>
                                <Table.Cell>
                                    <Button onClick={() => editUser(val)}>แก้ไข</Button>
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </div>
        </div>
    );
}
