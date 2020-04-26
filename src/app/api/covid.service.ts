import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, from, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { currentUSData, historicalUSData, historicalUSDataItem, currentStateData, currentStateDataItem, historicalStateData, historicalStateDataItem } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class CovidService {
  baseUrl:string = "https://covidtracking.com/api/v1/";
  
  constructor(public http: HttpClient) { }

  public getUSData() {
    console.log('Getting US data...');
    return this.http.get(`${this.baseUrl}us/current.json`).pipe(map(results => {
      console.log(results);
      return new currentUSData(results);     
    }));
  }

  public getUSHistoricalData() {
    console.log('Getting US historical data...');
    return this.http.get(`${this.baseUrl}us/daily.json`).pipe(map(results => {
      console.log(results);
      let items:any = results;
      const startDate:Date = new Date("03/01/2020");
      const selectedItems:historicalUSDataItem[] = items.filter(item => {
         let date = new Date(item.dateChecked);
         return date >= startDate;
      });

      const finalItems: historicalUSDataItem[] = selectedItems.sort((n1,n2) => {
        if (n1.date > n2.date) {
            return 1;
        }
    
        if (n1.date < n2.date) {
            return -1;
        }
        return 0;
      });
      return finalItems;     
    }));
  }

  public getStateData() {
    console.log(`Getting data for all 50+ states and territories...`);
    return this.http.get(`${this.baseUrl}states/current.json`).pipe(map(results => {
      return results as currentStateDataItem[];     
    }));
  }
  
  public getStateHistoricalData(state:string) {
    console.log('Getting US States historical data...');
    return this.http.get(`${this.baseUrl}states/daily.json`).pipe(map(results => {
      console.log(results);
      let items:any = results;
      const startDate:Date = new Date("03/01/2020");
      let selectedItems:historicalStateDataItem[] = items.filter(item => {
         let date = new Date(item.dateChecked);
         return date >= startDate;
      });

      selectedItems = items.filter(item => item.state === state);

      const finalItems: historicalStateDataItem[] = selectedItems.sort((n1,n2) => {
        if (n1.date > n2.date) {
            return 1;
        }
    
        if (n1.date < n2.date) {
            return -1;
        }
        return 0;
      });
      return finalItems;     
    }));
  }
}
