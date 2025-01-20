import { Injector } from '@angular/core';
import { ElementWord } from '../app.component';
import { commonWords2 } from './common-words-2';
import { IGetDataStrategy } from './get-data-strategy-1';

export class CommonWords2 implements IGetDataStrategy {
  strategyName: string = 'Common words 2';
  getData(): Promise<ElementWord> {
    let resultData: ElementWord = {
      elementsA: [],
      elementsB: [],
    };

    let tempData = this.genData();
    // map
    tempData.forEach((element) => {
      resultData.elementsA.push({
        id: this.guidGenerator(),
        text: element[1],
        idAssociated: element[0],
      });
      resultData.elementsB.push({
        id: this.guidGenerator(),
        text: element[2],
        idAssociated: element[0],
      });
    });

    return Promise.resolve(resultData);
  }

  genData() {
    let nWords = this.gerRandomBetween(4, 5);
    let counter = 0;
    let data: [string, string, string][] = [];
    while (data.length < nWords) {
      let randomWord = this.getRandomWord();
      if (!data.some((element) => element[0] === randomWord[0])) {
        data.push(randomWord);
        counter++;
      }
    }
    return data;
  }

  gerRandomBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  getRandomWord() {
    let randomIndex = this.gerRandomBetween(0, commonWords2.length - 1);
    return commonWords2[randomIndex];
  }

  guidGenerator() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
}
