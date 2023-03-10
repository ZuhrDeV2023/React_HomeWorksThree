import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

const Home = () => {

  const navigate = useNavigate()

  useEffect(()=>{
    let token = localStorage.getItem("token")
    if(token) navigate('/dashboard')
  },[])
  
  return (
    <div className="landingPage min-h-screen">
      <div className="blackCover">
        <Navbar />
        <div className="absolute inset-0 grid place-items-center">
            <Box className="text-white flex flex-col  items-center justify-between">
              <h1 className="text-6xl font-bold ">Developer Connector</h1>
              <p className="text-lg py-4"> Create a developer profile/portfolio, share posts and get help from other developers</p>
              <div className="flex gap-2">
                <Link className="button rounded opacity-90 py-1 px-3 align-center text-white bg-cyan-600" to="register">
                  Sign Up
                </Link>
                <Link className="button rounded bg-gray-300 text-black py-1" to="login">
                  Log In
                </Link>
              </div>
            </Box>
        </div>
      </div>
    </div>
  );
};

export default Home;