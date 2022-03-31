import React from 'react'
class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {email: '', adhaar: '', gender: '', address: ''};
      
  
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
      else if(event.target.name === 'address')
        this.setState({address: event.target.value});
    

    }
  
  
    handleSubmit(event) {
      alert('Email is: ' + this.state.email);
      alert('Adhaar is: ' + this.state.adhaar);
      alert('Gender is: ' + this.state.gender);
      alert('Address is: ' + this.state.address);
      event.preventDefault();
    }
    
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Email:
            <input name='email' type="text" value={this.state.email} onChange={this.handleChange} />
          </label><br/>
          <label>
            Adhaar:
            <input name='adhaar' type="text" value={this.state.adhaar} onChange={this.handleChange} />
          </label><br/>
          <label>
            Select Gender:<br/>
            <input name='gender' type="radio"  value="Male" onChange={this.handleChange} />Male<br/>
            <input name='gender' type="radio"  value="Female" onChange={this.handleChange} />Female<br/>
            <input name='gender' type="radio"  value="Other" onChange={this.handleChange} />Other<br/>
          </label><br/>
          <label for="cars">Choose address:</label>

            <select name="address" >
            <option value="Address 1">Address 1</option>
            <option value="Address 2">Address 2</option>
            <option value="Address 3">Address 3</option>
            <option value="Address 4">Address 4</option>
            </select><br/>
          <input type="submit" value="Submit" />
        </form>
        // <div>hello</div>
      );
    }
  }
  export default NameForm;