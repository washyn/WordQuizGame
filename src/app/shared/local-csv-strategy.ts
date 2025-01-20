import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ElementWord } from '../app.component';
import { IGetDataStrategy } from './interfaces';
import { gerRandomBetween, guidGenerator } from './utils';

export class LocalCSVStrategy implements IGetDataStrategy {
  strategyName: string =
    'English new words learned - Palabras más escritas en inglés.csv';

  private httpClient = inject(HttpClient);
  words: [string, string, string][] = [];

  // esto solo deberia devolver la data y otro metodo hacer el slice.
  getData(): Observable<ElementWord> {
    let tempResponse = this.httpClient
      .get('/English new words learned - Palabras más escritas en inglés.csv', {
        responseType: 'text',
      })
      .pipe(
        map((data: string) => {
          const lines = data.split('\n');
          this.words = lines.slice(1).map((line) => {
            const values = line.split(',');
            return [values[0], values[1], values[2]];
          });
          return this.mapData();
        })
      );
    return tempResponse;
  }

  mapData() {
    let nWords = gerRandomBetween(10, 10);
    let counter = 0;
    let data: [string, string, string][] = [];
    while (data.length < nWords) {
      let randomWord = this.getRandomWord();
      if (!data.some((element) => element[0] === randomWord[0])) {
        data.push(randomWord);
        counter++;
      }
    }

    let resultData: ElementWord = {
      elementsA: [],
      elementsB: [],
    };
    data.forEach((element) => {
      resultData.elementsA.push({
        id: guidGenerator(),
        text: element[1],
        idAssociated: element[0],
      });
      resultData.elementsB.push({
        id: guidGenerator(),
        text: element[2],
        idAssociated: element[0],
      });
    });
    return resultData;
  }

  getRandomWord() {
    let randomIndex = gerRandomBetween(0, this.words.length - 1);
    return this.words[randomIndex];
  }
}
