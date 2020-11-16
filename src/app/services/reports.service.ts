import {EventEmitter, Injectable, Output} from '@angular/core';
import report from '../../Reports.json';
import {FeedbackUtenti} from "../classes/FeedbackUtenti/FeedbackUtenti";
import {HttpClient} from "@angular/common/http";
import {Gpx} from "../classes/FeedbackUtenti/Gpx";
import {ToInitialize} from "../classes/ToInitialize";
import {Categoria} from "../classes/FeedbackUtenti/Categoria";

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private feedbackUtenti: FeedbackUtenti[] = [];
  @Output() isServiceReady = new EventEmitter<boolean>();
  private serviceReady = false;
  constructor(private httpClient: HttpClient) {}
  getServiceReady(): boolean{
      return this.serviceReady;
  }
  getReports(): void{
    this.httpClient.get<any>("assets/Reports.json").subscribe(
        json => {
            this.feedbackUtenti = json;
            this.serviceReady = true;
            this.isServiceReady.emit(true);
        }
    );
  }

  getSerieSettimana(): Array<number>{
    let serie: Array<number> = [];
    if (this.feedbackUtenti.length == 0) {
        serie[0] = 1;
        serie[1] = 1;
        serie[2] = 1;
        serie[3] = 1;
        serie[4] = 1;
        serie[5] = 1;
        serie[6] = 1;
        return serie;
    }
    else{

        let dataSegnalazione: string;
        // non posso cambiare le date ogni giorno nel JSON... let today = new Date().getTime();
        let todaySt = 'Mon Nov 09 2020 19:32:31 GMT+0100';
        let today = new Date(todaySt).getTime();
        let countPerDays: number[] = [ 4, 20, 13, 60, 22, 33, 40 ];
        // DEVE partire da 0 MA per mostrare meglio il grafico lo faccio particolare
        // let countPerDays: number[] = [ 0, 0, 0, 0, 0, 0, 0 ];

        this.feedbackUtenti.forEach(
            (feedbackUtente) => {
                dataSegnalazione = feedbackUtente.dataSegnalazione;
                let diff = (today - new Date(dataSegnalazione).getTime());
                let diffDays = Math.ceil(diff / (1000 * 3600 * 24)) - 1;
                if (diffDays < 7) {
                    countPerDays[6 - diffDays]++;
                }
            }
        );
        return countPerDays;
    }
  }

    getLastUpdateInfo(): string{
      let lastSegnalation = this.feedbackUtenti[this.feedbackUtenti.length-1].dataSegnalazione;
      // Stesso ragionamento di getSerieSettimana()
      let todaySt = 'Mon Nov 09 2020 19:32:31 GMT+0100';
      let today = new Date(todaySt).getTime();
      let diff = (today - new Date(lastSegnalation).getTime());
      let diffSeconds = Math.ceil(diff / (1000));
      if ( diffSeconds < 0 ){
          return 'L\'ultima segnalazione risale a 0 secondi fa.';
      }
      else if ( diffSeconds >= 0 && diffSeconds <= 59 ){
            return 'L\'ultima segnalazione risale a ' + diffSeconds + ' secondi fa.';
      }
      else if( diffSeconds >= 60 && diffSeconds < 60*60){
          return 'L\'ultima segnalazione risale a ' + Math.ceil(diffSeconds / 60 ) + ' minuti fa.';
      }else {
          return 'L\'ultima segnalazione risale a ' + Math.ceil(diffSeconds / 3600 ) + ' ore fa.';
      }
    }

    getAllCoords(): Gpx[]{
        let allCoords = new Array<Gpx>();
        this.feedbackUtenti.forEach(
            (feedback) => allCoords.push(feedback.gpx)
        );

        return allCoords;
    }

    getToInitialize() {
      let toInitialize = new Array<ToInitialize>();
      let todaySt = 'Mon Nov 09 2020 19:32:31 GMT+0100';
      let today = new Date(todaySt).getTime();
      this.feedbackUtenti.forEach(
          (feedback) => {
              let categories = feedback.evento.categorias;
              let gravita = 1;
              categories.forEach(
                  categoria => {
                      let gravitaTemp = 1;
                      switch (categoria.nome){
                          case 'Evento Atmosferico':
                              gravitaTemp = 3;
                              break;
                          case 'Segnalazione Ambiente':
                              gravitaTemp = 2;
                              break;
                          case 'Segnalazione Città':
                              gravitaTemp = 1;
                              break;
                      }
                      if (gravita < gravitaTemp){
                          gravita = gravitaTemp;
                      }
                  }
              )
              let diff = (today - new Date(feedback.dataSegnalazione).getTime());
              let diffDays = Math.ceil(diff / (1000 * 3600 * 24)) - 1;
              let record: ToInitialize = new ToInitialize(feedback.gpx, diffDays, gravita);
              toInitialize.push(record);
          }
      )
        return toInitialize;
    }

    getCategories(): string[]{
      let categories = new Array<string>();
      this.feedbackUtenti.forEach(
          (feedback) => {
              feedback.evento.categorias.forEach(
                  (categoria) => {
                      categories.push(categoria.nome);
                  }
              );
          }
      );
      categories = categories.filter((item, index) => categories.indexOf(item) === index);
      return categories.sort();
    }
}
