import React from "react";
import { ReactDOM } from "react";
import '../static/css/Nav.css';


function Nav(props) {
    return (<div>
        <div className="wrapper-head">

            {props.a==true && <p className="account">ACCOUNT NUMBER: <span className="account-num">{props.account}</span></p>}

        </div>
        <header>

            <div className='header-left'>
                {/*<img src={Cir} className="cir"/>*/}
                <p>VOTING SYSTEM</p>
            </div>
            <div className='header-right'>
                <a href=''>{props.a1}</a>
                <a href=''>Get Started</a>
                <a href=''>About Us</a>
                <a href=''>Notice</a>
                <button className='btn-help'>Help</button>
            </div>
        </header>
    </div>
    );
}
export default Nav;