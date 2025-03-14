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

      <State01_ShowStatusForm />

    </div>
  )
}
