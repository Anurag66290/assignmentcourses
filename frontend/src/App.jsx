import { useState } from "react";
import "./App.css";
import { Dashboard } from "../src/Components/Dashboard";
import { Routes, Route } from "react-router-dom";
import Login from "../src/Components/Login";
import AdminLayout from "./Components/AdminLayout";
import AdminProfile from "./Components/screens/AdminProfile";
import NotFound from "./Components/screens/NotFound";
import Loader from "./Components/Loader";
import Empty from "./Components/screens/Empty";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Components/NavBar";
import UserTable from "./Components/screens/user/UserTable";
import UserView from "./Components/screens/user/UserView";
import UserAdd from "./Components/screens/user/UserAdd";
import UserEdit from "./Components/screens/user/UserEdit";
import CourseTable from "./Components/screens/Course/CourseTable";
import TestTable from "./Components/screens/Test/TesrTable";
import CourseReport from "./Components/screens/Report/CourseReport";
import TestReport from "./Components/screens/Report/TestReport";
import Signup from "./Components/signup";


function App() {
  return (
    <>
      <Routes>
        <Route index element={<Login />} />
        <Route index path="/Signup" element={<Signup />} />


        <Route path="/loader" element={<Loader />} />
        <Route path="/empty" element={<Empty />} />

        <Route path="/oldNav" element={<Navbar />} />

        <Route path="/" element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/adminProfile" element={<AdminProfile />} />

          <Route path="/usertable" element={<UserTable />} />
          <Route path="/UserView/:id" element={<UserView />} />
          <Route path="/UserAdd" element={<UserAdd />} />
          <Route path="/UserEdit/:id" element={<UserEdit />} />
          
          <Route path="/CourseTable" element={<CourseTable />} />
          <Route path="/TestTable" element={<TestTable />} />

          
          <Route path="/CourseReport" element={<CourseReport />} />
          <Route path="/TestReport" element={<TestReport />} />

          
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
