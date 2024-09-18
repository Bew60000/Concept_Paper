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

    return (
        <div className="">
            {/* <div className="flex flex-col md:grid md:grid-cols-12 gap-4 p-5 pt-20 pb-0">
                <div className="bg-white md:col-span-2 md:col-start-2 p-5 py-12 border-2 rounded-2xl">
                    <h3 className='text-center text-gray-600'>จำนวน User: {userData.users} คน</h3>
                </div>

                <div className="bg-white md:col-span-2 p-5 py-12 border-2 rounded-2xl">
                    <h3 className='text-center text-gray-600'>จำนวน Director: {userData.directors} คน</h3>
                </div>

                <div className="bg-white md:col-span-2 p-5 py-12 border-2 rounded-2xl">
                    <h3 className='text-center text-gray-600'>จำนวน Admin: {userData.admins} คน</h3>
                </div>

                <div className="bg-white md:col-span-4 p-5 py-12 border-2 rounded-2xl">
                    <h3 className='text-center text-gray-600'>จำนวนผู้คนทั้งหมดในระบบ: {userData.total} คน</h3>
                </div>
            </div> */}


            {/* <div className="bg-white w-full p-5 py-12 border-2 rounded-2xl">
                <p className='text-center text-gray-600'>จำนวน User: {userData.users} คน</p>
            </div>

            <div className="bg-white p-5 py-12 border-2 rounded-2xl">
                <p className='text-center text-gray-600'>จำนวน Director: {userData.directors} คน</p>
            </div>

            <div className="bg-white p-5 py-12 border-2 rounded-2xl">
                <p className='text-center text-gray-600'>จำนวน Admin: {userData.admins} คน</p>
            </div>

            <div className="bg-white p-5 py-12 border-2 rounded-2xl">
                <p className='text-center text-gray-600'>จำนวนผู้คนทั้งหมดในระบบ: {userData.total} คน</p>
            </div> */}

            <div className="bg-white col-span-2 col-start-10 m-4 mt-0 p-8 border-2 rounded-2xl" style={{ minHeight: '200px' }}>
                <h3 className='text-center text-gray-600'>จำนวน User: {userData.users} คน</h3>
            </div>

            <div className="bg-white col-span-2 col-start-10 m-4 p-8 border-2 rounded-2xl" style={{ minHeight: '200px' }}>
                <p className='text-center text-gray-600'>จำนวน Director: {userData.directors} คน</p>
            </div>

            {/* <div className="bg-white col-span-2 col-start-10 m-4 p-8 border-2 rounded-2xl" style={{ minHeight: '200px' }}>
                <p className='text-center text-gray-600'>จำนวน Admin: {userData.admins} คน</p>
            </div>

            <div className="bg-white col-span-2 col-start-10 m-4 p-8 border-2 rounded-2xl" style={{ minHeight: '200px' }}>
                <p className='text-center text-gray-600'>จำนวนผู้คนทั้งหมดในระบบ: {userData.total} คน</p>
            </div> */}


        </div>
    );
};

export default UserStatistics;
