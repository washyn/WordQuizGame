import { Observable, of } from 'rxjs';

export interface DataStructure {
  id: string;
  spanish: string;
  english: string;
}

export interface IGetDataStrategy {
  getData(fileName: string): Observable<ElementWord>;
}

export abstract class GetDataStrategy implements IGetDataStrategy {
  abstract getData(fileName: string): Observable<ElementWord>;
}
export interface ElementWord {
  elementsA: ElementOption[];
  elementsB: ElementOption[];
}
export interface ElementOption {
  text: string;
  idAssociated: string;
  id: string;
}
