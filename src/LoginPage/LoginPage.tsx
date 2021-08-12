import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect,Link } from 'react-router-dom';
import { login } from "../actions/auth";

const Login = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const onChangeUsername = (e:any) => {
    const username = e.target.value;
    setEmail(username);
  };

  const onChangePassword = (e:any) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e:any) => {
    e.preventDefault();
    dispatch(login(email, password))

  };
  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
            <h1>Login</h1>
        <form onSubmit={handleLogin} >
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={email}
              onChange={onChangeUsername}
           
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
 
            />
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block" >
           
              <span>Login</span>
            </button>
            <Link to="/register">Register</Link>
          </div>

  
        </form>
      </div>
    </div>
  );
};

export default Login;
