import React from "react";
import Cards from "../components/cards/Cards";
import "../css/home.css"
import { Button, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <React.Fragment>
      <div className="main__bg">
      <header class="header">
        <a class="header__logo" href="#">
          <img src="https://raw.githubusercontent.com/thatanjan/netflix-clone-yt/youtube/media/netflix.svg" alt="" />
        </a>
        <Link to="/login" className="btn btn-danger">Sign in</Link>
      </header>

      <section class="banner__section">
        <img class="banner" src="https://raw.githubusercontent.com/thatanjan/netflix-clone-yt/youtube/media//banner.jpg" alt="" />
        <div class="banner__overlay"></div>

        <div class="banner__content">
          <h1 class="banner__title">Unlimited movies, TV shows, and more.</h1>
          <h4 class="banner__subtitle">Watch anywhere. Cancel anytime.</h4>
          <Link to="/register" className="btn btn-danger btn-lg">
            Get started
          </Link>
        </div>
      </section>

      <hr class="section__divider" />
      </div>
    </React.Fragment>
  );
};

export default Home;
