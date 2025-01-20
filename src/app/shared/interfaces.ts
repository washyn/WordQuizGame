import { Observable, of } from 'rxjs';
import { ElementWord } from '../app.component';
import { gerRandomBetween, guidGenerator } from './utils';

export interface DataStructure {
  id: string;
  spanish: string;
  english: string;
}

export interface IGetDataStrategy {
  strategyName: string;
  getData(): Observable<ElementWord>;
}

export abstract class GetDataStrategy implements IGetDataStrategy {
  strategyName!: string;
  abstract getData(): Observable<ElementWord>;
}
