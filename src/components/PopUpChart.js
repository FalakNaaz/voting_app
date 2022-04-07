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

    let r1Count = this.props.region1Counter
    let r2Count = this.props.region2Counter
    let r3Count = this.props.region3Counter
    console.log("r2Count",r2Count)
    this.state = {
      labels: ['Male', 'Female'],
      series: [+mCount,+fCount],
      options:{},
      options2: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: ['Region 1', 'Region 2', 'Region 3']
        }
      },
      series2: [
        {
          name: "series-1",
          data: [+r1Count, +r2Count, +r3Count]
        }
      ]
      
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
        <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options2}
              series={this.state.series2}
              type="bar"
              width="500"
            />
          </div>
        </div>
      </div>
        </div>
        </div>
      </div>
    );
  }
}