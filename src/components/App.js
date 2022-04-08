import React from 'react';
import '../static/css/App.css';
import {Moralis} from "moralis";
import { useNavigate} from 'react-router-dom';
import Logo from '../static/images/bbg.png';
import Nav from "./Nav";
const serverUrl = "https://obtz1utqtwxn.usemoralis.com:2053/server";
const appId = "BU9h9ioUi5crW9o8GDCqwHlAQTKA2lR7LCBTZKEj";
Moralis.start({ serverUrl, appId });

function App() {
  
  const navigate = useNavigate();
  
    const login = async () => {
      let user = Moralis.User.current();
        console.log(user)
        if (!user) {
          user = await Moralis.authenticate();
          navigate("/home", { replace: true });
        }
        console.log("logged in user:", user);
    }
    const register = ()=>{
      navigate("/register", { replace: true });

    }

    // const logOut = async () => {
    //   await logout();
    //   console.log("logged out");
    // }

  return (
    <section className='wrapper'>
     <Nav a1="Get Started" a2="Home" a3="About Us" a4="Notices"></Nav>
    

    <div className='main-content'>
      <div className='content-left'>
        <h1>Decentralized Voting</h1>
        <h2>System</h2>
        <hr></hr>
        <p>
        A Quick, Smart and Secure way to cast your vote. No need to hustle to the polling booth to cast your vote. Just use your smartphone/computer and cast your vote from anywhere in a secure way.
        </p>

        <button onClick={login} className="btn-login">Login!</button>
       
      </div>
      <div className='content-right'>
       <img src={Logo}></img>
      </div>
    </div>
      
      {/* <button className="btn btn-primary">hello</button>  */}
       {/* <button onClick={logOut} >Logout</button> */}
    </section>
  );
}

export default App;