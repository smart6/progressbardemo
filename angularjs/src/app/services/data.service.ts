import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  loadData(){
    return this.http.get('http://pb-api.herokuapp.com/bars').pipe(delay(1000))
  }
}