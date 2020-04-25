import { Component, ViewChild, ElementRef } from '@angular/core';
import {CovidService } from '../api/covid.service';
import { currentUSData } from '../models/models';
import { Chart } from 'chart.js';
import * as $ from 'jquery';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild('usCanvas', {static: true}) usChartRef: ElementRef;
  public usData: currentUSData;
  public currentFilterName: string = "U.S. Statistics";
  private usChart: Chart.barChart;
  constructor(public covid:CovidService, private elementRef: ElementRef) {
    this.getUsData();
    this.drawUsChart();
  }

  getUsData() {
    return this.covid.getUSData().toPromise().then((result) => {
      this.usData = result[0];
    });
  }
  
  drawUsChart() {
    console.log(this.usChartRef);
    this.usChart = new Chart(this.usChartRef.nativeElement, {
      type: "bar",
      data: {
        labels: ["Deaths", "Total", "Positives", "Negatives"],
        datasets: [
          {
            label: "# of Test Results",
            data: [12, 19, 3, 5],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)"            
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
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

