import React, { useCallback }  from 'react';
//import logo from './logo.png';
//import './App.css';
import { useMoralis } from "react-moralis";
import Home from "./Home.js";
import {useHistory, Link, Route, useNavigate} from 'react-router-dom';


function App() {
  
  //const handleOnClick = () => history.push('./Home.js');
  const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();
  const navigate = useNavigate();
    const login = async () => {
      
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

    const logOut = async () => {
      await logout();
      console.log("logged out");
    }

  return (
    <div>
      
      <h1>Moralis Hello World!</h1>
      <button onClick={login}>Moralis Metamask Login</button>
      {/* <Link to="./Home.js" className="btn btn-primary">hello</Link> */}
      <button onClick={logOut} disabled={isAuthenticating}>Logout</button>
      
    </div>
  );
}

export default App;