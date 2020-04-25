import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, from, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { currentUSData } from '../models/models';

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
}
