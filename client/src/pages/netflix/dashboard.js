import React from "react";
import Banner from "./components/Banner";
import Movies from "./components/movies";
import { Col, Container, Row } from "reactstrap";

const Dashboard = () => {
    return (
        <React.Fragment>
            <Container fluid>
                <Row>
                    {/* <Col lg={12}>
                        <Banner />
                    </Col> */}
                    <Col lg={12}>
                        <Movies isLargeRow={true} genre={"Netflix Originals"} genreKeyword={"originals"} />
                    </Col>
                </Row>
            </Container>

            {/* <Row title="Trending" fetchUrl={requests.fetchTrending}></Row>

            <Row title="Top Rated" fetchUrl={requests.fetchTopRated}></Row>

            <Row title="Action Movies" fetchUrl={requests.fetchActionMovies}></Row>

            <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies}></Row>

            <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies}></Row>
            <Row title="Romantic Movies" fetchUrl={requests.fetchRomanceMovies}></Row>
            <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries}></Row> */}
        </React.Fragment>
    );
};

export default Dashboard;
