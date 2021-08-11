import React from 'react';
import './App.css';
// import RegisterPage from './RegisterPage/RegisterPage';
// import Loginpage from './LoginPage/LoginPage';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Signup from './signup';
import Login from './login';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {/* <Route path="/login" component={Loginpage}/> 
          <Route path="/Register" component={RegisterPage}/> */}
          <Route path="/register" exact component={Signup}/>
       
        </Switch>
      </Router>
    </div>
  );
}

export default App;