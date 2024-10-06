import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import LogoIcon from '../../img/Logo_White.svg';

const NavbarUserFunctions = () => {

    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);


    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            setUserInfo(JSON.parse(loggedInUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        sessionStorage.clear();

        navigate('/', { replace: true });

        // เคลียร์ประวัติการท่องเว็บเพื่อป้องกันการย้อนกลับ
        window.history.pushState(null, null, '/');
        window.onpopstate = function () {
            window.history.pushState(null, null, '/');
        };
    };

    return (
        <div className="col-span-2 col-start-10">
            <div className='bg-white m-4 mr-0 mt-0 border-2 rounded-xl p-6 text-gray-700 text-center'>
                {userInfo ? (
                    <div>
                        <h3 className='m-1'>{userInfo.name} {userInfo.lastname}</h3>
                        <p className="text-sm m-1">{userInfo.affiliation}</p>
                        <p className="text-sm m-1">วิทยาเขต{userInfo.campus}</p>
                    </div>
                ) : (
                    <p>Loading user info...</p>
                )}

                <hr className=' w-11/12 mx-auto mt-4' />

                <div className='flex items-center justify-center mt-3'>
                    <button
                        onClick={handleLogout}
                        className="bg-gray-500 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            </div>            

            <Link to="/basic_information">
                <div className='bg-white hover:bg-blue-700 hover:text-white m-4 mr-0 mt-0 rounded-xl p-6 text-gray-700 text-center'>
                    <h4>จัดส่งคำขอเปิดหลักสูตร</h4>
                </div>
            </Link>



        </div>
    );
};

export default NavbarUserFunctions;
