import React from 'react'
import { Link } from 'react-router-dom';
import Background from '../../img/Background.svg';
import Navbar from '../Navbar/NavbarUser';
import State01_ShowStatusForm from './State01 StatusForm/State01_ShowStatusForm';

export default function Homepage_User() {

  const BackgroundImage = {
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  return (
    <div className="bg-fixed min-w-screen min-h-screen" style={BackgroundImage}>
      <Navbar />

      <div className="grid grid-cols-12 pt-20 content-start">
{/* 
        <div className="bg-white flex justify-around items-center col-span-10 col-start-2 p-10 rounded-2xl shadow-md ">

          <Link to="/basic_information" className="flex flex-col items-center col-span-3">
            <img src={Icon_SentRequest} alt="icon1" className="h-24" />
            <span className="font-bold text-center">ส่งคำขอเปิดหลักสูตร</span>
          </Link>

          <Link to="/basic_information" className="col-span-3">
            <div className="flex flex-col items-center justify-center bg-white text-gray-600 hover:bg-blue-600 hover:text-white p-5 rounded-2xl mr-2">
              <img src={Icon_SentRequest} alt="icon1" className="h-24" />
              <h5 className='mt-0'>ส่งคำขอเปิดหลักสูตร</h5>
            </div>
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
        </div> */}

      </div>

      <State01_ShowStatusForm />

    </div>
  )
}
