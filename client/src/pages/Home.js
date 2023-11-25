import React from "react";
import Cards from "../components/cards/Cards";

const Home = () => {
  return (
    <React.Fragment>
      <div className="d-flex justify-content-center" style={{ height: "100px" }}>
        <div className="container align-items-center d-flex">
          <div className="row col-md-6 offset-md-3 text-center">
            <h1 className="pt-5 fw-bold">Choose your plan</h1>
            <p className="lead pb-4">...</p>
          </div>
        </div>
      </div>
      <Cards />
    </React.Fragment>
  );
};

export default Home;
