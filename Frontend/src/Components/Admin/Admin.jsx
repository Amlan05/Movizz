import React from "react";
import { useNavigate } from "react-router";
import AuthForm from "../Auth/AuthForm";
import axios from "axios"
import { useDispatch } from 'react-redux'
import { adminActions } from "../../Store";

const Admin = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const onResReceived = (data) => {
    dispatch(adminActions.login())
    localStorage.setItem("AdminId", data._id)
    navigate('/')
  }

  //here we are passing data from child to parent through function

  const getData = (data) => {
    console.log("Admin", data);

    sendAdminAuthRequest(data.input)
    .then( res => {
      onResReceived(res)
    })
    .catch((err) => console.log(err))
  };

  const sendAdminAuthRequest = async (lgnData) => {
    let res;
    try {
      res = await axios.post("http://localhost:8000/admins/login", {
        email: lgnData.email,
        password: lgnData.password
      });
    } catch (err) {
      console.log(err);
    }

    if (!res) {
      return console.log("Unexpected Error");
    }
    return res.data.admin
  };

  return (
    <div>
      <AuthForm gettingInput={getData} isAdmin={true}></AuthForm>
    </div>
  );
};

export default Admin;
