import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoIcon from '../../img/Logo_White.svg';

const Navbar = () => {
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
            <div className="flex-shrink-0">
              <img className="h-12 w-12" src={LogoIcon} alt="Your Logo" />
            </div>
            
          </div>

          

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
