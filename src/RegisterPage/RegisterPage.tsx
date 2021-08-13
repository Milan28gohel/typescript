
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/auth";
import { Link } from "react-router-dom";
import { Button, Form, Grid, Header, Segment, Message } from "semantic-ui-react";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const { message } = useSelector((state: any) => state.message);
    const dispatch = useDispatch();

    const onChangeEmail = (e: any) => {
        const email = e.target.value;
        setEmail(email);
    };
    const onChangePassword = (e: any) => {
        const password = e.target.value;
        setPassword(password);
    };
    const handleRegister = (e: any) => {
        e.preventDefault();
        setSuccessful(false);
        dispatch(register(email, password))
    };
    return (

        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Form size='large' onSubmit={handleRegister} >
                    <Segment stacked>

                        <Header as='h2' color='teal' textAlign='center'>
                            <h1 >Register</h1>
                        </Header>

                        <Form.Input
                            type="email"
                            fluid icon='user'
                            iconPosition='left'
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={onChangeEmail}

                        />

                        <Form.Input
                            type="password"
                            icon='lock'
                            iconPosition='left'
                            placeholder="password"
                            name="password"
                            value={password}
                            onChange={onChangePassword}
                        />

                        <Button color='teal' fluid size='large'>Sign Up</Button>

                        {message && (
                            <div>
                                <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                                    {message}
                                </div>
                            </div>
                        )}


                    </Segment>
                </Form>
                <Message>
                    <Link to="/login">Login</Link>
                </Message>
            </Grid.Column>
        </Grid>

    );
};
export default Register;