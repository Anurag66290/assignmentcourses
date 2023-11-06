import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import "../../node_modules/jqvmap/dist/jqvmap.min.css";
import "../../node_modules/summernote/dist/summernote-bs4.css";
import "../../node_modules/owl.carousel/dist/assets/owl.carousel.min.css";
import "../../node_modules/owl.carousel/dist/assets/owl.theme.default.min.css";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { http } from "../../config/axiosConfig";


export function Dashboard() {

  const [data, setData] = useState();
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])


  const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));

  let userdata = async () => {
    await http
      .get("user/get_user", {
        headers: {
          Authorization: `Bearer ${adminInfo?.token}`,
        },
      })
      .then((res) => {
        setData(res.data);
        console.log(res.data,"ddddddddddddd")
        setUsers(res.data.body?.allUser)
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

 

  useEffect(() => {
    userdata();
  } );


  return (
    <>
      <section class="section">
        <div class="section-header">
          <h1>Dashboard</h1>
        </div>
        <div class="row">
          <Link
            to={"/usertable"}
            className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12"
          >
            <div class="card card-statistic-1">
              <div class="card-icon bg-primary">
                <i
                  style={{ fontSize: "1.3rem", color: "white" }}
                  class="fa-solid fa-users"
                ></i>
              </div>
              <div class="card-wrap">
                <div class="card-header">
                  <h4>User</h4>
                </div>
                <div class="card-body">{data?.data?.length}</div>
              </div>
            </div>
          </Link>

          <Link
            to={"/CourseTable"}
            className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12"
          >
            <div class="card card-statistic-1">
              <div class="card-icon bg-danger">
                <i
                  style={{ fontSize: "1.3rem", color: "white" }}
                  class="fa-solid fa-book"
                ></i>
              </div>
              <div class="card-wrap">
                <div class="card-header">
                  <h4>Course</h4>
                </div>
                <div class="card-body">5</div>
              </div>
            </div>
          </Link>

          <Link
            to={"/TestTable"}
            className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12"
          >
            <div class="card card-statistic-1">
              <div class="card-icon bg-danger">
                <i
                  style={{ fontSize: "1.3rem", color: "white" }}
                  class="fa-solid fa-box"
                ></i>
              </div>
              <div class="card-wrap">
                <div class="card-header">
                  <h4>Test</h4>
                </div>
                <div class="card-body">5</div>
              </div>
            </div>
          </Link>


      

       

         

     
       

        

          
        </div>
      </section>
    </>
  );
}
