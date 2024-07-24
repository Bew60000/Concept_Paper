import React from 'react';
import { useState } from 'react';
import {
    FormInput,
    FormGroup,
    FormButton,
    Form,
} from 'semantic-ui-react';
import axios from 'axios';

export default function Form_Add_Member() {
    const [Name, setName] = useState('');
    const [LastName, setLastName] = useState('');
    const [ID, setID] = useState('');
    const [Password, setPassword] = useState('');

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
            })
        setName('');
        setLastName('');
        setID('');
        setPassword('');
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
            </div>
        </div>
    );

}
