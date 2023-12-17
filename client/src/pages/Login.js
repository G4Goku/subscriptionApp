import React from "react";
import InputForm from "../components/Input";
import Nav from '../components/NavBar'

const Login = () => {
  return (
    <React.Fragment>
      <Nav/>
      <div className="d-flex justify-content-center" style={{ height: "100px" }}>
        <div className="container align-items-center d-flex">
          <div className="row col-md-6 offset-md-3 text-center">
            <h1 className="pt-5 fw-bold">Login</h1>
          </div>
        </div>
      </div>
      <InputForm isLogin={true}/>
    </React.Fragment>
  );
};

export default Login;
