import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { adminProfileAction } from "../../Redux/actions/authActions";
import { http } from "../../../config/axiosConfig";
import Swal from "sweetalert2";
import "../login.css";

function ChangePassword() {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [infoData, setInfoData] = useState();

  const [showPassword, setShowPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const adminProfileInfo = useSelector((state) => state.adminProfileInfo);
  const { adminProfile, loading, error } = adminProfileInfo;
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  useEffect(() => {
    dispatch(adminProfileAction("adminProfile"));
  }, []);

  useEffect(() => {
    if (error) {
      Navigate("/");
    }
  }, [error]);
  const handleChange = (e) => {
    setInfoData({ ...infoData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (error) {
      Navigate("/");
    } else {
      http
        .put("/user/updatePassword", infoData, {
          headers: {
             authorization: `Bearer ${adminInfo?.token}` 
            },
        })
        .then((res) =>
          Swal.fire(
            "Password Changed",
            "Password Changed Successfully!",
            "success"
          )
        )
        .catch((er) =>
          Swal.fire({
            icon: "error",  
            title:
              er.response && er.response.data.message
                ? er.response.data.message
                : er.message,
            text: "Something went wrong!",
          })
        );
    }
  };
  const togglePasswordVisiblity = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisiblityOld = () => {
    setOldPassword(!oldPassword);
  };
  const togglePasswordVisiblityNew = () => {
    setNewPassword(!newPassword);
  };

  return (
    <div id="app">
      <section class="section">
        <div class="container mt-5">
          <div class="row">
            <div class="col-12">
             
              <div class="card card-primary">
                <div class="card-header">
                  <h4>Reset Password</h4>
                </div>

                <div class="card-body">
                  <form
                    method="POST"
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                  >
                    <div class="form-group" style={{ position: "relative" }}>
                      <label for="email">Old Password</label>
                      <input
                        id="password"
                        type={oldPassword ? "text" : "password"}
                        class="form-control pwstrength"
                        data-indicator="pwindicator"
                        name="oldPassword"
                        tabindex="2"
                        required
                      />
                      <i
                        onClick={togglePasswordVisiblityOld}
                        className={
                          oldPassword
                            ? "fa fa-eye customClass"
                            : "fa fa-eye-slash customClass"
                        }
                        aria-hidden="true"
                      ></i>
                    </div>

                    <div class="form-group" style={{ position: "relative" }}>
                      <label for="password">New Password</label>
                      <input
                        id="password"
                        type={newPassword ? "text" : "password"}
                        class="form-control pwstrength"
                        data-indicator="pwindicator"
                        name="newPassword"
                        tabindex="2"
                        required
                      />
                      <i
                        onClick={togglePasswordVisiblityNew}
                        className={
                          newPassword
                            ? "fa fa-eye customClass"
                            : "fa fa-eye-slash customClass"
                        }
                        aria-hidden="true"
                      ></i>
                      <div id="pwindicator" class="pwindicator">
                        <div class="bar"></div>
                        <div class="label"></div>
                      </div>
                    </div>

                    <div class="form-group" style={{ position: "relative" }}>
                      <label for="password-confirm">Confirm Password</label>
                      <input
                        id="password-confirm"
                        type={showPassword ? "text" : "password"}
                        class="form-control"
                        name="confirmPassword"
                        tabindex="2"
                        required
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
                    </div>

                    <div class="form-group">
                      <button
                        type="submit"
                        class="btn btn-primary btn-lg btn-block"
                        tabindex="4"
                      >
                        Reset Password
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ChangePassword;