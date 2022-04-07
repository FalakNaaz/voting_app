import React, { Component } from 'react';
import Chart from 'react-apexcharts'
import { useLocation } from 'react-router-dom';

class Charts extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      options: {},
      series: [3, 1],
      labels: ['A', 'B', 'Coo', 'D', 'E']
    }
  }
  componentDidMount() {
      //const location = useLocation()
    console.log("product props is", this.props.match);
  }
  render() {
    console.log(this.props)
    return (
      <div className="donut">
        <Chart options={this.state.options} series={this.state.series} type="donut" width="380" />
      </div>
    );
  }
}

export default Charts;