import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { http } from "../../../../config/axiosConfig";
import './UserView.css'
import avatar from '../../images/placeHolderImg.jpg';

import { MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit'
function UserView() {
  const ID = useParams().id;
  const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));

  const [user, setUser] = useState();

  useEffect(() => {
    http.get(`/user/getUser/${ID}`, {
        headers: {
          authorization: `Bearer ${adminInfo?.token}`,
        },
      })
      .then((res) => {
        console.log(res.data, "===========dtaa");
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <section className="section">
        <div className="section-header shadow">
          <h1>User Information</h1>
          <div className="section-header-breadcrumb"></div>
        </div>

        <div className="section-body shadow">
          <div className="row ">
            <div className="col-12 col-md-12 col-lg-12">
              <div className="card">
                <MDBContainer className="py-5 overflow-hidden ">
                  <div className="row">
                    <MDBCol lg="12" className="text-center">
                      <MDBCard className="shadow-none ">
                        <MDBCardBody
                          className="text-center"
                          style={{ margin: "auto" }}
                        >
                        <img
                          src={
                            user?.image
                              ? `${
                                  import.meta.env.VITE_BASE_URL
                                }/images/${user?.image}`
                              : `${avatar}`
                           }style={{height:"200px"}}
                          className="user_imgs"
                          
                        /> 
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                  </div>

                  <MDBRow className="" style={{}}>
                    <MDBCol
                      lg="8"
                      style={{
                        margin: "auto",
                      }}
                    >
                      <MDBCard className="mb-4">
                        <h3 style={{ color: "#e4437c" }}>User</h3>
                        <MDBCardBody className="p-0">
                        
                        <MDBRow>
                            <MDBCol className="user_form" sm="12">
                              <label>Name</label>
                              <div className="form_group">
                                <i className="fa-solid fa-user"></i>

                                <input
                                  readOnly
                                  
                                  value={user?.name}
                                />
                              </div>
                            </MDBCol>
                          </MDBRow>


                          <MDBRow>
                            <MDBCol className="user_form" sm="12">
                              <label>Email</label>
                              <div className="form_group">
                                <i className="fa-solid fa-envelope"></i>

                                <input
                                  readOnly
                                  
                                  value={user?.email}
                                />
                              </div>
                            </MDBCol>
                          </MDBRow>

                        

                          
                          <MDBRow>
                            <MDBCol className="user_form" sm="12">
                              <label>Phone Number</label>
                              <div className="form_group">
                                <i className="fa-solid fa-phone"></i>
                                <input
                                  readOnly
                                  
                                  value={`+${user?.countryCode} ${user?.phoneNumber}`}
                                />
                              </div>

                            
                            </MDBCol>
                          </MDBRow>

                          <MDBRow>
                            <MDBCol className="user_form" sm="12">
                              <label>Location</label>
                              <div className="form_group">
                                <i className="fa-solid fa-location"></i>

                                <input
                                  readOnly
                                  
                                  value={user?.location?.location_name}
                                />
                              </div>
                            </MDBCol>
                          </MDBRow>

                          <div className="row">
                    <MDBCol lg="12" className="text-center">
                      <MDBCard className="shadow-none ">
                        <MDBCardBody
                          className="text-center"
                          style={{ margin: "auto" }}
                        >
                        <img
                          src={
                            user?.govtId
                              ? `${
                                  import.meta.env.VITE_BASE_URL
                                }/images/${user?.govtId}`
                              : `${avatar}`
                           }style={{height:"200px"}}
                          className="user_imgs"
                          
                        /> 
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                  </div>
                                                
                          

                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                  </MDBRow>
                  <Link to="/userTable" className="btn btn-primary float-right">
                                 Go Back
                  </Link>
                </MDBContainer>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default UserView;
