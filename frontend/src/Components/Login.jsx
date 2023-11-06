import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminProfileAction, loginAdmin } from "../Redux/actions/authActions";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import "./login.css";
import Swal from "sweetalert2";

import { http } from "../../config/axiosConfig";

const Login = () => {
  const navigate = useNavigate();

  const [data, setData] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  function handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();

      login();
    }
  }

  //password show
  const togglePasswordVisiblity = () => {
    setShowPassword(!showPassword);
  };
  const login = async () => {
    await http
      .post("user/login", data)
      .then((res) => {
        console.log(res.data.data)
        if (res.data?.data.role == "Admin") {
          navigate("/dashboard");
          localStorage.setItem("adminInfo", JSON.stringify(res.data?.data));

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Login Successfully",
            showConfirmButton: false,
            timer: 1000,
          }).then(
            () => {
              // Reload the dashboard after the SweetAlert message is closed
              window.location.reload();
            }
          );
        }
      })
      .catch((er) => {
        Swal.fire({
          icon: "error",
          title:
            er.response && er.response.data.message
              ? er.response.data.message
              : er.message,
          text: "Please Check!",
        });
      });
  };

  return (
    <section class="section ">
      <div class="d-flex flex-wrap align-items-stretch mt-0">
        <div class="col-lg-4 col-md-6 col-12 order-lg-1 order-2 loginsied_bg text-center d-flex align-itmes-center">
          <div class="w-100 text-white d-flex flex-column align-tiems-center juctify-content-center">
            <img
              src="/assets/logo.png"
              alt="logo"
              class="  mb-5 mt-5 mx-auto"
              style={{ width: "191px" }}
            />
            <h4 class="text-white font-weight-normal">
              Welcome to <span class="font-weight-bold">Demo</span>
            </h4>
            <p class="text-light">Before you get started, you must login.</p>
            <div>
              <div class="form-group">
                <label for="email" className="text-white">Email</label>
                <input
                  id="email"
                  type="email"
                  class="form-control"
                  name="email"
                  value={data?.email}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  tabIndex="1"
                  required=""
                  autoFocus=""
                />
                <div class="invalid-feedback">Please fill in your email</div>
              </div>

              <div class="form-group" style={{ position: "relative" }}>
                <div class="d-block">
                  <label for="password" class="control-label text-white">
                    Password
                  </label>
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  class="form-control"
                  name="password"
                  value={data?.password}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  tabIndex="2"
                  required=""
                  autoFocus=""
                />
                <i
                  onClick={togglePasswordVisiblity}
                  className={
                    showPassword
                      ? "fa fa-eye customClass"
                      : "fa fa-eye-slash customClass"
                  }
                  aria-hidden="true"
                ></i>
                <div class="invalid-feedback">please fill in your password</div>
              </div>

              {/* <div class="form-group">
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    name="remember"
                    class="custom-control-input"
                    tabindex="3"
                    id="remember-me"
                  />
                  <label class="custom-control-label" for="remember-me">
                    Remember Me
                  </label>
                </div>
              </div> */}

              <div class="form-group text-center">
                {/* <Link to={"/forgot"} className="float-left mt-3">
                  Forgot Password?
                </Link> */}
                <button
                 
                  onClick={login}
                  type="submit"
                  class="btn btn-white btn-lg btn-icon icon-right"
                  tabindex="4"
                >
                  Login
                </button>

                {/* <Link to={"/Signup"} className="nav-link "  class="btn btn-white btn-lg btn-icon icon-right">
              
                <span>Signup</span>
              </Link> */}
              </div>

              {/* <div class="mt-5 text-center">
                Don't have an account?{" "}
                <Link to={"/signUp"}>Create new one</Link>
              </div> */}
            </div>

            {/* <div class="text-center mt-5 text-small mb-auto">
            <a href="https://www.cqlsys.com/" target="_blank" className="text-white">
                Copyright © CQLSYS. 
              </a>
             Made with by Darling
              <div class="mt-2">
                <a href="#">Privacy Policy</a>
                <div class="bullet"></div>
                <a href="#">Terms of Service</a>
              </div>
            </div> */}
          </div>
        </div>
        <div
          class="col-lg-8 col-md-6 col-12 order-md-2 order-1 logrside_bgimg"
        >
          <div class="absolute-bottom-left index-2">
            <div class="text-light p-md-5 p-3 pb-2">
              <div class="">
                <h1 class="mb-0 display-4 font-weight-bold">Demo</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Login;
