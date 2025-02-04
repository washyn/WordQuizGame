import { ElementWord } from './interfaces';

export function guidGenerator() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
export function gerRandomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function mapData(data: [string, string, string][]) {
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

export function mapDataAndPeek(
  data: [string, string, string][],
  length: number = 10
) {
  let nWords = gerRandomBetween(length, length);
  let counter = 0;
  let dataResult: [string, string, string][] = [];
  while (dataResult.length < nWords) {
    let randomWord = getRandomWord(data);
    if (!dataResult.some((element) => element[0] === randomWord[0])) {
      dataResult.push(randomWord);
      counter++;
    }
  }
  return dataResult;
}

export function getRandomWord(data: [string, string, string][]) {
  let randomIndex = gerRandomBetween(0, data.length - 1);
  return data[randomIndex];
}

export function parseCSV(csvContent: string): [string, string, string][] {
  return csvContent
    .split('\n')
    .slice(1)
    .map((line) => line.split(','))
    .map((element) => {
      return [element[0], element[1], element[2]];
    });
}
