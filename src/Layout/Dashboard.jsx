import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProfileNavbar from "../Components/ProfileNavbar";
import { addUser } from "../store/slices/user";


const Dashboard = () => {
  const [userData, setUserData] = useState([]);
  const [delEx, setDelEx] = useState(true);
  const [delEdu, setDelEdu] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((u) => u.user);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) navigate("/");

    async function getMe() {
      try {
        let { data } = await axios.get("api/profile/me");
        dispatch(addUser(data));
        setUserData(data);
      } catch (error) {
        console.log(error);
        setUserData(error);
      }
    }
    getMe();
  }, [delEx, delEdu]);

  async function handleDeleteExperience(id) {
    try {
      axios.delete(`api/profile/experience/${id}`);
      setDelEx(!delEx);
      toast("Experience Removed", { type: "info" });
    } catch (error) {
      toast("Something Went Wrong", { type: "error" });
      console.log(error);
    }
  }
  async function handleDeleteEducation(id) {
    try {
      axios.delete(`api/profile/education/${id}`);
      setDelEdu(!delEdu);
      toast("Education Removed", { type: "info" });
    } catch (error) {
      toast("Something Went Wrong", { type: "error" });
      console.log(error);
    }
  }

  function handleDeleteAcount() {
    let confirmation = confirm(
      "Are You Sure To Delete Your Account? \n Your data cannot be restored!"
    );
    if (confirmation) {
      toast("Your Account Was Deleted", { type: "info" });
      localStorage.removeItem("token");
      axios.delete("api/profile");
      navigate("/");
    }
  }
  return (
    <div>
      <ProfileNavbar />
      <div className="container w-2/4 mx-auto my-10">
        <h2 className="text-5xl font-bold text-cyan-600">Dashboard</h2>
        {userData?._id ? (
          <>
            <p className="py-7 text-2xl font-bolder">
              <i className="fa-solid fa-user pr-1"></i>Welcome  
              {" " + userData?.user ?. name}
            </p>
            <div className="flex gap-3 py-2">
              <Link to="/edit-profile" className="button text-sm hover:text-cyan-600 bg-gray-100">
                <i class="fas fa-user-circle text-lg text-cyan-600"></i> Edit Profile
              </Link>
              <Link to="/add-experience" className="button text-sm hover:text-cyan-600 bg-gray-100 ">
              <i class="fab fa-black-tie text-lg text-cyan-600"></i> Add Experience
              </Link>
              <Link to="/add-education" className="button text-sm hover:text-cyan-600 bg-gray-100">
              <i class="fas fa-graduation-cap text-lg text-cyan-600"></i> Add
                Education
              </Link>
            </div>
            <h3 className="py-8 text-3xl font-semibold">Experience Credentials</h3>
            <table className="table-auto bg-gray-100">
              <thead className="text-3xl border-b-2 border-white py-3">
                <tr className="text-xl text-bold">
                  <th className="py-3 px-3 border-r-2 border-white border-b-4">Company</th>
                  <th className="py-3 px-4 border-r-2 border-white border-b-4">Title</th>
                  <th className="py-3 px-4 border-r-2 border-white border-b-4">Years</th>
                  <th>
                    
                  </th>
                </tr>
              </thead>
              <tbody>
                {userData?.experience?.length > 0
                  ? userData?.experience?.map?.((exp) => (
                      <tr key={crypto.randomUUID()}>
                        <td className="text-lg p-3 border-r-2 border-white border-b-2">
                          {exp?.company ? exp?.company : "No Information"}
                        </td>
                        <td className="text-lg p-3 border-r-2 border-white border-b-2">
                          {exp?.title ? exp?.title : "No Information"}
                        </td>
                        <td className="text-lg p-3 border-r-2 border-white border-b-2">
                          {exp?.from
                            ? moment(exp?.from).utc().format("DD-MM-YYYY")
                            : ""}
                          -
                          {exp?.to
                            ? moment(exp?.to).utc().format("DD-MM-YYYY")
                            : "Now"}
                        </td>
                        <td>
                          {exp?.company ? (
                            <button onClick={() => handleDeleteExperience(exp?._id)} className="button bg-red-600 text-white">
                              Delete
                            </button> ) : ("")
                          }
                        </td>
                      </tr> )) : ""}
              </tbody>
            </table>
            <h3 className="py-8 text-3xl font-semibold"> Education Credentials</h3>
            <table className="table-auto text-l bg-gray-100">
              <thead className="text-bold border-b-2 border-white py-3">
                <tr>
                  <th className="py-3 px-4 border-r-2 border-white border-b-2">School</th>
                  <th className="py-3 px-4 border-r-2 border-white border-b-2">Degree</th>
                  <th className="py-3 px-4 border-r-2 border-white border-b-2">Years</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {userData?.education?.length > 0
                  ? userData?.education?.map?.((edu) => {
                      return (
                        <tr key={crypto.randomUUID()}>
                          <td className="text-sm p-2 border-r-2 border-b-2 border-white">
                            {edu?.school ? edu?.school : "No Information"}
                          </td>
                          <td className="text-sm p-3 border-r-2 border-white border-b-2">
                            {edu?.degree ? edu?.degree : "No Information"}
                          </td>
                          <td className="text-sm p-3 border-r-2 border-white border-b-2">
                            {edu?.from
                              ? moment(edu?.from).utc().format("DD-MM-YYYY")
                              : " "}
                            -
                            {edu?.to
                              ? moment(edu?.to).utc().format("DD-MM-YYYY")
                              : "Now"}
                          </td>
                          <td>
                            {edu?.school ? (
                              <button onClick={() => handleDeleteEducation(edu?._id)} className="button bg-red-600 text-white">
                                Delete
                              </button> ) : ("")}
                          </td>
                        </tr>
                      );
                    }) : ""}
              </tbody>
            </table>
            <button onClick={handleDeleteAcount} className="text-sm button bg-red-600 text-white mt-8">
              <i className="fa-solid fw-sm fa-user-slash"></i> Delete My Account
            </button>
          </>
        ) : (
          <>
            <p className="text-xl pt-5 pb-7">No profile found. Do you want to create a profile?</p>
            <Link to="/create-profile" className="button bg-cyan-600 text-white">Create Profile</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;