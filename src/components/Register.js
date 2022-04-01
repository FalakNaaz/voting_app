import {Moralis} from 'moralis';
import React from 'react';
import ReactDOM from 'react-dom';
import Nav from '../components/Nav';
import '../static/css/Reg.css';
const serverUrl = "https://obtz1utqtwxn.usemoralis.com:2053/server";
const appId = "BU9h9ioUi5crW9o8GDCqwHlAQTKA2lR7LCBTZKEj";
Moralis.start({ serverUrl, appId });

class Register extends React.Component{
    constructor(props) {
        super(props);
        this.state = {email: '', adhaar: '', gender: '', name: ''};
        
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        if(event.target.name === 'email')
          this.setState({email: event.target.value});
        else if(event.target.name === 'adhaar')
          this.setState({adhaar: event.target.value});
        else if(event.target.name === 'gender')
          this.setState({gender: event.target.value});
        else if(event.target.name === 'name')
          this.setState({name: event.target.value});
      
  
      }
      async auth(){
        await Moralis.authenticate();
        const user = Moralis.User.current();
          console.log(user)
          //user.set("nickname", "arifa")
          console.log(user.get("nickname"))
      }
       handleSubmit(event)  {
        this.auth()
          
        // alert('Email is: ' + this.state.email);
        // alert('Adhaar is: ' + this.state.adhaar);
        // alert('Gender is: ' + this.state.gender);
        alert('Name is: ' + this.state.name);
        
        event.preventDefault();
      }
    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <div className='wrapper'>
                <Nav></Nav>
                
                <div className='reg-sec'>

                    <div className="form-body">
                        <div className="username">
                            <label className="form__label" for="name">First Name </label>
                            <input className="form__input" type="text" name="name" id="name" placeholder="Name" onChange={this.handleChange}/>
                        </div>
                        <div className="gender">
                            <label className="form__label" for="gender">Gender </label>
                            <input type="text" name="gender" id="gender" className="form__input" placeholder="gender" onChange={this.handleChange}/>
                        </div>
                        <div className="email">
                            <label className="form__label" for="email">Email </label>
                            <input type="email" name='email' id="email" className="form__input" placeholder="Email" onChange={this.handleChange}/>
                        </div>
                        <div className="adhaar">
                            <label className="form__label" for="password">Adhar Number </label>
                            <input className="form__input" type="password" name='adhaar' id="password" placeholder="Adhar Number" onChange={this.handleChange}/>
                        </div>
                    </div>

                </div>
                <div className='reg'>
                <input type="submit" value="Submit" className='btn-reg' />
                </div>
            </div>   
        </form>
     
    );
    }
}

export default Register;