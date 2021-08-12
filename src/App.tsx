import React from 'react';
import './App.css';
// import RegisterPage from './RegisterPage/RegisterPage';
// import Loginpage from './LoginPage/LoginPage';
import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom';
import Register from './RegisterPage/RegisterPage';
import Login from './LoginPage/LoginPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {/* <Route path="/login" component={Loginpage}/> 
          <Route path="/Register" component={RegisterPage}/> */}
          <Route path="/" exact component={Register}/>
          <Route path="/login" component={Login}/>
          <Redirect from="*" to='/'/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;