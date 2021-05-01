import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './components/Header/Header';
import Destination from './components/Destination/Destination';
import Contact from './components/Contact/Contact';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import NotFound from './components/NotFound/NotFound';
import Blog from './components/Blog/Blog';
import RideDetails from './components/RideDetails/RideDetails';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();
function App() {
  const [loggedInUser,setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value ={[loggedInUser,setLoggedInUser]}>
    <div className="container">
    <Router>
      <Header></Header>
        <Switch>
          <Route path="/contact">
            <Contact></Contact>
          </Route>
          <PrivateRoute path="/destination">
              <Destination></Destination>
          </PrivateRoute>
          <PrivateRoute path="/ride/:rideName">
            <RideDetails></RideDetails>
          </PrivateRoute>
          <Route path="/login">
           <Login></Login>
          </Route>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="/home">
            <Home></Home>
          </Route>
          <Route exact path="/blog">
            <Blog></Blog>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
      
    </div>
    </UserContext.Provider>
  );
}

export default App;
