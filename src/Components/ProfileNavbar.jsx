import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function ProfileNavbar() {
  const navigate = useNavigate()

  function handleLogOut(){
    localStorage.removeItem("token")
    toast("Logged Out", {type:"info"})
    navigate('/')
  }
  
  return (
    <div className="sticky top-0 z-50 opacity-80 bg-zinc-900 text-white border-b-2 border-cyan-700">
      <nav className="container w-11/12 mx-auto py-2 flex items-center justify-between">
      <Link to="/" className="text-2xl items-center font-bold hover:text-cyan-600">
        <i class="fas fa-code"></i> DevConnector
        </Link>
        <div className="flex gap-10 text-l font-bolder">
          <Link to="/profiles" className="hover:text-cyan-600">
            Developers
          </Link>
          <Link to="/posts" className="hover:text-cyan-600">
            Posts
          </Link>
          <Link to="/dashboard" className="hover:text-cyan-600">
            <i className="fa-solid fa-user"></i> Dashboard
          </Link>
          <button onClick={handleLogOut} className=" hover:text-cyan-600">
            <i className="fa-solid fa-right-from-bracket"></i> Log Out
          </button>
        </div>
      </nav>
    </div>
  );
}

export default ProfileNavbar;