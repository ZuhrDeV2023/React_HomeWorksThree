import { TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../Components/Navbar";

const Login = () => {
  
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  },[]);

  function handleInputChange(e) {
    setValues((oldValues) => ({
      ...oldValues,
      [e.target.name]: e.target.value,
    }));
  }

  
  async function handleLogin(e) {
    e.preventDefault();

    try {
      let { data } = await axios.post("/api/auth", values);
      let { token } = data;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["x-auth-token"] = `${token}`;
      toast("Logged In Successflly", { type: "success" });
      navigate("/dashboard");
    } catch (error) {
      toast(error.response.data.errors[0].msg, { type: "error" });
    }
  }

  return (
    <div>
      <Navbar />
      <form onSubmit={handleLogin} className="w-2/3 container mx-auto mt-10">
        <h2 className="text-6xl font-bold text-cyan-600">Sign In</h2>
        <p className="py-6 text-2xl font-semibold">
          <i className="fa-solid fa-user pr-3"></i>Sign In To Your Account
        </p>
        <div className="flex flex-col gap-4">
          
            <TextField
              id="outlined-basic2"
              name="email"
              fullWidth
              size="small"
              type="email"
              placeholder="Email Address"
              variant="outlined"
              value={values.email}
              color="success"
              onChange={handleInputChange}
            />
          <TextField
            id="outlined-basic3"
            fullWidth
            name="password"
            type="password"
            size="small"
            placeholder="Password"
            variant="outlined"
            value={values.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="button mt-4 py-2 text-white bg-cyan-600">
          Log In
        </button>
        <p className="text-lg mt-3">
          Don't have an account yet?{" "}
          <Link className="text-cyan-600" to="/register">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
