import { ElementWord } from './interfaces';

export interface DataStructure {
  id: string;
  spanish: string;
  english: string;
}
// Cada juego terminado deberia guardarse en la base de datos, para tener registro y estadistica...
// cuantos aciertos y errores...
export interface IGetDataStrategy {
  getData(): Promise<ElementWord>;
}

export abstract class GetDataStrategy implements IGetDataStrategy {
  abstract getData(): Promise<ElementWord>;
}
