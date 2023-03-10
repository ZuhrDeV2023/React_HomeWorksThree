import React from 'react'
import Navbar from '../Components/Navbar'
import ProfileNavbar from '../Components/ProfileNavbar'

const NoPages = () => {

    let token = localStorage.getItem("token")
    
  return (
    <div>
      {token ? <ProfileNavbar /> : <Navbar />}
      <div className="container w-2/4 mx-auto mt-10">
        <h1 className="text-6xl font-bold text-cyan-600">
          <i className="fa-solid fa-warning"></i> Page Not Found
        </h1>
        <p className='pt-5 text-4xl font-semibold'>Sorry, this page does not exist</p>
      </div>
    </div>
  );
}

export default NoPages
