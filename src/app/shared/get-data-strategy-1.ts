import { ElementWord } from '../app.component';
import { commonWords1 } from './common-words-1';
import { gerRandomBetween, guidGenerator } from './utils';

export interface DataStructure {
  id: string;
  spanish: string;
  english: string;
}

export interface IGetDataStrategy {
  strategyName: string;
  getData(): Promise<ElementWord>;
}

export abstract class GetDataStrategy implements IGetDataStrategy {
  strategyName!: string;
  abstract getData(): Promise<ElementWord>;
}

export class CommonWords1 implements IGetDataStrategy {
  strategyName: string = 'Common words 1';
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
    let nWords = gerRandomBetween(2, 4);
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
    let randomIndex = gerRandomBetween(0, commonWords1.length - 1);
    return commonWords1[randomIndex];
  }
}
