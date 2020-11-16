import { Gpx } from './Gpx';
import { Evento } from './Evento';
import { Zona } from './Zona';

export class FeedbackUtenti {
  public idsegnalazione: string;
  public dataSegnalazione: string;
  public gpx: Gpx;
  public evento: Evento;
  public iduser?: number;
  public immagini: string[];
  public descrizioni?: any;
  public zona: Zona;
}
