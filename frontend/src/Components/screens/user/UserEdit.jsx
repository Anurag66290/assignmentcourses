import React, {useEffect, useState} from "react";
import avatar from "../../images/placeHolderImg.jpg";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Card, Col, Row} from "react-bootstrap";
import Swal from "sweetalert2";
// import { GetAllUserAction } from "../Redux/Action/adminAction";

import {useDispatch, useSelector} from "react-redux";
import {http} from "../../../../config/axiosConfig";

function UserEdit() {
  const formData = new FormData();

    const id = useParams().id;
    const [userData, setUserData] = useState();
    const [imgData, setImgData] = useState();
    const navigate = useNavigate();

    const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));


    const handleChange = (e) => {
      setUserData({...userData,[e.target.name]: e.target.value});
         
    };

    useEffect( () => {
         http.get(`/user/getUser/${id}`, {
            headers: {
                authorization: `Bearer ${
                    adminInfo ?. token
                }`
            }

        }).then((res) => setUserData(res.data, console.log(res.data, "-=-=-=-=-="))).catch((er) => console.log(er.message));
    }, []);

    
 const imageUploader = (e) => {
    formData.append("image", e.target.files[0])

    setImgData(e.target.files[0])

  };


    const handleSubmit = async(e) => {
        e.preventDefault();
        formData.append("userid", userData?.userid)
        formData.append("email", userData?.email)
        formData.append("countryCode", userData?.countryCode)
        formData.append("phoneNumber", userData?.phoneNumber)
        formData.append("bio", userData?.bio)
        formData.append("facebook", userData?.facebook)
        formData.append("Whatsapp", userData?.Whatsapp)
        formData.append("Twitter", userData?.Twitter)

        if(imgData != undefined){
          formData.append("image", imgData)
        }
        
        if (userData) {
            const token = adminInfo ?. token;

            try {
                const response = await http.put(`/user/updateUser/${id}`, formData, {
                    headers: {
                        'Content-Type': "multipart/form-data",
                        authorization: `Bearer ${token}`
                    }
                });

                if (response.data.body) {
                    navigate("/usertable");
                    Swal.fire("Updated", "User updated successfully", "success");
                }
            } catch (error) {
                console.error(error);
                Swal.fire("Error", "Failed to update user", "error");
            }
        }
    };


    // const handleClicked = () => {
    // if (userData) {
    //     navigate("/usertable");
    // }
    // };

    return (
        <div className="col-12 col-md-6 col-lg-12"
            style={
                {justifyContent: "center"}
        }>
            <div className="card"
                style={
                    {
                        justifyContent: "center",
                        // marginLeft: "100px",
                    }
            }>
                <form onSubmit={handleSubmit}
                    onChange={handleChange}>
                    <div className="card-header">
                        <h4>Update User</h4>
                    </div>
                    <div className="card-body">


                        <Col md={4}>
                            <Card className="bg-white p-3 mb-1">
                                <Card.Img className="profile_img text-center"
                                    style={
                                        {margin: "auto"}
                                    }
                                    variant="top"
                                    src={
                                        imgData?URL.createObjectURL(imgData) : `${
                                            import.meta.env.VITE_BASE_URL
                                        }/images/${
                                            userData?.image
                                        }`
                                    }
                                    alt={avatar}/>
                            </Card>
                            <div className="form-group mt-2 mb-0"
                                style={
                                    {height: "60px"}
                            }>
                                <input type="file" className="form-control" placeholder="Enter About Mission" name="image" accept="image/*"
                                    value={
                                        imgData?.image
                                    }
                                    onChange={
                                        (e) => imageUploader(e)
                                    }/>
                            </div>

                        </Col>
                        <div className="form-group">
                            <label>
                                User ID</label>
                            <input maxlength="22" type="text" required name="userid"
                                value={
                                    userData ?. userid
                                }
                                className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" required name="email"
                                value={
                                    userData ?. email
                                }
                                className="form-control"/>
                        </div>


                        <div className="form-row">

                            <div className="form-group col-md-2">
                                <label for="exampleInputEmail3">Country Code:</label>
                                <select className="form-control" name="countryCode"
                                    onChange={
                                        (e) => handleChange(e)
                                }>
                                    <option value={
                                        userData ?. countryCode
                                    }>
                                        {
                                        userData ?. countryCode
                                    }</option>
                                    <option value="+1">+1 (USA)</option>
                                    <option value="+44">+44 (UK)</option>
                                    <option value="+91">+91 (India)</option>
                                    <option value="+86">+86 (China)</option>
                                </select>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Phone Number</label>
                                <input type="tel" name="phoneNumber"
                                    // placeholder=" 88888-88888"
                                    // pattern="[0-9]{3} [0-9]{3} [0-9]{4}"
                                    maxlength="12"
                                    value={
                                        userData ?. phoneNumber
                                    }
                                    className="form-control"
                                    required=""/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>bio</label>
                            <input type="bio" required name="bio"
                                value={
                                    userData ?. bio
                                }
                                className="form-control"/>
                        </div>

                        <div className="form-group">
                            <label>Facebook</label>
                            <input type="facebook" required name="facebook"
                                value={
                                    userData ?. facebook
                                }
                                className="form-control"/>
                        </div>

                        <div className="form-group">
                            <label>Instagram</label>
                            <input type="Whatsapp" required name="Whatsapp"
                                value={
                                    userData ?. Whatsapp
                                }
                                className="form-control"/>
                        </div>

                        <div className="form-group">
                            <label>Twitter</label>
                            <input type="Twitter" required name="Twitter"
                                value={
                                    userData ?. Twitter
                                }
                                className="form-control"/>
                        </div>


                    </div>
                    <div className="card-footer text-right">
                        <button className="btn btn-primary" type="submit"
                            // onClick={handleClicked}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UserEdit;
