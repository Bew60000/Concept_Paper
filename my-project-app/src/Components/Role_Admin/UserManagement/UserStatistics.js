import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';

import Navbar from '../../Navbar/NavbarAdmin';
import NavbarAdminFunctions from '../../Navbar/NavbarAdminFunctions';

import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
Chart.register(ArcElement, Tooltip, Legend);



const UserStatistics = () => {
    const [userData, setUserData] = useState({
        users: 0,
        directors: 0,
        admins: 0,
        total: 0,
    });

    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            setUserInfo(JSON.parse(loggedInUser));
        }
    }, []);

    useEffect(() => {
        // Destroy chart if it already exists to avoid the canvas in use error
        return () => {
            if (Chart.getChart('canvas-id')) {
                Chart.getChart('canvas-id').destroy();
            }
        };
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/getinfo_user/all')
            .then(response => {
                const data = response.data;
                const users = data.filter(item => item.position === 'User').length;
                const directors = data.filter(item => item.position === 'Director').length;
                const admins = data.filter(item => item.position === 'Admin').length;
                const total = data.length;

                setUserData({
                    users: users,
                    directors: directors,
                    admins: admins,
                    total: total,
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const pieData = {
        labels: ['Admin', 'User', 'Director'],
        datasets: [
            {
                label: 'จำนวนผู้ใช้',
                data: [userData.admins, userData.users, userData.directors],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    const pieOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'bottom', // ตำแหน่ง Legend ใต้กราฟ
                align: 'start', // จัดเรียง Legend จากซ้ายไปขวา
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        const label = tooltipItem.label || '';
                        const value = tooltipItem.raw || 0;
                        return `${label}: ${value} คน`;
                    }
                }
            }
        }
    };

    return (
        <div className="">
            <Navbar />

            <div className='bg-white m-4 mr-0 mt-0 border-2 rounded-xl p-6 text-gray-700 text-center'>
                {userInfo ? (
                    <div className="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-32 text-blue-900">
                            <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clip-rule="evenodd" />
                        </svg>
                        <h4 className='m-1'>{userInfo.name} {userInfo.lastname}</h4>
                        <p className="text-sm m-0 mt-1">{userInfo.affiliation}</p>
                        <p className="text-sm m-0">วิทยาเขต{userInfo.campus}</p>
                    </div>
                ) : (
                    <p>Loading user info...</p>
                )}

            </div>

            {/* <div className="bg-white m-4 mt-0 p-8 border-2 rounded-2xl" style={{ minHeight: '200px' }}>
                <p className='text-center text-gray-600'>จำนวนผู้คนทั้งหมดในระบบ</p>
                <h3 className='text-center text-gray-600'>"{userData.total} คน"</h3>
            </div>

            <div className="bg-white m-4 p-8 border-2 rounded-2xl" style={{ minHeight: '200px' }}>
                <p className='text-center text-gray-600'>จำนวน Admin: {userData.admins} คน</p>
                <p className='text-center text-gray-600'>จำนวน User: {userData.users} คน</p>
                <p className='text-center text-gray-600'>จำนวน Director: {userData.directors} คน</p>
            </div> */}

            <div className="bg-white m-4 mt-0 mr-0 p-4 border-2 rounded-2xl">
                <h3 className='text-center text-gray-600 mb-4'>จำนวนผู้ใช้งาน</h3>
                <Pie data={pieData} options={pieOptions} />
                <p className='text-center font-bold text-gray-700 mt-3 mb-3'>"รวมทั้งหมด {userData.total} คน"</p>
            </div>

            {/* <NavbarAdminFunctions /> */}
        </div>
    );
};

export default UserStatistics;
