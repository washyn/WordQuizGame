import { Injector, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ElementWord, GetDataStrategy, IGetDataStrategy } from './interfaces';
import {
  gerRandomBetween,
  guidGenerator,
  mapData,
  mapDataAndPeek,
  parseCSV,
} from './utils';

export class LocalCSVStrategy extends GetDataStrategy {
  getData(fileName: string): Observable<ElementWord> {
    let tempResponse = this.httpClient
      .get('/' + fileName, {
        responseType: 'text',
      })
      .pipe(
        map((data: string) => {
          let csvContent = parseCSV(data);
          let mapedData = mapDataAndPeek(csvContent, 10);
          return mapData(mapedData);
        })
      );
    return tempResponse;
  }
}
