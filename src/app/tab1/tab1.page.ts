import { Component, ViewChild, ElementRef } from '@angular/core';
import {CovidService } from '../api/covid.service';
import { currentUSData, historicalUSData, historicalUSDataItem, currentStateData, currentStateDataItem, historicalStateDataItem, historicalStateData } from '../models/models';
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
  public stateData: currentStateDataItem;
  public stateHistoricalData: historicalStateDataItem[];
  public currentFilterName: string = "U.S. Statistics";
  public selectedState:string = "VT";
  public view:string = "US";
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
    this.view = "US";
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
    var usChart = new Chart(ctx, {
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
  
  selectUsData() {
      this.getUsData().then(() => 
      this.drawUsChart()
    );

    this.getUsHistoricalData().then(() => 
      this.drawUsHistoricalChart()
    );
    // $('#usCanvas').removeClass('ion-hide');
    // $('#usHistoricalCanvas').removeClass('ion-hide')
    // $('#stateCanvas').addClass('ion-hide');
    // $("#stateHistoricalCanvas").addClass('ion-hide');
    // $('#usNumbers').removeClass('ion-hide');
    // $('#stateNumbers').addClass('ion-hide');
    this.currentFilterName = `U.S. Statistics`;
    this.view = "US";
  }

  /* start date */
  selectStateData() {
    this.getStateData().then(() =>
      this.drawStateChart()
    );

    this.getStateHistoricalData().then(() =>
      this.drawStateHistoricalChart()
    );

    // $('#usCanvas').addClass('ion-hide');
    // $('#usHistoricalCanvas').addClass('ion-hide')
    // $('#stateCanvas').removeClass('ion-hide');
    // $("#stateHistoricalCanvas").removeClass('ion-hide');
    // $('#usNumbers').addClass('ion-hide');
    // $('#stateNumbers').removeClass('ion-hide');
    this.currentFilterName = `${this.selectedState} Statistics`;
    this.view = "State";
  }

  getStateData() {
    return this.covid.getStateData().toPromise().then((result:currentStateDataItem[]) => {
      const selectedStateData = result.find(r => r.state === this.selectedState);
      selectedStateData.deathPretty = numeral(selectedStateData.death).format('0,0');
      selectedStateData.positivePretty = numeral(selectedStateData.positive).format('0,0');
      selectedStateData.negativePretty = numeral(selectedStateData.negative).format('0,0');
      selectedStateData.totalPretty = numeral(selectedStateData.total).format('0,0');
      this.stateData = selectedStateData;
    });
  }

  drawStateChart() {
    var ctx = document.getElementById('stateCanvas');
    var stateChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Deaths", "Positives", "Negatives", "Total"],
        datasets: [
          {
            data: [this.stateData.death, this.stateData.positive, this.stateData.negative, this.stateData.total],
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

  getStateHistoricalData() {
    return this.covid.getStateHistoricalData(this.selectedState).toPromise().then((result:historicalStateDataItem[]) => {
      this.stateHistoricalData = result;
      this.stateHistoricalData.forEach(item => {
        item.deathPretty = item.death === undefined ? '0' : numeral(item.death).format('0,0');
        item.positivePretty = item.positive === undefined ? '0' : numeral(item.positive).format('0,0');
        item.negativePretty = item.negative === undefined ? '0' : numeral(item.negative).format('0,0');
        item.totalPretty = item.total === undefined ? '0' : numeral(item.total).format('0,0');
      });
    });
  }
  
  drawStateHistoricalChart() {
    const dates:string[] = this.stateHistoricalData.map(({ date }) => moment(date, "YYYYMMDD").format('MM/DD/YYYY'));
    const deaths: number[] = this.stateHistoricalData.map(({ death }) => death);
    const positives: number[] = this.stateHistoricalData.map(({ positive }) => positive);
    const negatives: number[] = this.stateHistoricalData.map(({ negative }) => negative);
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
    var ctx = document.getElementById('stateHistoricalCanvas');
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

