import { Component, ViewChild, ElementRef } from '@angular/core';
import {CovidService } from '../api/covid.service';
import { currentUSData } from '../models/models';
import { Chart } from 'chart.js';
import * as $ from 'jquery';
import * as numeral from 'numeral';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild('usCanvas', {static: false}) usChartRef: ElementRef;
  public usData: currentUSData;
  public currentFilterName: string = "U.S. Statistics";
  private usChart: Chart.barChart;
  constructor(public covid:CovidService) {

  }

  ngAfterContentInit() {
    this.getUsData().then(() => 
      this.drawUsChart()
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
}

