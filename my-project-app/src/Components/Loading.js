import React from 'react'
// import logo from './img/psumooc-logoDashboard-White.svg';

function Loading() {


    return (
        <div className="flex justify-center items-center min-h-9 bg-white">

            {/* <img src={logo} className='scale-50 flex space-x-2 animate-pulse' /> */}

            <div className="flex space-x-2 animate-pulse">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <div className="w-4 h-4 bg-blue-700 rounded-full"></div>
                <div className="w-4 h-4 bg-blue-900 rounded-full"></div>
            </div>


        </div>
    )
}

export default Loading