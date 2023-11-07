import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import { http } from "../../config/axiosConfig";
import "./login.css";

const Signup = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "", // Set the default role as 'User'
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const signup = async () => {
    try {
      const response = await http.post("user/sign_up", data);
      const { message, data: userData } = response.data;

      if (message === "Registered successfully") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Signup Successfully",
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          navigate("/");
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title:
          error.response && error.response.data.message
            ? error.response.data.message
            : "Error during signup",
        text: "Please Check!",
      });
    }
  };

  return (
    <section className="section">
      <div className="d-flex flex-wrap align-items-stretch mt-0">
        <div className="col-lg-4 col-md-6 col-12 order-lg-1 order-2 loginsied_bg text-center d-flex align-itmes-center">
          <div className="w-100 text-white d-flex flex-column align-tiems-center justify-content-center">
            <img
              src="/assets/logo.png"
              alt="logo"
              className="mb-5 mt-5 mx-auto"
              style={{ width: "191px" }}
            />
            <h4 className="text-white font-weight-normal">
              Welcome to <span className="font-weight-bold">Demo</span>
            </h4>
            <p className="text-light">Before you get started, sign up.</p>

            <div>
              <form>
                <div className="form-group">
                  <label htmlFor="name" className="text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group" style={{ position: "relative" }}>
                  <label htmlFor="password" className="control-label text-white">
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    required
                  />
                  <i
                    onClick={togglePasswordVisibility}
                    className={
                      showPassword
                        ? "fa fa-eye customClass"
                        : "fa fa-eye-slash customClass"
                    }
                    aria-hidden="true"
                  ></i>
                </div>

                <div className="form-group">
                  <label htmlFor="role" className="text-white">
                    Role
                  </label>
                  <select
                    className="form-control"
                    name="role"
                    value={data.role}
                    onChange={handleChange}
                  >
                    <option value="">Seleted Role</option>
                    <option value="Admin">Admin</option>
                    <option value="Manager-1">Manager-1</option>
                    <option value="Manager-2">Manager-2</option>
                    <option value="User">User</option>
                    {/* Add more role options if needed */}
                  </select>
                </div>

                <div className="form-group text-center">
                  <button
                    type="button"
                    onClick={signup}
                    className="btn btn-white btn-lg btn-icon icon-right"
                  >
                    Signup
                  </button>
                  <Link to={"/"} className="nav-link "  class="btn btn-white btn-lg btn-icon icon-right">
              
              <span>Login</span>
            </Link>
                  
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Your existing JSX for the right side */}
        {/* ... */}
      </div>
    </section>
  );
};

export default Signup;
