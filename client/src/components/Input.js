import React, { useState } from "react";
import { Form, FormGroup, Input, Label, Card, CardBody, } from "reactstrap";
import { Link } from "react-router-dom"
import { login, register } from '../helper/api_helper'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const InputForm = (props) => {
    const [userName, setUserName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault();
        let response
        let responseData
        try {
            if (props?.isLogin) {
                response = await login({ email, password });
                responseData = response.data;
                localStorage.setItem('authToken', responseData.token);
            } else {
                response = await register({ userName, email, password });
                responseData = response.data;
                localStorage.setItem('authToken', responseData.token);
            }
            responseData = response.data;
            toast.success(responseData.message, {
                position: toast.POSITION.TOP_RIGHT
            });
            setEmail("")
            setPassword("")
            setUserName("")
        } catch (error) {
            toast.error(error.response.data.message, {
                position: toast.POSITION.TOP_RIGHT
            });
            console.error(error, "error");
        }
    }
    return (
        <React.Fragment>
            <ToastContainer />
            <div className="d-flex justify-content-center ">
                <Card className="w-50 text-center">
                    <CardBody >
                        <Form onSubmit={handleSubmit}>
                            {!props.isLogin &&
                                <FormGroup floating>
                                    <Input
                                        id="exampleName"
                                        name="text"
                                        placeholder="Name"
                                        type="text"
                                        onChange={(e) => setUserName(e.target.value)}
                                    />
                                    <Label for="exampleName">Name</Label>
                                </FormGroup>}

                            <FormGroup floating>
                                <Input
                                    id="exampleEmail"
                                    name="email"
                                    placeholder="Email"
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Label for="exampleEmail">Email</Label>
                            </FormGroup>{' '}
                            <FormGroup floating>
                                <Input
                                    id="examplePassword"
                                    name="password"
                                    placeholder="Password"
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Label for="examplePassword">Password</Label>
                            </FormGroup>{' '}
                            <div className="d-flex justify-content-center mb-3">
                                <button type="submit" className="btn btn-danger btn-lg fs-6" >{props.isLogin ? "Sign In" : "Sign Up"}</button>
                            </div>
                            <span className="fw-light fs-6 text-muted">
                                {props.isLogin ? "Don't have an account ?" : "Already have an account ?"}
                                <Link className= "text-primary fs-6 ms-1 text-decoration-underline" to={props.isLogin ? "/register" : "/login"}>{props.isLogin ? "sign up" : "sign in"}</Link>
                            </span>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </React.Fragment>
    );
};

export default InputForm;
