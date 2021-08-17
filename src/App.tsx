import React from 'react';
import './App.css';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import Register from './RegisterPage/RegisterPage';
import Login from './LoginPage/LoginPage';
import { history } from './helpers/history';
import HomePage from './HomePage/HomePage';

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/home" component={HomePage} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;