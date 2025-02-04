import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClockService {
  private timeSubject = new BehaviorSubject<string>(this.getCurrentTime());
  public time$ = this.timeSubject.asObservable();
  constructor() {
    interval(1000)
      .pipe(map(() => this.getCurrentTime()))
      .subscribe(this.timeSubject);
  }
  private getCurrentTime() {
    let date = new Date();
    // let hours = date.getHours();
    // let minutes = date.getMinutes();
    // let seconds = date.getSeconds();
    // return `${hours}:${minutes}:${seconds}`;
    return new Date().toLocaleTimeString();
  }
}
