import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import Home from './components/Home.js';
import Navbar from './components/Navbar.js';
import Profile from './components/Profile.js';
import { useNavigate, Link, Router, Routes, Route, BrowserRouter } from 'react-router-dom';
//import reportWebVitals from "./reportWebVitals";
import { MoralisProvider } from "react-moralis";
import Register from './components/Register';
// ReactDOM.render(
//     <React.StrictMode>
//     <MoralisProvider serverUrl="https://obtz1utqtwxn.usemoralis.com:2053/server" appId="BU9h9ioUi5crW9o8GDCqwHlAQTKA2lR7LCBTZKEj">
//       <App />
//     </MoralisProvider>
//   </React.StrictMode>,
//   document.getElementById("root"));


// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();


ReactDOM.render(

  <React.StrictMode>
    <MoralisProvider serverUrl="https://obtz1utqtwxn.usemoralis.com:2053/server" appId="BU9h9ioUi5crW9o8GDCqwHlAQTKA2lR7LCBTZKEj">
      <BrowserRouter>
        
        <Routes>
          <Route path="/" element={<App/>}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/profile"element={Profile}></Route>

        </Routes>
      </BrowserRouter>
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById("root")
);