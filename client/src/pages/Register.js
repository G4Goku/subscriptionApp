import React from "react";
import InputForm from "../components/Input";
import Nav from '../components/NavBar'

const Register = () => {
  return (
    <React.Fragment>
      <Nav/>
      <div className="d-flex justify-content-center mt-5" style={{ height: "100px" }}>
        <div className="container align-items-center d-flex">
          <div className="row col-md-6 offset-md-3 text-center">
            <h1 className="pt-5 fw-bold">Let's Get Started</h1>
          </div>
        </div>
      </div>
      <InputForm />
    </React.Fragment>

  );
};

export default Register;
