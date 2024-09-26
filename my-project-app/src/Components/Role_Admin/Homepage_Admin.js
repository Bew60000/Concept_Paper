import React from 'react'
import { Link } from 'react-router-dom';
import Background from '../../img/Background.svg';
import Navbar from '../Navbar/NavbarAdmin';

import ShowFormRequestForm from './ShowFormRequestForm';

//Icon image
import Icon_Usermanagement from './Icon_img/Usermanagement.svg';

export default function Homepage_Admin() {

  const BackgroundImage = {
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  return (
    <div className="bg-fixed min-w-screen min-h-screen" style={BackgroundImage}>
      <Navbar />

      <div className="grid grid-cols-12 pt-20 content-start">
        {/* <div className="bg-white flex justify-around items-center col-span-10 col-start-2 p-10 rounded-2xl  shadow-md mb-0">

          <Link to="/show_user_data" className="flex flex-col items-center col-span-3">
            <img src={Icon_Usermanagement} alt="icon1" className="h-24" />
            <span className="font-bold text-center text-blue-900">สมาชิกผู้ใช้งาน</span>
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

        </div> */}       
      </div>

      <ShowFormRequestForm />
      
    </div >

  )
}
