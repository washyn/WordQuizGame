import { Injector } from '@angular/core';
import { ElementWord } from '../app.component';
import { commonWords2 } from './common-words-2';
import { IGetDataStrategy } from './get-data-strategy-1';
import { gerRandomBetween, guidGenerator } from './utils';

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

    return Promise.resolve(resultData);
  }

  genData() {
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
    return data;
  }

  getRandomWord() {
    let randomIndex = gerRandomBetween(0, commonWords2.length - 1);
    return commonWords2[randomIndex];
  }
}
