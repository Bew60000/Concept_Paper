import React from 'react'
import { Link } from 'react-router-dom';
import Background from '../../img/Background.svg';
import Navbar from '../Navbar/NavbarAdmin';

import ShowFormRequestForm from './ShowFormRequestForm';

export default function Homepage_Admin() {

  const BackgroundImage = {
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  return (
    <div className="bg-fixed min-w-screen min-h-screen" style={BackgroundImage}>
      <Navbar />
     
        <div className="flex items-center justify-center p-5 grid grid-cols-12 pt-20">
          <div className="bg-white flex justify-around items-center col-span-10 col-start-2 p-10 rounded-2xl rounded-bl-none rounded-br-none shadow-md mb-0">

            <Link to="/showuserdata" className="flex flex-col items-center col-span-3">
              <img src="/path/to/icon1.svg" alt="icon1" className="mb-4" />
              <span className="font-bold text-center">สมาชิกผู้ใช้งาน</span>
            </Link>

            <div className="border-r border-gray-300 h-20"></div>

            <Link to="" className="flex flex-col items-center col-span-10">
              <img src="/path/to/icon2.svg" alt="icon2" className="mb-4" />
              <span className="font-bold text-center">ยังไม่ทดสอบ</span>
            </Link>

            <div className="border-r border-gray-300 h-20"></div>

            <Link to="" className="flex flex-col items-center col-span-10">
              <img src="/path/to/icon3.svg" alt="icon3" className="mb-4" />
              <span className="font-bold text-center">ยังไม่ทดสอบ</span>
            </Link>

          </div>

          <div className="bg-white flex justify-around items-center col-span-10 col-start-2 p-1 shadow-md">
            <div className="w-11/12 border-t border-gray-300"></div>
          </div> {/* เส้นแบ่งแนวนอน */}

          <div className="bg-white flex justify-around items-center col-span-10 col-start-2 p-10 rounded-2xl rounded-tl-none rounded-tr-none shadow-md ">

            <Link to="/request_open_course" className="flex flex-col items-center col-span-3">
              <img src="/path/to/icon1.svg" alt="icon1" className="mb-4" />
              <span className="font-bold text-center">ยังไม่ทดสอบ</span>
            </Link>

            <div className="border-r border-gray-300 h-20"></div>

            <Link to="" className="flex flex-col items-center col-span-10">
              <img src="/path/to/icon2.svg" alt="icon2" className="mb-4" />
              <span className="font-bold text-center">ยังไม่ทดสอบ</span>
            </Link>

            <div className="border-r border-gray-300 h-20"></div>

            <Link to="" className="flex flex-col items-center col-span-10">
              <img src="/path/to/icon3.svg" alt="icon3" className="mb-4" />
              <span className="font-bold text-center">ยังไม่ทดสอบ</span>
            </Link>

          </div>
        </div>
      
      <ShowFormRequestForm />
    </div >

  )
}
