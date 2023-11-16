import React from "react";
import { Form, FormGroup, Input, Label, Button, Card, CardBody, } from "reactstrap";
import { Link } from "react-router-dom"
import axios from "axios"

const InputForm = (props) => {
    console.warn(process.env.REACT_APP_BASE_URL,"url")
    const handleClick = () =>{
        const data ={
            email:"gokul@gmail.com",
            password: "12345"
        }
        axios.post(`${process.env.REACT_APP_BASE_URL}/user/login`,data).then((response) => {
            console.warn(response);
          });
    }
    return (
        <React.Fragment>
            <div className="d-flex justify-content-center ">
                <Card className="w-50 text-center">
                    <CardBody >
                        <Form>
                            {!props.isLogin &&
                                <FormGroup floating>
                                    <Input
                                        id="exampleName"
                                        name="text"
                                        placeholder="Name"
                                        type="text"
                                    />
                                    <Label for="exampleName">Name</Label>
                                </FormGroup>}

                            <FormGroup floating>
                                <Input
                                    id="exampleEmail"
                                    name="email"
                                    placeholder="Email"
                                    type="email"
                                />
                                <Label for="exampleEmail">Email</Label>
                            </FormGroup>{' '}
                            <FormGroup floating>
                                <Input
                                    id="examplePassword"
                                    name="password"
                                    placeholder="Password"
                                    type="password"
                                />
                                <Label for="examplePassword">Password</Label>
                            </FormGroup>{' '}
                            <div className="d-flex justify-content-center mb-3">
                                <Button onClick={handleClick} className="w-50" color="primary">{props.isLogin ? "Login" : "Register"}</Button>
                            </div>
                            <span>
                                {props.isLogin ? "Don't have an account ?" : "Already have an account ?"}
                                <Link to={props.isLogin ? "/register" : "/login"}>{props.isLogin ? "Register" : "Login"}</Link>
                            </span>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </React.Fragment>
    );
};

export default InputForm;
