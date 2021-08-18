import React from 'react';
import './App.css';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import Register from './RegisterPage/RegisterPage';
import Login from './LoginPage/LoginPage';
import { history } from './helpers/history';
import HomePage from './HomePage/HomePage';
import Dashboard from './HomePage/Datashow';

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/home" component={HomePage} />
          <Route path="/dash" component={Dashboard} />

          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;