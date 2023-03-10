import {
  Checkbox,
  FormControlLabel,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProfileNavbar from "../Components/ProfileNavbar";
import { addEducation } from "../store/slices/user";


// Style
import 'bootstrap/dist/css/bootstrap.min.css';

const AddEducation = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [values, setValues] = useState({
    school:"",
    degree:"",
    fieldofstudy:"",
    from:"",
    to:"",
  })


  async function handleInputChange(e){
    setValues(oldV =>({
      ...oldV,
      [e.target.name]: e.target.value
    }))
  }
  
  // DataPut  
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let {data} = await axios.put("api/profile/education", values)
      toast("Education Added Successfully", { type: "success" });
      dispatch(addEducation(data))
      navigate("/dashboard");
    } catch (error) {
      toast("Fill out the required fields", {type:"error"})
      console.log(error);
    }

  }

  return (
    <div>
      <ProfileNavbar />
      <form className="w-2/3 container mx-auto mt-10">
        <h2 className="text-6xl font-bold text-cyan-600">Add Education</h2>
        <p className="py-6 text-2xl font-semibold">
          <i className="fa-solid fa-graduation-cap pr-3"></i> 
          Add any school or bootcamp that you have attended 
        </p>
        <p className="pb-4 opacity-90">
          <span className="font-bold">*</span> = required field
        </p>
        <div className="flex flex-col gap-4">
          <TextField
            id="outlined-basic2"
            fullWidth
            type="text"
            placeholder="* School or Bootcamp"
            variant="filled"
            size="small"
            name="school"
            onChange={handleInputChange}
          />
          <TextField
            id="outlined-basic3"
            fullWidth
            type="text"
            size="small"
            placeholder="* Degree or Certification"
            variant="outlined"
            name="degree"
            onChange={handleInputChange}
          />
          <TextField
            id="outlined-basic4"
            fullWidth
            type="text"
            placeholder="* Field of Study"
            variant="outlined"
            size="small"
            name="fieldofstudy"
            onChange={handleInputChange}
          />
          <span className="flex flex-col">
            <label htmlFor="fromDate" className="py-2 font-bold"> * From Date </label>
            <TextField type="date" id="fromDate" name="from" onChange={handleInputChange}/>
          </span>
          <span className="flex items-center">
          <FormControlLabel control={<Checkbox />} id="Current" />
          <label htmlFor="Current">Current School</label>
          </span>
          <span className="flex flex-col">
            <label htmlFor="toDate" minRows={1} className="font-semibold">
              To Date
            </label>
            <TextField type="date" id="toDate" name="to" onChange={handleInputChange}/>
          </span>
          <TextareaAutosize minRows={1} className="w-100 py-1 px-3 border border-gray-600 p-2 rounded-md" placeholder="Program Description"/>
        </div>
        <button onClick={handleSubmit} type="submit" className="button mt-7 mr-7 mb-10 text-white bg-cyan-600">
          Submit
        </button>
        <Link to="/dashboard" className="button text-bold mt-4 bg-gray-300">
          Go Back
        </Link>
      </form>
    </div>
  );
};

export default AddEducation;