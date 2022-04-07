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
            <h3>Register!</h3>
            <label>
              Name:{this.props.address}
              Name:{this.props.name}
            </label>
            <br />
           
          </form>
        </div>
      </div>
    );
  }
}