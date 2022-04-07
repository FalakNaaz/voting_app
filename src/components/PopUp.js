import React, { Component } from "react";
import '../static/css/Styles.css';


export default class PopUp extends Component {
  handleClick = () => {
    this.props.toggle();
  };
  render() {
    return (
      <div className="modal">
        <div className="modal_content">
          <span className="close" onClick={this.handleClick}>
            &times;
          </span>
          <form>
            <div className='reg-sec'>

              <div className="form-body">


                <h3>Candidate Information</h3>
                <label>
                  Address: {this.props.ethaddress}
                </label><br/>
                <label> Name: {this.props.name}</label><br/>
                <label> Gender: {this.props.gender}</label><br/>
                <label> Email: {this.props.email}</label><br/>
                <label> Adhar Card Number: {this.props.adhar}</label><br/>
                <label> Address: {this.props.address}</label><br/>
                <label> Region: {this.props.region}</label><br/>
                <br />
              </div></div>
          </form>
        </div>
      </div>
    );
  }
}