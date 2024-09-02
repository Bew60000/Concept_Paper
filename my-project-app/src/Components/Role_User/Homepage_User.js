import React from 'react'
import { Link } from 'react-router-dom';
import Background from '../../img/Background.svg';
import Navbar from '../Navbar/NavbarUser';

//Icon image
import Icon_SentRequest from './Icon_img/SentRequest.svg';
import Icon_Search from './Icon_img/Search.svg';
import Icon_Status from './Icon_img/Status.svg';

import ShowStatusForm from './ShowStatusForm';

export default function Homepage_User() {

  const BackgroundImage = {
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  return (
    <div className="bg-fixed min-w-screen min-h-screen" style={BackgroundImage}>
      <Navbar />

      <div className="flex items-center justify-center p-5 grid grid-cols-12 pt-20">
        <div className="bg-white flex justify-around items-center col-span-10 col-start-2 p-10 rounded-2xl shadow-md ">

          <Link to="/basic_information" className="flex flex-col items-center col-span-3">
            <img src={Icon_SentRequest} alt="icon1" className="h-24" />
            <span className="font-bold text-center">ส่งคำขอเปิดหลักสูตร</span>
          </Link>

          <div className="border-r border-gray-300 h-20"></div>

          <Link to="" className="flex flex-col items-center col-span-10">
            <img src={Icon_Search} alt="icon2" className="h-24 " />
            <span className="font-bold text-center mt-2">ค้นหาหลักสูตร</span>
          </Link>

          <div className="border-r border-gray-300 h-20"></div>

          <Link to="" className="flex flex-col items-center col-span-10">
            <img src={Icon_Status} alt="icon3" className="h-24" />
            <span className="font-bold text-center">ติดตามสถานะ</span>
          </Link>
        </div>
      </div>

      <ShowStatusForm />

    </div>
  )
}
