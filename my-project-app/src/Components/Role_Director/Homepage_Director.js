import React from 'react'
import Background from '../../img/Background.svg';
import Navbar from '../Navbar/NavbarDirector';

export default function Homepage_Director() {

    const BackgroundImage = {
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }

  return (
    <div className="bg-fixed min-w-screen min-h-screen" style={BackgroundImage}>
      <Navbar />
      <div className='pt-20'>
      <div className="flex items-center justify-center grid grid-cols-12 auto-rows-auto p-5">
            <div className="bg-white col-span-10 col-start-2 p-20 border-2 rounded-2xl w-Screen">
                <h1 className='text-center p-10 m-10'>Director</h1>
            </div>
        </div>
      </div>


    </div>
  )
}
