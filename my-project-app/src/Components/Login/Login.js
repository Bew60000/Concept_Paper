import React, { useState, useEffect } from 'react';
import { Form, FormInput, Message, } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LogoIcon from '../../img/Logo_BlueSky.svg'

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            const user = JSON.parse(loggedInUser);
            if (user.position === 'User') {
                navigate('homepage_user', { replace: true });
            } else if (user.position === 'Director') {
                navigate('homepage_director', { replace: true });
            } else if (user.position === 'Admin') {
                navigate('homepage_admin', { replace: true });
            }
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('')
        try {

            const response = await axios.get('http://localhost:8080/getinfo_user/all');
            // const response = await axios.get('https://sheet.best/api/sheets/3feab3e0-5ebe-4337-8133-894169c2ac60');
            const data = response.data;



            const user = data.find(user => user.username === username && user.password === password);

            if (user) {
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                if (user.position === 'User') {
                    navigate('homepage_user');
                } else if (user.position === 'Director') {
                    navigate('homepage_director');
                } else if (user.position === 'Admin') {
                    navigate('homepage_admin');
                } else {
                    setError('Invalid position');
                }
            } else {
                setError('Invalid username or password');
            }
        } catch (err) {
            setError('Something went wrong. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-w-screen min-h-screen items-center justify-center bg-gradient-to-r from-blue-950 to-indigo-600">
            <div className='bg-white rounded-3xl border shadow-lg p-12 w-1/4'>
                <Form onSubmit={handleLogin} error={!!error} loading={loading}>
                    {/* <h1 className='text-gray-600 text-center'>เข้าสู่ระบบ</h1> */}
                    <img src={LogoIcon} className="mx-auto justify-center items-center text-center h-32 w-32 mb-6" />

                    <FormInput
                        label='Username'
                        type='text'
                        placeholder='Enter your Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <FormInput
                        label='Password'
                        type='password'
                        placeholder='Enter your Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {error && (
                        <Message
                            error
                            content={error}
                        />
                    )}

                    <br />
                    <div className='flex items-center justify-center gap-6'>
                        <button
                            type='submit'
                            className='bg-blue-500 flex-1 pr-5 pl-5 pt-3 pb-3 rounded-lg 
                            shadow-10 text-white hover:bg-blue-800 text-center'
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Login;
