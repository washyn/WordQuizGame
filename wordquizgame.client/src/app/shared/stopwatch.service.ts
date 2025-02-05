import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StopwatchService {
  private elapsedTime = 0; // Tiempo en segundos
  private isRunning = false;
  private timeSubject = new BehaviorSubject<number>(0);
  public time$: Observable<string> = this.timeSubject
    .asObservable()
    .pipe(map((seconds) => this.formatTime(seconds)));

  constructor() {}

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      interval(1000)
        .pipe(
          tap(() => {
            if (this.isRunning) {
              this.elapsedTime++;
              this.timeSubject.next(this.elapsedTime);
            }
          })
        )
        .subscribe();
    }
  }

  pause() {
    this.isRunning = false;
  }

  reset() {
    this.isRunning = false;
    this.elapsedTime = 0;
    this.timeSubject.next(0);
  }

  private formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(secs)}`;
  }

  private pad(value: number): string {
    return value.toString().padStart(2, '0');
  }

  getCurrentTime(): string {
    return this.formatTime(this.timeSubject.getValue());
  }
}
