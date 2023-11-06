import React, { useEffect, useState } from "react";
import { http } from "../../../../config/axiosConfig";
import MUIDataTable from "mui-datatables";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@mui/material";
import { Stack } from "@mui/material";
import { toast } from "react-toastify";
import avatar from "../../images/placeHolderImg.jpg";
import Loader from "../../Loader";
import Swal from "sweetalert2";

function UserTable() {
  const toastOptions = {
    position: "top-right",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const [usersData, setUsersData] = useState([]);
  const [toggleData, setToggleData] = useState();

  const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));

  let getdata = () => {
    http
      .get("/user/get_user", {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${adminInfo?.token}`,
        },
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data.data)
          setUsersData(res.data.data );
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getdata();
  }, []);

  const userdelete = (id) => {
    // console.log(id,"-=-=-==-=-")
    http
      .put(`/user/deleteUser/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: `Bearer ${adminInfo.token}`,
        },
      })
      .then((res) => {
        if (res.data.code === 200) {
          // setImgData('');
          getdata();
          navigate("/usertable");
          toast.success("User deleted Successfully", toastOptions);
        }
      })
      .catch((err) => {
        console.log(err, "======================err");
        toast.error(err.response.data.message, toastOptions);
      });
  };

  function changeStatus(id) {
    var status = parseInt(document.getElementById(id).value)
    http.post(`/user/updatestatus`, {
        id,
        status
    }, {
        headers: {
            'Content-Type': "multipart/form-data",
            Authorization: `Bearer ${
                adminInfo ?. token
            }`
        }
    }).then((res) => {
        if (res.data) {

            navigate("/usertable");
            getdata()
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Updated Successfully",
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

}

  const handleChange = (e, id) => {
    const user = { isActive: e.target.checked };

    http
      .put(`/user/updatetoggleStatus/${id}`, user)
      .then((res) => {
        console.log(res.data, "========================data");
        if (res.data.body.isRestrict == true) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "User Restricted Succesfully",
            showConfirmButton: false,
            timer: 1500,
          });
          getdata();
        } else {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "User UnRestricted Succesfully",
            showConfirmButton: false,
            timer: 1500,
          });
          getdata();
        }
      })
      .catch((er) =>
        console.log(
          er.response && er.response.data.message
            ? er.response.data.message
            : er.message
        )
      );
  };

  const alert = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Please be aware that this action is irreversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        userdelete(id);
        getdata();
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const columns = [
    "S.No.",
    "Name",
    "Email",
    // "Phone Number",
    // "Image",
    "Role",
    "Action",
  ];
  let finalArray = [];

  for (let [index, data] of usersData && usersData?.entries()) {
    // console.log(index, data, '=3=3=33333333333333sssss');

    const btn = (
      <>
      
        <Link
          to={`/UserView/${data._id}`}
          className="view-btn btn btn-info p-2"
        >
          <i class="fas fa-eye"></i>
        </Link>

        <Link
          className="delete-btn btn btn-danger p-2"
          style={{ marginLeft: "10px" }}
          onClick={() => {
            alert(data._id);
          }}
        >
          <i class="fas fa-trash"></i>
        </Link>
      </>
    );

    

    let image = (
      <img
        src={
          data?.image
            ? `${import.meta.env.VITE_BASE_URL}/images/${data?.image}`
            : `${avatar}`
        }
        style={{
          height: "100px",
          width: "100px",
        }}
      />
    );

    const btn_status = (
      <>
          <select style={
                  {
                      borderRadius: "20px",
                      margin: "2px",
                      padding: "5px",
                      textAlign: "center"
                  }
              }
              name="role"
              value={
                  data ?. role
              }
              id={data._id}
              className="btn btn-outline-secondry dropdown-toggle"
              onChange={
                  event => changeStatus(data._id)
          }>
             
             <option className="badge badge-success" value="1">
                  <label>{data?.role}</label>
              </option>
              <option className="badge badge-success" value="1">
                  <label>Manager-1</label>
              </option>

              <option className="badge badge-danger" value="2">
                  <label>Manger-2</label>
              </option>
          </select>

      </>
  )

    var dataArray = [];

    dataArray.push(index + 1);
    dataArray.push(data.name);
    dataArray.push(data.email);
    // dataArray.push(`+${data.countryCode}` + ` ${data.phoneNumber}`);

    // dataArray.push(image);

    dataArray.push(btn_status);

    dataArray.push(btn);

    finalArray.push(dataArray);
  }

  const data = finalArray;
  const options = {
    filterType: "checkbox",
    selectableRows: "none",
    filter: "false",

    viewColumns: false,
  };
  
  console.log("finalArray:", finalArray);
  console.log("dataArray:", dataArray);
  return (
    <div>
      {" "}
      {!finalArray || !dataArray ? (

        <Loader />
      ) : (
        <section class="section">
          <div class="section-header">
            <h1>User Listing</h1>
          </div>
          <div>
            {/* <div>
              <Link to={`/UserAdd`}>
                <Button className="btn btn-primary mb-3" >Add User</Button>
              </Link>
            </div> */}

            <MUIDataTable
              // title={'Employee List'}
              data={data}
              columns={columns}
              options={options}
            />
          </div>
        </section>
      )}
    </div>
  );
}

export default UserTable;
