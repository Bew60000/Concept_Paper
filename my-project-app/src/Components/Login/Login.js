import React, { useState } from 'react';
import { Form, FormInput } from 'semantic-ui-react';

function Login() {
    const [username, setUsername] = useState('');
    const [isInvalid, setIsInvalid] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username) {
            setIsInvalid(true);
        } else {
            setIsInvalid(false);
            // ส่งข้อมูลฟอร์มหรือทำสิ่งที่คุณต้องการ
        }
    };

    return (
        <div className="flex min-w-screen min-h-screen items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 "      >

            <div className='bg-white  rounded-3xl border shadow-lg p-12 w-1/4 '>
                <Form>
                    <h1 className='text-gray-600 text-center'>เข้าสู่ระบบ</h1>
                    <FormInput
                        label='Username'
                        type='text'
                        placeholder='Enter your ID' />

                    <FormInput
                        label='Password'
                        type='password'
                        placeholder='Enter your Password' />


                    {/* <input
                        type='text'
                        className='p-3 border-solid border-2 border-indigo-600 
                        rounded-md m-3 w-3/4'
                        placeholder='Enter your ID' />

                    <input
                        type='password'
                        className='p-3 border-solid border-2 border-indigo-600 
                        rounded-md m-3 w-3/4'
                        placeholder='Enter your Password' /> */}

                    <br />
                    <div className='flex items-center justify-center gap-6'>
                        {/* <button className='bg-blue-700 flex-1 pr-5 pl-5 pt-3 pb-3 rounded-lg
                        shadow-10 text-white hover:bg-blue-800 text-center '>Register</button> */}

                        <button className='bg-blue-700 flex-1 pr-5 pl-5 pt-3 pb-3 rounded-lg 
                        shadow-10 text-white hover:bg-blue-800 text-center '>Login</button>
                    </div>



                </Form>
            </div>

        </div>
    )
}

export default Login