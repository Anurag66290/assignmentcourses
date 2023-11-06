import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { adminLogoutAction } from "../Redux/actions/authActions";
import classNames from "classnames";
import { http } from "../../config/axiosConfig";
import avatar from "../Components/images/placeHolderImg.jpg";
import Swal from "sweetalert2";

function Navbar() {
  const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));
  // console.log(adminInfo,"admininfo==================")
  const [adminProfile, setAdminProfile] = useState();

  const navigate = useNavigate();

  const handleLogout = () => {
    // e.preventDefault();
    http("/user/logout", {
      headers: {
        authorization: `Bearer ${adminInfo.token}`,
      },
    }).then((res) => {
      // console.log("=============================");
      if (res.data) {
        localStorage.removeItem("adminInfo");
        localStorage.clear();
        navigate("/");
      }
    });
  };

  const logoutAlert = () => {
    Swal.fire({
      title: "Are you sure?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#E91E63",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleLogout();
        // userdelete(id)
        // getdata()
      }
    });
  };

  var ID = "63edc5970e0638cc6986a00f";

  // console.log(adminInfo?.token, '=ddddddddddddddddddddddddddddddddddddddddddddddd')
  const profile = () => {
    http
      .get(`/user/adminProfile`, {
        headers: { authorization: `Bearer ${adminInfo?.token}` },
      })
      .then((res) => {
        // console.log(res.data.body, '==========================')
        setAdminProfile(res.data.body);
      })
      .catch((err) => {
        console.log(err.message);
        if (err.response.data.code == 403) {
          navigate("/");
          localStorage.clear();
        }
      });
  };

  useEffect(() => {
    // console.log(adminProfile, "ddddddddddddddddddddd")

    profile();
  }, []);

  useEffect(() => {
    if (Math.floor(Date.now() / 1000) - adminInfo?.time < 1.5) {
      window.location.reload();
    }
  }, [adminInfo]);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("sidebar-mini", isOpen);
    if (document.body.classList.contains("sidebar-gone")) {
      document.body.classList.remove("sidebar-gone");
      document.body.classList.remove("sidebar-mini");
      document.body.classList.add("sidebar-show", isOpen);
    }
  }, [isOpen]);

  // console.log(adminProfile?.image,'=ddddddddddddddddddddddd')
  return (
    <>
      <div className="navbar-bg"></div>
      <nav className="navbar navbar-expand-lg main-navbar">
        <form className="form-inline mr-auto">
          <ul className="navbar-nav mr-3">
            <li style={{ cursor: "pointer" }}>
              <Link
                style={{ color: "white" }}
                to="#"
                data-toggle="sidebar"
                className="nav-link nav-link-lg"
                onClick={() => setIsOpen(!isOpen)}
              >
                <i className="fas fa-bars"></i>
              </Link>
            </li>
            {/* <li>
              <a
                href="#"
                data-toggle="search"
                className="nav-link nav-link-lg d-sm-none"
              >
                <i className="fas fa-search"></i>
              </a>
            </li> */}
          </ul>
        </form>
        <ul className="navbar-nav navbar-right" >
          <li className="dropdown">
            {/* <a
              href="#"
              data-toggle="dropdown"
              className="nav-link dropdown-toggle nav-link-lg nav-link-user"
            > */}
              {/* <img
                style={{ height: "35px", width: "35px" }}
                src={
                  adminProfile?.image
                    ? `${import.meta.env.VITE_BASE_URL}/images/${adminProfile?.image
                    }`
                    : `${avatar}`
                }
                alt={adminProfile?.name}
                className="rounded-circle mr-1"
              /> */}
              {/* {
                <div className="d-sm-none d-lg-inline-block">
                  Hi, {adminProfile?.name}
                </div>
              } */}
            {/* </a> */}
            <div className="dropdown-menu dropdown-menu-right">
              {/* <div className="dropdown-title">Logged in 5 min ago</div> */}
              <Link to="/adminprofile" className="dropdown-item has-icon">
                <i className="far fa-user"></i> Profile
              </Link>
              <Link to="/changePassword" className="dropdown-item has-icon">
                <i className="fas fa-bolt"></i> Change Password
              </Link>
              {/* <Link to="#" className="dropdown-item has-icon">
                <i className="fas fa-cog"></i> Settings
              </Link> */}
              <div className="dropdown-divider"></div>

              <Link
                onClick={() => logoutAlert()}
                className="dropdown-item has-icon text-danger"
              >
                <i className="fas fa-sign-out-alt"></i> Logout
              </Link>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
