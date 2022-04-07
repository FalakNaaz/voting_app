import React, { Component } from "react";
import '../static/css/Styles.css';
import Chart from 'react-apexcharts'

export default class PopUpChart extends Component {
  handleClick = () => {
    this.props.toggle();
  };
  constructor(props) {
    super(props);
    
    let mCount = this.props.maleCounter
    let fCount = this.props.femaleCounter
    this.state = {
      labels: ['Male', 'Female'],
      series: [+mCount,+fCount],
      options:{},
      
    }
  }
  render() {
    return (
      <div className="modal">
        <div className="modal_content">
          <span className="close" onClick={this.handleClick}>
            &times;
          </span>
          <div className="donut">
        <Chart options={this.state.options} series={this.state.series} labels={this.state.labels}    type="donut" width="380" />
        </div>
        </div>
      </div>
    );
  }
}