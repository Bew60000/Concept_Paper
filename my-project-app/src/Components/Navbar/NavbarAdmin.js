import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoIcon from '../../img/Logo_White.svg';

const NavbarAdmin = () => {
  const navigate = useNavigate();

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
    <nav className="fixed top-0 left-0 right-0 bg-gray-800 z-50 items-center">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">

          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            {/* <div className="flex-shrink-0">
              <img className="h-12 w-12" src={LogoIcon} alt="Your Logo" />
            </div> */}

            <a href='/homepage_admin' >
              <div className="flex-shrink-0">
                <img className="h-12 w-12" src={LogoIcon} alt="Your Logo" />
              </div>
            </a>

            <div className="hidden sm:flex sm:ml-6 items-center">
              <div className="flex space-x-4">
                {/* <a href="/homepage_admin" className="text-gray-300 hover:bg-gray-700 hover:text-white hover:font-bold px-3 py-2 rounded-md text-sm font-medium">หน้าหลัก</a> */}
                {/* <a href="/show_user_data" className="text-gray-300 hover:bg-gray-700 hover:text-white hover:font-bold px-3 py-2 rounded-md text-sm font-medium">จัดการสมาชิก</a> */}
                {/* <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Services</a> */}
                {/* <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</a> */}
              </div>
            </div>
          </div>

          {/* <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            <button
              onClick={handleLogout}
              className="bg-gray-500 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-red-600"
            >
              logout
            </button>
          </div> */}

        </div>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
