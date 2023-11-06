import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../images/placeHolderImg.jpg";

import "./profile.css";
import { http } from "../../../config/axiosConfig";
import { Button, Card, Col, Row } from "react-bootstrap";
import Swal from "sweetalert2";

const AdminProfile = () => {
  const navigate = useNavigate();

  const [adminProfile, setAdminProfile] = useState();
  const [imgData, setImgData] = useState();

  const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));
  const formData = new FormData();

  const profile = () => {
    http
      .get(`/user/adminProfile`, {
        headers: {
          authorization: `Bearer ${adminInfo.token}`,
        },
      })
      .then((res) => {
        console.log(res, "==============");
        setAdminProfile(res?.data?.body);
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
    profile();
  }, []);

  const imageUploader = (e) => {
    formData.append("image", e.target.files[0]);
  };

  const handleChange = (e) => {
    setAdminProfile({ ...adminProfile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.append("name", adminProfile.name);
    // formData.append("bio", adminProfile.bio);
    await http
      .put(`/user/updateAdminProfileImg`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${adminInfo?.token}`,
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          setImgData(res.data.body.image);
          setAdminProfile("");
          Swal.fire("Success", "Profile Updated", "success");
          profile();
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire(`failed,${err.response.data.message}`, "error");
        if (err.response.status == 403) {
          navigate("/");
          localStorage.clear();
        }
      });
  };

  // Handel Commission

  return (
    <>
      <div className="mt-5">
        <Row className="mx-md-4 mt-2 pb-4">
          <Col md={4}>
            <Card className="bg-white p-3 mb-1">
              <Card.Img
                className="profile_img"
                variant="top"
                src={
                  adminProfile?.image
                    ? `${import.meta.env.VITE_BASE_URL}/images/${adminProfile?.image
                    }`
                    : `${avatar}`
                }
                alt={avatar}
              />
            </Card>
            <div className="form-group mt-2 mb-0" style={{ height: "60px" }}>
              <input
                type="file"
                className="form-control p-2 "
                value={imgData?.image}
                name="image"
                accept="image/*"
                onChange={(e) => imageUploader(e)}
              />
            </div>
          </Col>

          <Col md={8}>
            <Card>
              <Card.Body>
                <Card.Title>My Profile</Card.Title>
                <Card.Text>
                  <form onChange={handleChange} onSubmit={handleSubmit}>
                    <div className="form-group1">
                      <label htmlFor="text" className="fw-bold my-1"></label>
                      <input
                        className="form-control"
                        type="text"
                        value={adminProfile?.name}
                        name="name"
                      />
                    </div>
                    <div className="form-group1">
                      <label htmlFor="text" className="fw-bold my-1">
                        E-mail
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        value={adminProfile?.email}
                        readOnly
                      />
                    </div>
                    {/* <div className="form-group1">
                      <label htmlFor="text" className="fw-bold my-1">
                      Bio
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        value={adminProfile?.bio}
                        name="bio"
                      />
                    </div> */}
                  </form>
                </Card.Text>

                <Button
                  onClick={handleSubmit}
                  variant="primary"
                  style={{ float: "left" }}
                >
                  Save Changes
                </Button>
              </Card.Body>

            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AdminProfile;
