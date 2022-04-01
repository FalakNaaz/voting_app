import React, { useCallback }  from 'react';
//import logo from './logo.png';
import '../static/css/App.css';
import { useMoralis } from "react-moralis";
import Register from "./Register.js";
import {useHistory, Link, Route, useNavigate} from 'react-router-dom';
import Logo from '../static/images/bbg.png';
import Cir from '../static/images/cir.png';
import Nav from "./Nav";


function App() {
  
  //const handleOnClick = () => history.push('./Home.js');
  const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();
  const navigate = useNavigate();
  
    const login = async () => {
      console.log(isAuthenticated)
      if (!isAuthenticated) {

        await authenticate({signingMessage: "Log in using Moralis" })
          .then(function (user) {
            
            console.log("logged in user:", user);
            console.log(user.get("ethAddress"));
            //this.props.history.push("/home");
            navigate("/home", { replace: true });

            // <Route render={({ history}) => (
            //   history.push('/home')
            // )} />
          
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
    const register = ()=>{
      navigate("/register", { replace: true });

    }

    const logOut = async () => {
      await logout();
      console.log("logged out");
    }

  return (
    <section className='wrapper'>
     <Nav a1="Contact Us"></Nav>
    

    <div className='main-content'>
      <div className='content-left'>
        <h1>Decentralized Voting</h1>
        <h2>System</h2>
        <hr></hr>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit donec et luctus quam. Cras vel viverra ligula. Fusce hendrerit lorem risus, non convallis.
        </p>

        <button onClick={login} className="btn-login">Login!</button>
        <button onClick={register} className="btn-login">Register!</button>
      </div>
      <div className='content-right'>
       <img src={Logo}></img>
      </div>
    </div>
      
      <button className="btn btn-primary">hello</button> 
       <button onClick={logOut} disabled={isAuthenticating}>Logout</button>
    </section>
  );
}

export default App;