import { Route, Routes } from "react-router";
import AddEducation from "./Layout/AddEducation";
import AddExperience from "./Layout/AddExperience";
import CreateProfile from "./Layout/CreateProfile";
import Dashboard from "./Layout/Dashboard";
import EditProfile from "./Layout/EditProfile";
import Home from "./Layout/Home";
import Login from "./Layout/Login";
import NoPage from "./Layout/NoFund";
import Posts from "./Layout/Posts";
import Profiles from "./Layout/Profiles";
import Register from "./Layout/Register";
import SinglePost from "./Layout/SinglePost";
import UserProfile from "./Layout/UserProfile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profiles" element={<Profiles />} />
      <Route path="/profile/:id" element={<UserProfile />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create-profile" element={<CreateProfile />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route path="/add-experience" element={<AddExperience />} />
      <Route path="/add-education" element={<AddEducation />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/posts/:postId" element={<SinglePost />} />
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
}

export default App;