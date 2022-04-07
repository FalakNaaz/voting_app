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
                <a href=''>{props.a2}</a>
                <a href=''>{props.a3}</a>
                <a href=''>{props.a4}</a>
                <button className='btn-help'>Help</button>
            </div>
        </header>
    </div>
    );
}
export default Nav;