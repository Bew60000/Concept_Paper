import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import imageUser from '../../img/image_User.svg'

const NavbarDirectorFunctions = () => {

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
                    <div className="flex flex-col items-center">
                        {/* <img src={imageUser} alt="user icon" className="h-24 w-24 rounded-full mb-4" /> */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-32 text-blue-900">
                            <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clip-rule="evenodd" />
                        </svg>
                        <h4 className='m-1'>{userInfo.name} {userInfo.lastname}</h4>
                        <p className="text-sm m-0">"คณะกรรมการ"</p>
                        <p className="text-sm m-0 mt-1">{userInfo.affiliation}</p>
                        <p className="text-sm m-0">วิทยาเขต{userInfo.campus}</p>
                    </div>
                ) : (
                    <p>Loading user info...</p>
                )}

            </div>

            <div className='bg-white rounded-xl ml-4 p-0 text-gray-700 text-center'>

                <Link to="/homepage_director">
                    <div className='bg-white hover:bg-blue-700 hover:text-white hover:font-bold mb-0 mr-0 mt-0 p-6 rounded-xl text-gray-700 text-center'>
                        <div className="flex justify-start ml-4 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                            </svg>
                            <p>ประเมินผลหลักสูตร</p>
                        </div>
                    </div>
                </Link>

                <hr className=' w-10/12 mx-auto border-gray-300' />

                <Link to="/director/2/showdatacompletedassignedwork">
                    <div className='bg-white hover:bg-blue-700 hover:text-white hover:font-bold mb-0 mr-0 mt-0 p-6 rounded-xl text-gray-700 text-center'>
                        <div className="flex justify-start ml-4 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                            </svg>

                            <p>ประเมินผลเสร็จสิ้น</p>
                        </div>
                    </div>
                </Link>

            </div>

            <div className='bg-white rounded-xl ml-4 p-0 mt-4 text-gray-700 text-center'>

                <Link to="/director/3/showdatadatasummaryresults">
                    <div className='bg-white hover:bg-blue-700 hover:text-white hover:font-bold mb-0 mr-0 mt-0 p-6 rounded-xl text-gray-700 text-center'>
                        <div className="flex justify-start ml-4 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                            </svg>
                            <p>สรุปผลการประเมิน</p>
                        </div>
                    </div>
                </Link>

                <hr className=' w-10/12 mx-auto border-gray-300' />

                <Link to="/director/4/showdatadatashowdatacompletedsummar">
                    <div className='bg-white hover:bg-blue-700 hover:text-white hover:font-bold mb-0 mr-0 mt-0 p-6 rounded-xl text-gray-700 text-center'>
                        <div className="flex justify-start ml-4 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                            </svg>

                            <p>สรุปผลเสร็จสิ้น</p>
                        </div>
                    </div>
                </Link>

            </div>

            <Link to="/">
                <div className='bg-white m-4 mr-0 rounded-xl p-6 text-gray-700 text-center hover:bg-red-800 hover:text-white' onClick={handleLogout}>
                    <div className="flex justify-center items-center space-x-2">
                        <p className="font-bold ">ออกจากระบบ</p>
                    </div>
                </div>
            </Link>



        </div>
    );
};

export default NavbarDirectorFunctions;
