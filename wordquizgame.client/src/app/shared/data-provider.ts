import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ElementWord } from './interfaces';
import { mapData, mapDataAndPeek, parseCSV } from './utils';

@Injectable({
  providedIn: 'root',
})
export class DataProvider {
  constructor() {}

  getData(): Observable<ElementWord> {
    let data = localStorage.getItem('csvData');
    if (data) {
      let stringContent = JSON.parse(data).data as string;
      let csvContent = parseCSV(stringContent);
      let mapedData = mapDataAndPeek(csvContent, 10);
      return of(mapData(mapedData));
    }
    return of({
      elementsA: [],
      elementsB: [],
    });
  }
}
