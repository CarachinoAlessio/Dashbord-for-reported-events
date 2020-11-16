import { Categoria } from './Categoria';

export class Evento{
  public idevento: string;
  public titolo: string;
  public descrizione?: any;
  // tslint:disable-next-line:variable-name
  public data_attivazione: any;
  public categorias: Categoria[];
  public immagineUrl?: any;
  // tslint:disable-next-line:variable-name
  public request_login: number;
}
