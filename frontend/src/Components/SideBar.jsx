import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import { useState } from "react";

function Sidebar() {
  const [userDropdown, setUserDropdown] = useState(false);
  const [buisnessDropdown, setBuisnessDropdown] = useState(false);
  const [highlightDropdown, sethighlightDropdown] = useState(false);
  const [categoryDropdown, setcategoryDropdown] = useState(false);
  const [QuestionDropdown, setQuestionDropdown] = useState(false);
  const [BannerDropdown, setBannerDropdown] = useState(false);
  const [cmsDropdown, setCmsDropdown] = useState(false);
  const history = useLocation();
  const path = history.pathname;

  const sidebarHideShow = () => {
    if (document.body.classList.contains("sidebar-show")) {
      document.body.classList.add("sidebar-gone");
      document.body.classList.remove("sidebar-mini");
      document.body.classList.remove("sidebar-show");
    }
  };

  useEffect(() => {
    sidebarHideShow();
  }, []);

  return (
    <div>
      <div className="main-sidebar sidebar-style-2">
        <aside id="sidebar-wrapper">
          <div className="sidebar-brand py-2">
            <Link to={"/dashboard"}>
              <img
                src="/assets/logo.png"  
                alt="logo"
                className="mt-2"
                style={{ width: "103px" }}
              />
            </Link>
          </div>
          <div className="sidebar-brand sidebar-brand-sm">
            <Link to={"/dashboard"}>
              <img src="/assets/logo.png" className="mt-2" width={"40"} />
            </Link>
          </div>
          <ul className="sidebar-menu">
            <li className="menu-header"></li>
            <li
              className={classNames("nav-item", {
                active: path === "/dashboard",
              })}
              to={"/dashboard"}
              onClick={sidebarHideShow}
            >
              <Link to={"/dashboard"} className="nav-link ">
                <i className="fas fa-fire"></i>
                <span>Dashboard</span>
              </Link>
            </li>

            {/* <li className="menu-header">Starter</li> */}

            <li
              className={classNames("nav-item", {
                active: path === "/usertable" ||  path.startsWith("/UserView/"),
              })}
              to={"/usertable"}
              onClick={sidebarHideShow}
            >
              <Link to={"/usertable"} className="nav-link ">
                <i className="fas fa-users"></i>
                <span>User</span>
              </Link>
            </li>
            

            <li
              className={classNames("nav-item", {
                active: path === "/CourseTable"  ||  path.startsWith("/GirlsView/"),
              })}
              to={"/CourseTable"}
              onClick={sidebarHideShow}
            >
              <Link to={"/CourseTable"} className="nav-link ">
                <i className="fas fa-book"></i>
                <span>Course</span>
              </Link>
            </li>

            <li
              className={classNames("nav-item", {
                active: path === "/TestTable" || path === "/HobbyCreate" ||  path.startsWith("/HobbyEdit/")
              })}
              onClick={sidebarHideShow}
            >
              <Link to="/TestTable" className="nav-link">
                <i className="fas fa-box"></i>
                <span>Test</span>
              </Link>
            </li>

            <li
              className={classNames("nav-item", {
                active: path === "/CourseReport",
              })}
              to={"/CourseReport"}
              onClick={sidebarHideShow}
            >
              <Link to={"/CourseReport"} className="nav-link ">
                <i className="fas fa-book"></i>
                <span>Course Report</span>
              </Link>
            </li>
            <li
              className={classNames("nav-item", {
                active: path === "/TestReport",
              })}
              to={"/TestReport"}
              onClick={sidebarHideShow}
            >
              <Link to={"/TestReport"} className="nav-link ">
                <i className="fas fa-book"></i>
                <span>Test Report</span>
              </Link>
            </li>
       


          </ul>
        </aside>
      </div>
    </div>
  );
}

export default Sidebar;
