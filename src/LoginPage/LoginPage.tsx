import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/auth";
import { Button, Form, Grid, Header, Segment, Message } from "semantic-ui-react";
import {log} from "../interface/interface"

const Login:React.FC<log> = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful] = useState(false);
  const { message } = useSelector((state: any) => state.message);

  const dispatch = useDispatch();

  const onChangeUsername = (e: any) => {
    const username = e.target.value;
    setEmail(username);
  };

  const onChangePassword = (e: any) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e: any) => {
    e.preventDefault();
    dispatch(login(email, password))
  };
  return (

    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Form size='large' onSubmit={handleLogin} >
          <Segment stacked>
            <Header as='h2' color='teal' textAlign='center'>
              <h1>Login</h1>
            </Header>
            <Form.Input
              type="email"
              fluid icon='user'
              iconPosition='left'
              placeholder="Email"
              name="email"
              value={email}
              onChange={onChangeUsername}

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
            <Button color='teal' fluid size='large'>Login</Button>

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
          New to us? <a href='/register'>Register</a>
        </Message>
      </Grid.Column>
    </Grid>


  );
};

export default Login;
