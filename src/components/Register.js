import { Moralis } from 'moralis';
import React from 'react';
import ReactDOM from 'react-dom';
import Nav from '../components/Nav';
import '../static/css/Reg.css';

import { useNavigate} from 'react-router-dom';
const serverUrl = "https://obtz1utqtwxn.usemoralis.com:2053/server";
const appId = "BU9h9ioUi5crW9o8GDCqwHlAQTKA2lR7LCBTZKEj";
Moralis.start({ serverUrl, appId });

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = { email: '', adhaar: '', gender: '', name: '', address: '', region: '' };


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setGender = this.setGender.bind(this);
    this.setRegion = this.setRegion.bind(this);
  }

  handleChange(event) {
    if (event.target.name === 'email')
      this.setState({ email: event.target.value });
    else if (event.target.name === 'adhaar')
      this.setState({ adhaar: event.target.value });
    else if (event.target.name === 'address')
      this.setState({ address: event.target.value });
    else if (event.target.name === 'name')
      this.setState({ name: event.target.value });
   
  }
  setGender(event) {
    this.setState({ gender: event.target.value });
  }

  setRegion(event){
    this.setState({region:event.target.value});
    console.log(event.target.value);
  }
  async auth() {
    await Moralis.authenticate();
    const user = Moralis.User.current();
    console.log(user);
    //user.set("nickname", "arifa")
    user.set("name", this.state.name);
    user.set("email", this.state.email);
    user.set("adhar", this.state.adhaar);
    user.set("gender", this.state.gender);
    user.set("address", this.state.address);
    user.set("region", this.state.region);
    console.log(user.get("name"));

  }
  handleSubmit(event) {
    this.auth()

    // alert('Email is: ' + this.state.email);
    // alert('Adhaar is: ' + this.state.adhaar);
    // alert('Gender is: ' + this.state.gender);
    // alert('Name is: ' + this.state.name);
    // alert('Address is: ' + this.state.address);
    // alert('Region:' + this.state.region);
    event.preventDefault();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='wrapper'>


          <div className='reg-sec'>

            <div className="form-body">

              <p>REGISTER</p>


              <div className="username">
                <label className="form__label" for="name">First Name </label>
                <input className="form__input" type="text" name="name" id="name" placeholder="Name" onChange={this.handleChange} />
              </div>
              <div className="gender" onChange={this.setGender}>
                <label className="form__label" for="gender">Gender </label>

                Male:<input type='radio' name='gender' value="male" />
                Female:<input type='radio' name='gender' value="female" />
              </div>
              <div className="email">
                <label className="form__label" for="email">Email </label>
                <input type="email" name='email' id="email" className="form__input" placeholder="Email" onChange={this.handleChange} />
              </div>
              <div className="adhaar">
                <label className="form__label" for="adhar">Adhar Number </label>
                <input className="form__input" type="text" name='adhaar' placeholder="Adhar Number" onChange={this.handleChange} />
              </div>

              <div className="adhaar">
                <label className="form__label" for="address">Address </label>
                <input className="form__input" type="text" name='address' placeholder="Address" onChange={this.handleChange} />
              </div>

              <div className="region">
                <label className="form__label" for="region">Region </label>
                <select  onChange={this.setRegion} name="region">
                  <option value="aligarh">Aligarh</option>
                  <option  value="marehra">Marehra</option>
                </select>
               
              </div>
              <div className='reg'>
              <input type="submit" value="Submit" className='btn-reg' />
            </div>
            </div>
           
          </div>


        </div>
      </form>

    );
  }
}

export default Register;