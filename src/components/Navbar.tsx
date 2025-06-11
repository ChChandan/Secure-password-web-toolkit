import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
        <div className=' bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col justify-center p-4'>
          
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-6">
                        <div className="flex items-center">
                            <span className="text-xl font-bold text-gray-800">Secure Password Toolkit</span>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-16">
                                <Link to="/" className="text-gray-600  hover:text-blue-700">Password Strenght</Link>
                                <Link to="/HaveIbeenPawned" className="text-gray-600 hover:text-blue-700 ">Was I compromised ?</Link>
                                <Link to="/PasswordGenerator" className="text-gray-600 hover:text-blue-700">Password generator</Link>
                               
                            </div>
                        </div>
                    </div>
                </div>
           
        </div>
      
    </div>
  )
}

export default Navbar
