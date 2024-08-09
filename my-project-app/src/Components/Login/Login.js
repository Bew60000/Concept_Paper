import React, { useState } from 'react';
import { Form, FormInput } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [isInvalid, setIsInvalid] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username) {
            setIsInvalid(true);
        } else {
            setIsInvalid(false);
        }
    };

    const handleLoginClick = () => {
        navigate('home');
    };

    return (
        <div className="flex min-w-screen min-h-screen items-center justify-center bg-gradient-to-r from-blue-950 to-indigo-600 "      >

            <div className='bg-white  rounded-3xl border shadow-lg p-12 w-1/4 '>
                <Form onSubmit={handleSubmit}>
                    <h1 className='text-gray-600 text-center'>เข้าสู่ระบบ</h1>
                    <FormInput
                        label='Username'
                        type='text'
                        placeholder='Enter your ID' />

                    <FormInput
                        label='Password'
                        type='password'
                        placeholder='Enter your Password' />

                    <br />
                    <div className='flex items-center justify-center gap-6'>
                        <button
                            // type='submit'
                            className='bg-blue-700 flex-1 pr-5 pl-5 pt-3 pb-3 rounded-lg 
                        shadow-10 text-white hover:bg-blue-800 text-center'
                            onClick={handleLoginClick}
                        >
                            Login
                        </button>
                    </div>



                </Form>
            </div>

        </div>
    )
}

export default Login