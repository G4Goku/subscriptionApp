import React from "react";
import InputForm from "../components/Input";

const Register = () => {
  return (
    <React.Fragment>
      <div className="d-flex justify-content-center" style={{ height: "100px" }}>
        <div className="container align-items-center d-flex">
          <div className="row col-md-6 offset-md-3 text-center">
            <h1 className="pt-5 fw-bold">Let's Get Started</h1>
            <p className="lead pb-4">
              Sign up for free. No credit card required.
            </p>
          </div>
        </div>
      </div>
      <InputForm />
    </React.Fragment>

  );
};

export default Register;
