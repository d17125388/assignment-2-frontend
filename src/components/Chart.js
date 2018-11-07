import React, {Component} from 'react';
import axios from 'axios';
import {HorizontalBar} from 'react-chartjs-2';

// const API_URL = `http://localhost:5000/api`;
const API_URL = `/api`;

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {},
      requestData: [],
    };
  }

  componentDidMount() {
    // axios.get(`http://slowwly.robertomurray.co.uk/delay/3000/url/https://reqres.in/api/unknown`)
    axios.get(API_URL)
      .then(res => {
        let data = res.data;
        let labels = this.getLabels(data);
        let dataAsPercentages = this.dataAsPercentages(data);

        let newChartData = {
          labels: labels,
          datasets: [
            {
              data: dataAsPercentages,
              backgroundColor: '#ffb935'
            }
          ]
        };
        this.setState((state, props) => ({
          chartData: newChartData
        }), () => {
          this.forceUpdate();
        }
      );
    });
  }

  render() {
    if (this.state.chartData.datasets) {
      return (
        <div className="chart">
          <HorizontalBar
            data = {this.state.chartData}
            options = {{
              title: {
                display: true,
                text: 'Years Coding Professionally',
                fontSize: 25
              },
              legend: {
                display: false,
                position: 'right'
              }
            }}
          />
        </div>
      );
    }
    return (<div>Loading...</div>)


  }

  dataAsPercentages(obj) {
    let percentageArray = []
    let total = 0;
    for (let key in obj) {
      total += obj[key]
    }
    for (let key in obj) {
      let percentage = obj[key] / total * 100;
      percentageArray.push(Math.round(percentage * 10) / 10)
    }
    return percentageArray;
  }

  getLabels(obj) {
    let labels = []
    for (let key in obj) {
      labels.push(key);
    }
    return labels
  }



}

export default Chart;
