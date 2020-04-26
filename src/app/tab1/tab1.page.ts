import { Component, ViewChild, ElementRef } from '@angular/core';
import {CovidService } from '../api/covid.service';
import { currentUSData, historicalUSData, historicalUSDataItem } from '../models/models';
import { Chart } from 'chart.js';
import * as $ from 'jquery';
import * as numeral from 'numeral';
import * as moment from 'moment';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild('usCanvas', {static: false}) usChartRef: ElementRef;
  public usData: currentUSData = new currentUSData();
  public usHistoricalData: historicalUSDataItem[];
  public stateData: currentStateData = new currentStateData();
  public stateHistoricalData: stateHistoricalData = new stateHistoricalData();
  public currentFilterName: string = "U.S. Statistics";
  public selectedState:string = "VT";
  public usStates = [
    { value: 'WY', label:' Wyoming'},
    { value: 'WI', label:' Wisconsin'},
    { value: 'WV', label:' West Virginia'},
    { value: 'WA', label:' Washington'},
    { value: 'VA', label:' Virginia'},
    { value: 'VT', label:' Vermont'},
    { value: 'UT', label:' Utah'},
    { value: 'TX', label:' Texas'},
    { value: 'TN', label:' Tennessee'},
    { value: 'SD', label:' South Dakota'},
    { value: 'SC', label:' South Carolina'},
    { value: 'RI', label:' Rhode Island'},
    { value: 'PA', label:' Pennsylvania'},
    { value: 'OR', label:' Oregon'},
    { value: 'OK', label:' Oklahoma'},
    { value: 'OH', label:' Ohio'},
    { value: 'ND', label:' North Dakota'},
    { value: 'NC', label:' North Carolina'},
    { value: 'NY', label:' New York'},
    { value: 'NM', label:' New Mexico'},
    { value: 'NJ', label:' New Jersey'},
    { value: 'NH', label:' New Hampshire'},
    { value: 'NV', label:' Nevada'},
    { value: 'NE', label:' Nebraska'},
    { value: 'MT', label:' Montana'},
    { value: 'MO', label:' Missouri'},
    { value: 'MS', label:' Mississippi'},
    { value: 'MN', label:' Minnesota'},
    { value: 'MI', label:' Michigan'},
    { value: 'MA', label:' Massachusetts'},
    { value: 'MD', label:' Maryland'},
    { value: 'ME', label:' Maine'},
    { value: 'LA', label:' Louisiana'},
    { value: 'KY', label:' Kentucky'},
    { value: 'KS', label:' Kansas'},
    { value: 'IA', label:' Iowa'},
    { value: 'IN', label:' Indiana'},
    { value: 'IL', label:' Illinois'},
    { value: 'ID', label:' Idaho'},
    { value: 'HI', label:' Hawaii'},
    { value: 'GA', label:' Georgia'},
    { value: 'FL', label:' Florida'},
    { value: 'DE', label:' Delaware'},
    { value: 'CT', label:' Connecticut'},
    { value: 'CO', label:' Colorado'},
    { value: 'CA', label:' California'},
    { value: 'AR', label:' Arkansas'},
    { value: 'AZ', label:' Arizona'},
    { value: 'AK', label:' Alaska'},
    { value: 'AL', label:' Alabama'}
  ];

  constructor(public covid:CovidService) {

  }

  ngAfterContentInit() {
    this.getUsData().then(() => 
      this.drawUsChart()
    );

    this.getUsHistoricalData().then(() => 
      this.drawUsHistoricalChart()
    );
    
  }

  getUsData() {
    return this.covid.getUSData().toPromise().then((result) => {
      this.usData = result[0];
      this.usData.deathPretty = numeral(this.usData.death).format('0,0');
      this.usData.positivePretty = numeral(this.usData.positive).format('0,0');
      this.usData.negativePretty = numeral(this.usData.negative).format('0,0');
      this.usData.totalPretty = numeral(this.usData.total).format('0,0');
    });
  }

  getUsHistoricalData() {
    return this.covid.getUSHistoricalData().toPromise().then((result) => {
      this.usHistoricalData = result;
      this.usHistoricalData.forEach(item => {
        item.deathPretty = numeral(item.death).format('0,0');
        item.positivePretty = numeral(item.positive).format('0,0');
        item.negativePretty = numeral(item.negative).format('0,0');
        item.totalPretty = numeral(item.total).format('0,0');
      });

    });
  }
  
  drawUsChart() {
    var ctx = document.getElementById('usCanvas');
    this.usChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Deaths", "Positives", "Negatives", "Total"],
        datasets: [
          {
            data: [this.usData.death, this.usData.positive, this.usData.negative, this.usData.total],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(54, 162, 235, 0.2)"

            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(54, 162, 235, 1)",            
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        legend: false,
        title: {
          display: true,
          text: "Cumulative Test Results",
          fontColor: 'white',
          fontSize: 24

        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }

  drawUsHistoricalChart() {
    const dates:string[] = this.usHistoricalData.map(({ date }) => moment(date, "YYYYMMDD").format('MM/DD/YYYY'));
    const deaths: number[] = this.usHistoricalData.map(({ death }) => death);
    const positives: number[] = this.usHistoricalData.map(({ positive }) => positive);
    const negatives: number[] = this.usHistoricalData.map(({ negative }) => negative);
    var historicalData = {
      labels: dates,
      datasets: [{
        label: 'Deaths',
        backgroundColor: 'red',
        borderColor: 'darkred',
        data: deaths,
        fill: false,
        lineTension: 0
      },
      {
        label: 'Positive',
        backgroundColor: 'orange',
        borderColor: 'orangered',
        data: positives,
        fill: false,
        lineTension: 0
      },{
        label: 'Negative',
        backgroundColor: 'green',
        borderColor: 'darkgreen',
        data: negatives,
        fill: false,
        lineTension: 0
      }]
    };
    var ctx = document.getElementById('usHistoricalCanvas');
    var kitsChart = new Chart(ctx, {
      type: 'line',
      data: historicalData,
      options: {
        legend: {
          display: 'bottom'
        },
        title: {
          display: true,
          text: 'Results By Date',
          fontSize: 24,
          fontColor: 'white'
        },
        tooltips: {
          mode: 'index',
          intersect: false
        },
        responsive: true,
        scales: {
          yAxes: [{
            id: 'Totals',
            type: 'linear',
            position: 'left',
            scaleLabel: {
              display: true,
              labelString: 'Total',
              fontColor: 'white'
            } //,
            // ticks: {
            //   min: 10000,
            //   max: 20000000
            // }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Date',
              fontColor: 'white'
            }
          }]
        }
      }
    });
  }
  
  /* state date */
  selectStateData() {
    this.getStateData().then(() =>
      this.drawStateChart()
    );
  }

  getStateData() {
    return this.covid.getStateData(this.selectedState).toPromise().then((result) => {
      this.usData = result[0];
      this.usData.deathPretty = numeral(this.usData.death).format('0,0');
      this.usData.positivePretty = numeral(this.usData.positive).format('0,0');
      this.usData.negativePretty = numeral(this.usData.negative).format('0,0');
      this.usData.totalPretty = numeral(this.usData.total).format('0,0');
    });
  }

  getStateHistoricalData() {
    return this.covid.getUSHistoricalData().toPromise().then((result) => {
      this.usHistoricalData = result;
      this.usHistoricalData.forEach(item => {
        item.deathPretty = numeral(item.death).format('0,0');
        item.positivePretty = numeral(item.positive).format('0,0');
        item.negativePretty = numeral(item.negative).format('0,0');
        item.totalPretty = numeral(item.total).format('0,0');
      });

    });
  }
  
  drawStateChart() {
    var ctx = document.getElementById('usCanvas');
    this.usChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Deaths", "Positives", "Negatives", "Total"],
        datasets: [
          {
            data: [this.usData.death, this.usData.positive, this.usData.negative, this.usData.total],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(54, 162, 235, 0.2)"

            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(54, 162, 235, 1)",            
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        legend: false,
        title: {
          display: true,
          text: "Cumulative Test Results",
          fontColor: 'white',
          fontSize: 24

        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }

  drawStateHistoricalChart() {
    const dates:string[] = this.usHistoricalData.map(({ date }) => moment(date, "YYYYMMDD").format('MM/DD/YYYY'));
    const deaths: number[] = this.usHistoricalData.map(({ death }) => death);
    const positives: number[] = this.usHistoricalData.map(({ positive }) => positive);
    const negatives: number[] = this.usHistoricalData.map(({ negative }) => negative);
    var historicalData = {
      labels: dates,
      datasets: [{
        label: 'Deaths',
        backgroundColor: 'red',
        borderColor: 'darkred',
        data: deaths,
        fill: false,
        lineTension: 0
      },
      {
        label: 'Positive',
        backgroundColor: 'orange',
        borderColor: 'orangered',
        data: positives,
        fill: false,
        lineTension: 0
      },{
        label: 'Negative',
        backgroundColor: 'green',
        borderColor: 'darkgreen',
        data: negatives,
        fill: false,
        lineTension: 0
      }]
    };
    var ctx = document.getElementById('usHistoricalCanvas');
    var kitsChart = new Chart(ctx, {
      type: 'line',
      data: historicalData,
      options: {
        legend: {
          display: 'bottom'
        },
        title: {
          display: true,
          text: 'Results By Date',
          fontSize: 24,
          fontColor: 'white'
        },
        tooltips: {
          mode: 'index',
          intersect: false
        },
        responsive: true,
        scales: {
          yAxes: [{
            id: 'Totals',
            type: 'linear',
            position: 'left',
            scaleLabel: {
              display: true,
              labelString: 'Total',
              fontColor: 'white'
            } //,
            // ticks: {
            //   min: 10000,
            //   max: 20000000
            // }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Date',
              fontColor: 'white'
            }
          }]
        }
      }
    });
  }
}

