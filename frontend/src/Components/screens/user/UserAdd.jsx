import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { http } from '../../../../config/axiosConfig';
// import { DateTimeField } from 'react-bootstrap-datetimepicker';


import '../user/UserAdd.css';

function CreateEvent() {

  const toastOptions = {
    position: 'top-right',
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };


  const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));

  let formData = new FormData();
  const [imgData, setImgData] = useState();

  const [data, setData] = useState({
    role: 1
  });

  const navigate = useNavigate();
  

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

 

  const imageUploader = (e) => {
    setImgData(e.target.files[0]);
  };

  

  const handleSubmit =  (e) => {
  
    e.preventDefault();
    
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('confirmPassword', data.confirmPassword);
      formData.append('userid', data.userid);
      formData.append('phoneNumber', data.phoneNumber);
      formData.append('bio',data.bio);
      formData.append('Twitter', data.Twitter);
      formData.append('Whatsapp', data.Whatsapp);
      formData.append('facebook', data.facebook);      
      formData.append('countryCode', data.countryCode); 
      formData.append('image', imgData);
     
      
       http
        .post('/user/createUser', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            authorization: `Bearer ${adminInfo?.token}`,
      
          },
        })
        .then((res) => {
          console.log(res,"_+_+_+");
          if (res.data.code === 200) {
            setData('');
            // setImgData('');
            navigate('/usertable');
            toast.success('User created Successfully', toastOptions);
          }
        })
        .catch((err) => {
          console.log(err, '======================err');
          toast.error(err.response.data.message, toastOptions);
        });
    
  };

 

  return (
    <>
    <section className="section">
    <div className="section-header shadow">
      <h1>User Add</h1>
      <div className="section-header-breadcrumb"></div>
    </div>
        <div className="card-body mt-5 text-start  bg-white">
          <form className="forms-sample" onSubmit={(e) => handleSubmit(e)}>
            <div className="form-group">
              <label for="exampleInputName1">User ID</label>
              <input
                type="text"
                name="userid"
                className="form-control"
                placeholder="Enter User ID"
                onChange={(e) => handleChange(e)}
              />
            </div>


            {/* <div className="form-group">
              <label for="exampleInputEmail3">Date And Time </label>

              <input
                type="datetime-local"
                name="dateAndTime"
                className="form-control"
                placeholder="Enter Date And Time"
                onChange={(e) => handleChange(e)}
              />
            </div> */}

            <div className="form-group">
              <label for="exampleInputEmail3">Email </label>
              <input
                type="text"
                name="email"
                className="form-control"
                placeholder="Enter User Email"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="form-group">
              <label for="exampleInputEmail3">Password </label>
              <input
                type="text"
                name="password"
                className="form-control"
                placeholder="Enter Password For User"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail3">Confirm Password </label>
              <input
                type="text"
                name="confirmPassword"
                className="form-control"
                placeholder="Enter confirm Password For User"
                onChange={(e) => handleChange(e)}
              />
            </div>
            
            <div className="form-group">
            <div className="form-group col-md-2">
      <label  for="exampleInputEmail3">Country Code:</label>
      <select   className="form-control"  name="countryCode" value={data.countryCode} onChange={(e) => handleChange(e)}>
        <option value="">Select a country code</option>
        <option value="+1">+1 (USA)</option>
        <option value="+44">+44 (UK)</option>
        <option value="+91">+91 (India)</option>
        <option value="+86">+86 (China)</option>
      </select>
    </div>     
    <div className="form-group col-md-5">
              <label>Phone Number </label>
              <input
                type="tel"
                name="phoneNumber"
                className="form-control"
                placeholder="Enter User Phone NUmber"
                onChange={(e) => handleChange(e)}
              />
            </div>

        </div>

            <div className="form-group">
              <label for="exampleInputEmail3">Bio</label>
              <input
                type="text"
                name="bio"
                className="form-control"
                placeholder="Enter User bio"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="form-group">
              <label for="exampleInputEmail3">Twitter</label>
              <input
                type="text"
                name="Twitter"
                className="form-control"
                placeholder="Enter User twitter liink"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="form-group">
              <label for="exampleInputEmail3">Instagram</label>
              <input
                type="text"
                name="Whatsapp"
                className="form-control"
                placeholder="Enter User whatsapp link"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="form-group">
              <label for="exampleInputEmail3">Facebook</label>
              <input
                type="text"
                name="facebook"
                className="form-control"
                placeholder="Enter User facabook link"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="form-group">
            <div className="form-group" >
              <label for="exampleInputEmail3">User Image: </label>
             </div>
              {imgData && (
        <img
          src={URL.createObjectURL(imgData)}
          alt="Selected image"
          width="150"
          height="150"
          style={{ borderRadius: "50%" }}
        />
      )}
              <input
                type="file"
                className="form-control"
                placeholder="Enter About Mission"
                name="image"
                accept="image/*"
                onChange={(e) => imageUploader(e)}
              />
            </div>
            

            <div className="lastTwo-btn pb-3">
              <button type="submit" className="btn btn-primary mr-3">
                Submit
              </button>
              <Link to="/dashboard">
                <button className="btn btn-light">Cancel</button>
              </Link>
            </div>
          </form>
        </div>
    </section>
    </>
  );
}

export default CreateEvent;
