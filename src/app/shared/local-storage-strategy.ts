import { Observable, of } from 'rxjs';
import { ElementWord, GetDataStrategy, IGetDataStrategy } from './interfaces';
import { Injector } from '@angular/core';
import { mapData, mapDataAndPeek, parseCSV } from './utils';

// TODO: this method shoud not be receive fileName
export class LocalStorageStrategy extends GetDataStrategy {
  getData(fileName: string): Observable<ElementWord> {
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
