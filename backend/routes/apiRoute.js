import express from "express";

import {
  sign_up,
  login,
  create_course,
  Update_course,
  getbyid_course,
  getall_course,
  deletbyid_course,
  create_test,
  Update_test,
  getall_test,
  deletbyid_test,
  getreport_course,
  getreport_test,
  report_course,
  report_test,
  get_user,
  role_update,
  logout
  } from "../controller/controller.js";
import { userauthMiddleware } from "../utils/genrateToken.js";

  const apiRoute = express.Router();

apiRoute.route("/sign_up").post(sign_up);
apiRoute.route("/login").post(login);
apiRoute.route("/logout").post(userauthMiddleware,logout);

apiRoute.route("/get_user").get(userauthMiddleware,get_user);
apiRoute.route("/role_update").post(userauthMiddleware,role_update);


//course
apiRoute.route("/create_course").post(userauthMiddleware,create_course);
apiRoute.route("/Update_course").post(userauthMiddleware,Update_course);
apiRoute.route("/getbyid_course").post(userauthMiddleware,getbyid_course);
apiRoute.route("/getall_course").get(userauthMiddleware,getall_course);
apiRoute.route("/deletbyid_course").delete(userauthMiddleware,deletbyid_course);

//test
apiRoute.route("/create_test").post(create_test);
apiRoute.route("/Update_test").post(userauthMiddleware,Update_test);
apiRoute.route("/getall_test").get(userauthMiddleware,getall_test);
apiRoute.route("/deletbyid_test").delete(userauthMiddleware,deletbyid_test);


//report  
apiRoute.route("/report_course").post(report_course);
apiRoute.route("/report_test").post(report_test);

apiRoute.route("/getreport_course").get(userauthMiddleware,getreport_course);
apiRoute.route("/getreport_test").get(userauthMiddleware,getreport_test);



export default apiRoute;


