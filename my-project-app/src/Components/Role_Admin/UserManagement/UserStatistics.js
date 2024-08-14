import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../Navbar/NavbarAdmin';

const UserStatistics = () => {
    const [userData, setUserData] = useState({
        users: 0,
        directors: 0,
        admins: 0,
        total: 0,
    });

    useEffect(() => {
        axios.get('https://sheet.best/api/sheets/3feab3e0-5ebe-4337-8133-894169c2ac60')
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

    return (
        <div className="flex items-center justify-center grid grid-cols-12 gap-4 p-5 pt-20">

            <div className="bg-white col-span-2 col-start-2 p-5 py-12 border-2 rounded-2xl">
                <h3 className='text-center text-gray-600'>จำนวน User: {userData.users} คน</h3>
            </div>

            <div className="bg-white col-span-2 p-5 py-12 border-2 rounded-2xl">
                <h3 className='text-center text-gray-600'>จำนวน Director: {userData.directors} คน</h3>
            </div>

            <div className="bg-white col-span-2 p-5 py-12 border-2 rounded-2xl">
                <h3 className='text-center text-gray-600'>จำนวน Admin: {userData.admins} คน</h3>
            </div>

            <div className="bg-white col-span-4 p-5 py-12 border-2 rounded-2xl">
                <h3 className='text-center text-gray-600'>จำนวนผู้คนทั้งหมดในระบบ: {userData.total} คน</h3>
            </div>

        </div>
    );
};

export default UserStatistics;
