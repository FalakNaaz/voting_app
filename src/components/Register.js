import React from 'react';
import ReactDOM from 'react-dom';
import Nav from '../components/Nav';
import '../static/css/Reg.css';

const Register = () => {
    return (
        <div className='wrapper'>
            <Nav></Nav>
            <div className='reg-sec'>

                <div className="form-body">
                    <div className="username">
                        <label className="form__label" for="firstName">First Name </label>
                        <input className="form__input" type="text" id="firstName" placeholder="First Name" />
                    </div>
                    <div className="lastname">
                        <label className="form__label" for="lastName">Last Name </label>
                        <input type="text" name="" id="lastName" className="form__input" placeholder="LastName" />
                    </div>
                    <div className="email">
                        <label className="form__label" for="email">Email </label>
                        <input type="email" id="email" className="form__input" placeholder="Email" />
                    </div>
                    <div className="adhar">
                        <label className="form__label" for="password">Adhar Number </label>
                        <input className="form__input" type="password" id="password" placeholder="Adhar Number" />
                    </div>
                </div>

            </div>
            <div className='reg'>
                <button className='btn-reg'>Register!</button>
            </div>
        </div>
    );
}

export default Register;