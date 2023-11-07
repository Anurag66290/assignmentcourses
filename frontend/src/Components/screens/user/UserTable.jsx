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
  const [usersData, setUsersData] = useState([]);
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
        console.log(res, "asd");

        if (res.status === 404 || res.status === 400 || res.status === "") {
          throw new Error("User not eligible to access data");
        }

        if (res.data) {
          if (
            adminInfo?.role === "Manager-1" ||
            adminInfo?.role === "Admin"
          ) {
            setUsersData(res.data.data);
          } else {
            throw new Error("User not eligible to access data");
          }
        }
      })
      .catch((err) => {
        console.error(err.message,"asasas");
        toast.error("User not eligible to access data", toastOptions);
      });
  };

  useEffect(() => {
    getdata();
  }, []);

  const userdelete = (id) => {
    http
      .put(`/user/deleteUser/${id}`, null, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: `Bearer ${adminInfo.token}`,
        },
      })
      .then((res) => {
        if (res.data.code === 200) {
          getdata();
          navigate("/usertable");
          toast.success("User deleted Successfully", toastOptions);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.response?.data?.message || "Error deleting user", toastOptions);
      });
  };

  function changeStatus(id) {
    var status = parseInt(document.getElementById(id).value);
    http
      .post(
        `/user/updatestatus`,
        {
          id,
          status,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${adminInfo?.token}`,
          },
        }
      )
      .then((res) => {
        if (res.data) {
          navigate("/usertable");
          getdata();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Updated Successfully",
            showConfirmButton: false,
            timer: 1000,
          }).then(() => {
            window.location.reload();
          });
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error updating user status", toastOptions);
      });
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
        console.error(
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
    "Role",
    "Action",
  ];

  let finalArray = [];

  for (let [index, data] of usersData && usersData?.entries()) {
    const btn_status = (
      <select
        style={{
          borderRadius: "20px",
          margin: "2px",
          padding: "5px",
          textAlign: "center",
        }}
        name="role"
        value={data?.role}
        id={data._id}
        className="btn btn-outline-secondry dropdown-toggle"
        onChange={(event) => changeStatus(data._id)}
      >
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
    );

    const btn = (
      <>
        <Link to={`/UserView/${data._id}`} className="view-btn btn btn-info p-2">
          <i className="fas fa-eye"></i>
        </Link>

        <Link
          className="delete-btn btn btn-danger p-2"
          style={{ marginLeft: "10px" }}
          onClick={() => {
            alert(data._id);
          }}
        >
          <i className="fas fa-trash"></i>
        </Link>
      </>
    );

    var dataArray = [];

    dataArray.push(index + 1);
    dataArray.push(data.name);
    dataArray.push(data.email);
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

  return (
    <div>
      {!finalArray ? (
        <Loader />
      ) : (
        <section className="section">
          <div className="section-header">
            <h1>User Listing</h1>
          </div>
          <div>
            <MUIDataTable
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
