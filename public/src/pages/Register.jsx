import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assests/logo.png";
import { ToastContainer, toast } from 'react-toastify';
// import "react-toastify/dist/ReactTostify.css"
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"

import "./register.css";
import { registerRoute } from "../utils/APIRoutes";

const Register = () => {
const navigate=useNavigate()
//////usestate
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  ////// toast variable
  const toastOption={
    position:"bottom-right",
    autoClose:8000,
    pauseOnHover:true,
    draggable:true,
    theme:"dark"
  };
   ///// handlesumbit
  const handleSumbit = async(e) => {
    e.preventDefault();
    if(handleValidation()){
      const { password , username,email }=values;
      const { data }=await axios.post(registerRoute,{
        username,
        email,
        password,
      });
      if(data.status===false){
        toast.error(data.msg,toastOption);
      }
      if(data.status===true){
        localStorage.setItem("chat-app-user",JSON.stringify(data.user))
        navigate("/");
      }
    }
  };

  ///// handle validation
  const handleValidation=()=>{
    const{ password,confirmpassword,username,email }=values;
    if(password!==confirmpassword){
      toast.error("password and confirm password should be same",
      toastOption
      );
      return false;
    }else if(username.length<3){
      toast.error("Username should be gretter than three character",
      toastOption
      );
      return true;
    }else if(password.length<=8){
      toast.error("Password  should be grette or equal eight",
      toastOption
      );
      return false;
    }else if(email===""){
      toast.error("Email is required",toastOption)
    }
    return true;
  }
  //// handlechange

  const handleChange = (e) => {

    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(values)
  };

  return (
    <>
      <FormConatiner className="form-conatiner">
        <form onSubmit={(event) => handleSumbit(event)}>
          <div className="brand">
            <img src={Logo} alt="Logo"></img>
            <h1>Snappy</h1>
            <div className="user-input">
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={values.username}
                onChange={(e) => handleChange(e)}
              />
              <input
                type="email"
                placeholder="Write email here"
                name="email"
                value={values.email}
                onChange={(e) => handleChange(e)}
              />
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                value={values.password}

                onChange={(e) => handleChange(e)}
              />
              <input
                type="password"
                placeholder="Confirm password"
                name="confirmpassword"
                value={values.confirmpassword}

                onChange={(e) => handleChange(e)}
              />
              <button type="submit">Create User</button>
              <span>
                Already have an account? <Link to="login">Login</Link>{" "}
              </span>
            </div>
          </div>
        </form>
      </FormConatiner>
      <ToastContainer/>
    </>
  );
};
export default Register;
const FormConatiner = styled.div``;

