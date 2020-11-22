import {EventEmitter, Injectable, Output} from '@angular/core';
import {FeedbackUtenti} from "../classes/FeedbackUtenti/FeedbackUtenti";
import {HttpClient} from "@angular/common/http";
import {ToInitialize} from "../classes/ToInitialize";
import {Coordinate} from "ol/coordinate";
import {RisultatoRicerca} from "../search/search.component";


@Injectable({
    providedIn: 'root'
})
export class ReportsService {
    private feedbackUtenti: FeedbackUtenti[] = [];
    @Output() isServiceReady = new EventEmitter<boolean>();
    private serviceReady = false;

    constructor(private httpClient: HttpClient) {
    }

    getServiceReady(): boolean {
        return this.serviceReady;
    }

    //DASHBOARD -----------------------------------------------------------------------------------------------------
    getReports(): void {
        this.httpClient.get<any>("assets/Reports.json").subscribe(
            json => {
                this.feedbackUtenti = json;
                this.serviceReady = true;
                this.isServiceReady.emit(true);
            }
        );
    }

    getSerieSettimana(): Array<number> {
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
        } else {

            let dataSegnalazione: string;
            // non posso cambiare le date ogni giorno nel JSON... let today = new Date().getTime();
            let todaySt = 'Mon Nov 09 2020 19:32:31 GMT+0100';
            let today = new Date(todaySt).getTime();
            let countPerDays: number[] = [4, 20, 13, 60, 22, 33, 40];
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


    getOverallbest(): { overallBest: number, date: string }{
        let overallBest: number;
        let date: string[] = [];
        this.feedbackUtenti.forEach(
            (feedback) => date.push(feedback.dataSegnalazione.toString().split(' ')[0] ));
        date.sort();
        let j = 1;
        overallBest = 1;
        let mostFrequentDate = date[0];
        for (let i = 0; i < date.length ; i++){
            if (date[i] !== date[i+1]){
                if (overallBest < j){
                    overallBest = j;
                    mostFrequentDate = date[i];
                }
                j = 1;
            }else{
                j++;
            }
        }
        return { overallBest: overallBest, date: mostFrequentDate};
    }

    getLastUpdateInfo(): string {
        let lastSegnalation = this.feedbackUtenti[this.feedbackUtenti.length - 1].dataSegnalazione;
        // Stesso ragionamento di getSerieSettimana()
        let todaySt = 'Mon Nov 09 2020 19:32:31 GMT+0100';
        let today = new Date(todaySt).getTime();
        let diff = (today - new Date(lastSegnalation).getTime());
        let diffSeconds = Math.ceil(diff / (1000));
        if (diffSeconds < 0) {
            return 'L\'ultima segnalazione risale a 0 secondi fa.';
        } else if (diffSeconds >= 0 && diffSeconds <= 59) {
            return 'L\'ultima segnalazione risale a ' + diffSeconds + ' secondi fa.';
        } else if (diffSeconds >= 60 && diffSeconds < 60 * 60) {
            return 'L\'ultima segnalazione risale a ' + Math.ceil(diffSeconds / 60) + ' minuti fa.';
        } else {
            return 'L\'ultima segnalazione risale a ' + Math.ceil(diffSeconds / 3600) + ' ore fa.';
        }
    }


    getSegnalazioniUtentiSeries(): number[][]{
        let serieAnonimi: Array<number> = [];
        let serieRegistrati: Array<number> = [];

        if (this.feedbackUtenti.length == 0) {
            serieAnonimi[0] = 1; serieRegistrati[0] = 2;
            serieAnonimi[1] = 1; serieRegistrati[1] = 2;
            serieAnonimi[2] = 1; serieRegistrati[2] = 2;
            serieAnonimi[3] = 1; serieRegistrati[3] = 2;
            serieAnonimi[4] = 1; serieRegistrati[4] = 2;
            serieAnonimi[5] = 1; serieRegistrati[5] = 2;
            serieAnonimi[6] = 1; serieRegistrati[6] = 2;
            return [serieRegistrati, serieAnonimi];
        } else {

            let dataSegnalazione: string;
            // non posso cambiare le date ogni giorno nel JSON... let today = new Date().getTime();
            let todaySt = 'Mon Nov 09 2020 19:32:31 GMT+0100';
            let today = new Date(todaySt).getTime();
            serieAnonimi = [0, 0, 0, 0, 0, 0, 0];
            serieRegistrati = [0, 0, 0, 0, 0, 0, 0];
            // DEVE partire da 0 MA per mostrare meglio il grafico lo faccio particolare
            // let countPerDays: number[] = [ 0, 0, 0, 0, 0, 0, 0 ];

            this.feedbackUtenti.forEach(
                (feedbackUtente) => {
                    dataSegnalazione = feedbackUtente.dataSegnalazione;
                    let diff = (today - new Date(dataSegnalazione).getTime());
                    let diffDays = Math.ceil(diff / (1000 * 3600 * 24)) - 1;
                    if (diffDays < 7) {
                        if ( feedbackUtente.iduser == undefined ){
                            serieAnonimi[6 - diffDays]++;
                        } else{
                            serieRegistrati[6 - diffDays]++;
                        }
                    }
                }
            );
            return [serieRegistrati, serieAnonimi];
        }
    }

    getTotalReports(): number{
        return this.feedbackUtenti.length;
    }

    getSerieGiorniSettimana(): number[]{
        let giorni = [0, 0, 0, 0, 0, 0, 0];
        this.feedbackUtenti.forEach(
            (feedback) => {
                const date = new Date(feedback.dataSegnalazione);
                giorni[date.getDay()]++;
            }
        );
        return giorni;
    }

    //MAPPA ----------------------------------------------------------------------------------------------------------
    getToInitialize(gravityFilter: string[], reportCategoryFilter: string[]) {
        let toInitialize = new Array<ToInitialize>();
        let todaySt = 'Mon Nov 09 2020 19:32:31 GMT+0100';
        let today = new Date(todaySt).getTime();
        this.feedbackUtenti.forEach(
            (feedback) => {
                let ignoreGravity: boolean;
                let ignoreCategory: boolean;
                let gravityOK: boolean;
                let categoryOK: boolean;
                let categories = feedback.evento.categorias;
                let gravita = 1;
                categories.forEach(
                    categoria => {
                        let gravitaTemp = 1;
                        switch (categoria.nome) {
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
                        if (gravita < gravitaTemp) {
                            gravita = gravitaTemp;
                        }
                    }
                )
                let diff = (today - new Date(feedback.dataSegnalazione).getTime());
                let diffDays = Math.ceil(diff / (1000 * 3600 * 24)) - 1;
                let record: ToInitialize = new ToInitialize(feedback.idsegnalazione, feedback.gpx, diffDays, gravita);

                //FILTRO ---------------------------------------------------------------------------------
                ignoreGravity = gravityFilter[0] === 'tutte';
                ignoreCategory = reportCategoryFilter[0] === 'tutte';
                //FILTRO GRAVITA' ----------------------------------------------------------
                gravityOK = false;
                let gravitaString: string;
                switch (gravita) {
                    case 1:
                        gravitaString = 'leggera';
                        break;
                    case 2:
                        gravitaString = 'media';
                        break;
                    case 3:
                        gravitaString = 'grave';
                }
                if (gravityFilter.includes(gravitaString)) {
                    gravityOK = true;
                }


                //FILTRO CATEGORIA ----------------------------------------------------------
                categoryOK = false;
                categories.forEach(
                    (categoria) => {
                        if (reportCategoryFilter.includes(categoria.nome)) {
                            categoryOK = true;
                        }
                    }
                );


                if ((ignoreGravity || gravityOK) && (ignoreCategory || categoryOK)) {
                    toInitialize.push(record);
                }
            }
        )
        return toInitialize;
    }

    getCategories(): string[] {
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


    getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
        let raggioDellaTerra = 6371000;
        let dLat = (lat2 - lat1) * Math.PI / 180;
        let dLon = (lon2 - lon1) * Math.PI / 180;
        lat1 = lat1 * Math.PI / 180;
        lat2 = lat2 * Math.PI / 180;
        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return raggioDellaTerra * c; //risultato in metri
    }

    eventoPiuVicinoDaCoords(coords: Coordinate): FeedbackUtenti {
        let lonCoords = coords[0];
        let latCoords = coords[1];
        let feedbackPiuVicino = new FeedbackUtenti();
        let dist = Number.MAX_VALUE;
        this.feedbackUtenti.forEach(
            (feedback) => {
                let currentDist = this.getDistance(latCoords, lonCoords, feedback.gpx.lat, feedback.gpx.longt);
                if (currentDist < dist){
                    feedbackPiuVicino = feedback;
                    dist = currentDist;
                }
            }
        );


        return feedbackPiuVicino;
    }

    //SEARCH ----------------------------------------------------------------------------------------------------------

    getById(Id: string): FeedbackUtenti{
        for (let i = 0; i < this.feedbackUtenti.length; i++){
            if (this.feedbackUtenti[i].idsegnalazione === Id){
                return this.feedbackUtenti[i];
            }
        }
        return undefined;
    }

    /*getAllCities(): string[]{
        interface City{
            city: string
        }
        class Address{
            constructor(
                public address: City,
            ) {
            }
        }

        let cities = new Array<string>();
        this.feedbackUtenti.forEach(
            (feedback) => {
                let city: string;
                this.httpClient.get('http://nominatim.openstreetmap.org/reverse?format=json&lon=' + feedback.gpx.longt + '&lat=' + feedback.gpx.lat)
                    .subscribe(
                        (res: Address) => {
                            city = res.address.city;
                            cities.push(city);            console.log(cities.length);
                        }
                    );
            }
        );
        if (cities.length === this.feedbackUtenti.length) {
            cities = cities.filter((item, index) => cities.indexOf(item) === index);
            return cities.sort();
        }
        return [''];
    }*/
    getRisultatiRicercaByZone(zone: string, startDate: string, endDate: string): RisultatoRicerca[]{
        let risultatoRicerca = new Array<RisultatoRicerca>();
        let i: RisultatoRicerca = {categorie: "", data: "", zona: "", titolo: 'ciao'}
        risultatoRicerca.push(i);
        return risultatoRicerca;
    }

    getZones(): string[]{
        let res = new Array<string>();
        this.feedbackUtenti.forEach(
            (feedback) => res.push(feedback.zona.nome)
        );
        res = res.filter((item, index) => res.indexOf(item) === index);
        return res.sort();
    }
}
