import React from 'react';


const Navbar = () => {
    return (
        // <div className='bg-white grid grid-cols-4 h-14 text-center place-items-center mb-10'>
            
        //         <p>5555</p>
        //         <p>5555</p>
        //         <p>5555</p>
        //         <p>5555</p>

            
        // </div>

        <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-24">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <img className="h-16 w-25 mt-4" src="logo192.png" alt="Logo" />
                            </div>
                            <nav className="ml-10 flex items-center space-x-4">
                                <a href="#" className="text-gray-900">Current</a>
                                <a href="#" className="text-gray-900">Archives</a>
                                <a href="#" className="text-gray-900">Announcements</a>
                                <a href="#" className="text-gray-900">Author Guidelines</a>
                                <a href="#" className="text-gray-900">About</a>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>

    );
};

export default Navbar;
