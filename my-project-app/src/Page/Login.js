import React from 'react'
import Background from '../img/Background.svg';
import { Form, FormInput } from 'semantic-ui-react';

function Login() {

    const BackgroundImage = {
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }

    return (
        //  bg-gradient-to-r from-purple-500 to-pink-500
        <div className="flex min-w-screen min-h-screen items-center justify-center " style={BackgroundImage}     >

            <div className='bg-white  rounded-3xl border shadow-lg p-12 w-2/4 h-3/4'>
                <Form>
                    <h1 className='text-gray-600 text-center'>เข้าสู่ระบบ</h1>
                    <FormInput
                    label='Username'
                        type='text'
                        className='text-'
                        placeholder='Enter your ID' />

                    <FormInput
                    label='Password'
                        type='text'
                        className=''
                        placeholder='Enter your Password' />


                    {/* <input
                        type='text'
                        className='p-3 border-solid border-2 border-indigo-600 rounded-md m-3 w-3/4'
                        placeholder='Enter your ID' />

                    <input
                        type='text'
                        className='p-3 border-solid border-2 border-indigo-600 rounded-md m-3 w-3/4'
                        placeholder='Enter your Password' /> */}

                    <br />
                    <button className='bg-indigo-600 pr-5 pl-5 pt-3 pb-3 rounded-xl shadow-10 text-white mt-5 hover:bg-indigo-900 text-center'>Login</button>
                </Form>
            </div>

        </div>
    )
}

export default Login