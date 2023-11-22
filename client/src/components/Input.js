import React, { useState } from "react";
import { Form, FormGroup, Input, Label, Button, Card, CardBody, } from "reactstrap";
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
        try {
            if (props?.isLogin) {
                response = await login({ email, password });
            }else{
                response = await register({ userName, email, password });
            }
            const responseData = response.data;
            toast.success(responseData.message, {
                position: toast.POSITION.TOP_RIGHT
            });
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
                                <Button type="submit" className="w-50" color="primary">{props.isLogin ? "Login" : "Register"}</Button>
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
