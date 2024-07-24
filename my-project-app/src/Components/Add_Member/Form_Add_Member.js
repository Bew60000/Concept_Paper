import React from 'react';
import { useState, useEffect } from 'react';
import {
    FormInput,
    FormGroup,
    FormButton,
    Form,
    Table,
} from 'semantic-ui-react';
import axios from 'axios';

export default function Form_Add_Member() {
    const [Name, setName] = useState('');
    const [LastName, setLastName] = useState('');
    const [ID, setID] = useState('');
    const [Password, setPassword] = useState('');

    const [DataUser, setDataUser] = useState(null);

    const UserMember = {
        Name,
        LastName,
        ID,
        Password,
    }

    const SubmitHander = (e) => {
        e.preventDefault();
        console.log(ID, Password, Name, LastName);

        axios.post('https://sheet.best/api/sheets/3feab3e0-5ebe-4337-8133-894169c2ac60', UserMember)
            .then(res => {
                console.log(res);
                alert('กรอกข้อมูลเสร็จสิ้น');
                window.location.reload();
            })
        setName('');
        setLastName('');
        setID('');
        setPassword('');
    }

    useEffect(() => {
        axios.get('https://sheet.best/api/sheets/3feab3e0-5ebe-4337-8133-894169c2ac60')
            .then(res => setDataUser(res))
        console.log(DataUser);
    }, []);

    if (!DataUser) {
        return <div />
    }

    return (
        <div className="grid grid-cols-12 auto-rows-auto gap-3 justify-center p-5">
            <div className='bg-white col-span-8 col-start-3 p-20 border-2 rounded-2xl shadow-10'>
                <h1>เพิ่มสมาชิก</h1>
                <hr />
                <br />
                <Form onSubmit={SubmitHander}>
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

                    <FormButton color='blue' type='submit' >Submit</FormButton>

                </Form>

                <br />                
                <h1>สมาชิก</h1>
                <hr />
                <br />

                <Table celled>
                    <Table.Header>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Password</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>LastName</Table.HeaderCell>
                    </Table.Header>

                    <Table.Body>
                        {DataUser.data.map((val, index) =>
                            <Table.Row key={index}>
                                <Table.Cell>{val.ID}</Table.Cell>
                                <Table.Cell>{val.Password}</Table.Cell>
                                <Table.Cell>{val.Name}</Table.Cell>
                                <Table.Cell>{val.LastName}</Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>

            </div>
        </div>
    );

}
