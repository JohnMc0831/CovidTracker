import { Component } from '@angular/core';
import {CovidService } from '../api/covid.service';
import { currentUSData, currentStateData, currentStateDataItem, historicalUSData, historicalUSDataItem, historicalStateData, historicalStateDataItem } from '../models/models';
import { Papa } from 'ngx-papaparse';
import * as $ from 'jquery';
import * as numeral from 'numeral';
import * as moment from 'moment';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public usTable:currentUSData = new currentUSData();
  public usHistory:any[];
  public stateTable: currentStateDataItem;
  public stateHistory: historicalStateDataItem[];
  public view: string = "US";
  public selectedState: string = "VT";
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

  constructor(public covid: CovidService, public papa: Papa) {
    this.usStates = this.usStates.sort((n1,n2) => {
      if (n1.label > n2.label) {
          return 1;
      }
      if (n1.label < n2.label) {
          return -1;
      }
      return 0;
    });

    let opts = {
      header: true,
      complete: (results) => {
        console.log("Parsed: ", results);
      }
    };

    this.covid.getUSTable().toPromise().then((csv:any) => {
      let parsed = this.papa.parse(csv, opts);
      parsed.data.forEach(item => {
        item.positive = numeral(item.positive).format('0,0');
        item.negative = numeral(item.negative).format('0,0');
        item.pending = numeral(item.pending).format('0,0');
        item.death = numeral(item.death).format('0,0');
        item.total = numeral(item.total).format('0,0');
      });
      this.usTable = parsed.data[0];
    });

    this.covid.getUSHistoryTable().toPromise().then((csv:any) => {
      let parsed = this.papa.parse(csv, opts);
      parsed.data.forEach(item => {
        item.date = moment(item.date).format("MM/DD/YYYY");
        item.positive = numeral(item.positive).format('0,0');
        item.negative = numeral(item.negative).format('0,0');
        item.pending = numeral(item.pending).format('0,0');
        item.death = numeral(item.death).format('0,0');
        item.total = numeral(item.total).format('0,0');
      });
      this.usHistory = parsed.data;
    });

    this.getStateTables();
   
  }

  updateState() {
    console.log(`State set to ${this.selectedState}`);
  }

  showUS() {
    this.view = "US";
  }

  showState() {
    this.view = "State";
    this.getStateTables();
  }

  getStateTables() {
    let opts = {
      header: true,
      complete: (results) => {
        console.log("Parsed: ", results);
      }
    };
    
    this.covid.getStateTable().toPromise().then((csv:any) => {
      let parsed = this.papa.parse(csv, opts);
      let filteredState = parsed.data.find(d => d.state === this.selectedState);
      filteredState.positive = numeral(filteredState.positive).format('0,0');
      filteredState.negative = numeral(filteredState.negative).format('0,0');
      filteredState.pending = numeral(filteredState.pending).format('0,0');
      filteredState.death = numeral(filteredState.death).format('0,0');
      filteredState.total = numeral(filteredState.total).format('0,0');
      this.stateTable = filteredState;
    });

    this.covid.getStateHistoryTable().toPromise().then((csv:any) => {
      let parsed = this.papa.parse(csv, opts);
      let filteredState = parsed.data.filter(d => d.state === this.selectedState);
      filteredState.forEach(item => {
        item.date = moment(item.date).format("MM/DD/YYYY");
        item.positive = numeral(item.positive).format('0,0');
        item.negative = numeral(item.negative).format('0,0');
        item.pending = numeral(item.pending).format('0,0');
        item.death = numeral(item.death).format('0,0');
        item.total = numeral(item.total).format('0,0');
      });
      this.stateHistory = filteredState;
    });
  }
}
