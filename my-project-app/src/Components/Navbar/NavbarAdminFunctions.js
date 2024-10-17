import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const NavbarAdminFunctions = () => {

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
                        <p className="text-sm m-0 mt-1">"{userInfo.affiliation}"</p>
                        <p className="text-sm m-0">วิทยาเขต{userInfo.campus}</p>
                    </div>
                ) : (
                    <p>Loading user info...</p>
                )}

                {/* <hr className=' w-11/12 mx-auto mt-4' />

                <div className='flex items-center justify-center mt-3'>
                    <button onClick={handleLogout} className="bg-gray-500 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-red-600">
                        Logout
                    </button>
                </div> */}
            </div>

            {/* <Link to="/basic_information">
                <div className='bg-white hover:bg-blue-700 hover:text-white m-4 mr-0 mt-0 rounded-xl p-6 text-gray-700 text-center'>
                    <h4>มอบหมายงาน</h4>
                </div>
            </Link> */}

            <Link to="/show_user_data">
                <div className='bg-white m-4 mr-0 rounded-xl p-6 text-gray-700 text-center hover:bg-blue-700 hover:text-white'>
                    <div className="flex justify-center items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                            <path fill-rule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clip-rule="evenodd" />
                            <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                        </svg>
                        <p className="font-bold ">สมาชิกผู้ใช้งาน</p>
                    </div>
                </div>
            </Link>

            <div className='bg-white rounded-xl ml-4 p-0 text-gray-700 text-center'>

                <Link to="/homepage_admin">
                    <div className='bg-white hover:bg-blue-700 hover:text-white hover:font-bold mb-0 mr-0 mt-0 p-6 rounded-xl text-gray-700 text-center'>
                        <div className="flex justify-start ml-4 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <p>รอการตอบรับ</p>
                        </div>
                    </div>
                </Link>

                <hr className=' w-10/12 mx-auto border-gray-300' />

                <Link to="/showdetailassign_work">
                    <div className='bg-white hover:bg-blue-700 hover:text-white hover:font-bold mb-0 mr-0 mt-0 p-6 rounded-xl text-gray-700 text-center'>
                        <div className="flex justify-start ml-4 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                            </svg>
                            <p>มอบหมายงาน</p>
                        </div>
                    </div>
                </Link>

                <hr className=' w-10/12 mx-auto border-gray-300' />

                <Link to='/showdetailmake_assessment'>
                    <div className='bg-white hover:bg-blue-700 hover:text-white hover:font-bold mb-0 mr-0 mt-0 p-6 rounded-xl text-gray-700 text-center'>
                        <div className="flex justify-start ml-4 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
                            </svg>
                            <p>กำลังทำการประเมิน</p>
                        </div>
                    </div>
                </Link>

                <hr className=' w-10/12 mx-auto border-gray-300' />

                <div className='bg-white hover:bg-blue-700 hover:text-white hover:font-bold mb-0 mr-0 mt-0 p-6 rounded-xl text-gray-700 text-center'>
                    <div className="flex justify-start ml-4 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                        </svg>
                        <p>ผลสรุปการประเมิน</p>
                    </div>
                </div>

                <hr className=' w-10/12 mx-auto border-gray-300' />

                <div className='bg-white hover:bg-blue-700 hover:text-white hover:font-bold mb-0 mr-0 mt-0 p-6 rounded-xl text-gray-700 text-center'>
                    <div className="flex justify-start ml-4 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12" />
                        </svg>
                        <p>ประเมินเสร็จสิ้น</p>
                    </div>
                </div>

                <hr className=' w-10/12 mx-auto border-gray-300' />

                <Link to='/showdetailcanceled_request'>
                    <div className='bg-white hover:bg-blue-700 hover:text-white hover:font-bold mb-0 mr-0 mt-0 p-6 rounded-xl text-gray-700 text-center'>
                        <div className="flex justify-start ml-4 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <p>คำขอที่ยกเลิก</p>
                        </div>
                    </div>
                </Link>

                <hr className=' w-10/12 mx-auto border-gray-300' />

                <Link to='/showdetailrejected_request'>
                    <div className='bg-white hover:bg-blue-700 hover:text-white hover:font-bold mb-0 mr-0 mt-0 p-6 rounded-xl text-gray-700 text-center'>
                        <div className="flex justify-start ml-4 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <p>คำขอที่โดนปฎิเสธ</p>
                        </div>
                    </div>
                </Link>


            </div>

            <div className='bg-white m-4 mr-0 rounded-xl p-6 text-gray-700 text-center hover:bg-red-800 hover:text-white' onClick={handleLogout}>
                <div className="flex justify-center items-center space-x-2">
                    <p className="font-bold ">ออกจากระบบ</p>
                </div>
            </div>



        </div >
    );
};

export default NavbarAdminFunctions;
