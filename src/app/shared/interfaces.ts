import { HttpClient } from '@angular/common/http';
import { Injector } from '@angular/core';
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
  protected httpClient: HttpClient;
  constructor(protected injector: Injector) {
    this.httpClient = injector.get(HttpClient);
  }
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
