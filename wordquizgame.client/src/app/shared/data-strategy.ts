import { Observable, of } from 'rxjs';
import { ElementWord, GetDataStrategy, IGetDataStrategy } from './interfaces';
import { Injector } from '@angular/core';
import { mapData, mapDataAndPeek, parseCSV } from './utils';
// TODO: fix  file loader...
// export const LOAD_DATA_STRATEGY = {
//   LocalStorage(injector: Injector) {
//     return new LocalStorageStrategy(injector);
//   },
//   File(injector: Injector) {
//     return new LocalCSVStrategy(injector);
//   },
// };

// // strategy by file choised
// export class LocalStorageStrategy extends GetDataStrategy {
//   getData(): Observable<ElementWord> {
//     let data = localStorage.getItem('csvData');
//     if (data) {
//       let stringContent = JSON.parse(data).data as string;
//       let csvContent = parseCSV(stringContent);
//       let mapedData = mapDataAndPeek(csvContent, 10);
//       return of(mapData(mapedData));
//     }
//     return of({
//       elementsA: [],
//       elementsB: [],
//     });
//   }
// }

// // strategy by remote file, when choised, it will load the file and parse it
// export class LocalCSVStrategy extends GetDataStrategy {
//   getData(): Observable<ElementWord> {
//     // let tempResponse = this.httpClient
//     //   .get('/' + fileName, {
//     //     responseType: 'text',
//     //   })
//     //   .pipe(
//     //     map((data: string) => {
//     //       let csvContent = parseCSV(data);
//     //       let mapedData = mapDataAndPeek(csvContent, 10);
//     //       return mapData(mapedData);
//     //     })
//     //   );
//     // return tempResponse;
//   }
// }
