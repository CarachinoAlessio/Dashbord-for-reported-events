import {Component, Input, OnInit, ViewChild} from '@angular/core';
import * as Chartist from 'chartist';
import {ReportsService} from "../services/reports.service";
import {MatAccordion} from "@angular/material/expansion";

class Variazione {
    constructor(
        public incremento: boolean,
        public valore: string,
        public ultimoAggiornamento: string
    ) {
    }
}

@Component({
    selector: 'app-dashboard-tesi',
    templateUrl: './dashboard-tesi.component.html',
    styleUrls: ['./dashboard-tesi.component.css']
})


export class DashboardTesiComponent implements OnInit {
    @ViewChild(MatAccordion) accordion: MatAccordion;
    panelOpenState = false;
    private segnalazioniSettimanaChart: { labels: string[], series: number[][] };
    private overallBest: { overallBest: number, date: string } = {overallBest: 0, date: ''};
    private isServiceReady = false;
    private serie: Array<number> = [];
    @Input() variazione = new Variazione(false, '0.0%', 'aggiornato 0 secondi fa');
    private giorniSettimanaGrafico: { series: number[][]; labels: string[] };

    constructor(private reportsService: ReportsService) {
        this.reportsService.getReports();
    }

    startAnimationForLineChart(chart) {
        let seq: any, delays: any, durations: any;
        seq = 0;
        delays = 80;
        durations = 500;

        chart.on('draw', function (data) {
            if (data.type === 'line' || data.type === 'area') {
                data.element.animate({
                    d: {
                        begin: 600,
                        dur: 700,
                        from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                        to: data.path.clone().stringify(),
                        easing: Chartist.Svg.Easing.easeOutQuint
                    }
                });
            } else if (data.type === 'point') {
                seq++;
                data.element.animate({
                    opacity: {
                        begin: seq * delays,
                        dur: durations,
                        from: 0,
                        to: 1,
                        easing: 'ease'
                    }
                });
            }
        });

        seq = 0;
    };
    startAnimationForBarChart(chart){
        let seq2: any, delays2: any, durations2: any;

        seq2 = 0;
        delays2 = 80;
        durations2 = 500;
        chart.on('draw', function(data) {
            if(data.type === 'bar'){
                seq2++;
                data.element.animate({
                    opacity: {
                        begin: seq2 * delays2,
                        dur: durations2,
                        from: 0,
                        to: 1,
                        easing: 'ease'
                    }
                });
            }
        });

        seq2 = 0;
    };

    ngOnInit() {
        this.reportsService.isServiceReady.subscribe(
            (b) => {
                this.isServiceReady = b;
               //Prima riga dell'HTML -------------------------------------------------------------------
                this.setOverallBest(this.reportsService.getOverallbest());
                this.overallBest = this.getOverallBest();
                // per non cambiare le date al JSON ogni giorno, assegno una data.
                // Leggi nel reports service per più info (dove calcolo la serie numerica)
                // let today = new Date().getDay();
                let today = new Date('Mon Nov 09 2020 19:32:31 GMT+0100').getDay();
                const days: Array<string> = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom']
                this.segnalazioniSettimanaChart = this.initializeSegnalazioniSettimana(days, today);
                this.variazione.incremento = this.isIncrease();
                this.variazione.valore = this.getVariation();
                this.variazione.ultimoAggiornamento = this.getLastUpdateInfo();
                let max = Math.max(...this.segnalazioniSettimanaChart.series[0]);
                const opzioniGraficoSegnSettimanali: any = {
                    lineSmooth: Chartist.Interpolation.cardinal({
                        tension: 0
                    }),
                    low: 0,
                    high: max + 3,
                    chartPadding: {top: 0, right: 0, bottom: 0, left: 0},
                }

                let segnalazioniSettimanaGrafico = new Chartist.Line('#segnalazioniSettimana', this.segnalazioniSettimanaChart, opzioniGraficoSegnSettimanali);

                this.startAnimationForLineChart(segnalazioniSettimanaGrafico);


                // Grafico 2---------------------------------------------------------------------------------
                let utentiSeries = this.reportsService.getSegnalazioniUtentiSeries();


                const segnalazioniUtentiChart: any = {
                    labels: this.segnalazioniSettimanaChart.labels,
                    series: utentiSeries,
                };


                const optionsSegnalazioniUtenti: any = {
                    lineSmooth: Chartist.Interpolation.cardinal({
                        tension: 0
                    }),
                    low: 0,
                    high: Math.max(...utentiSeries[0], ...utentiSeries[1]) + 3,
                    chartPadding: {top: 0, right: 0, bottom: 0, left: 0}
                }

                let segnalazioniUtentiGrafico = new Chartist.Line('#usersInfo', segnalazioniUtentiChart, optionsSegnalazioniUtenti);
                this.startAnimationForLineChart(segnalazioniUtentiGrafico);



                // Grafico 3---------------------------------------------------------------------------------
                let serieGiorniSettimana = this.reportsService.getSerieGiorniSettimana();
                this.giorniSettimanaGrafico = {
                    labels: ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'],
                    series: [ serieGiorniSettimana ]
                };
                let opzioniGiorniSettimanali = {
                    axisX: {
                        showGrid: true,
                    },
                    low: 0,
                    high: Math.max(...serieGiorniSettimana) + 1,
                };

                let websiteViewsChart = new Chartist.Bar('#giorniSettimanali', this.giorniSettimanaGrafico, opzioniGiorniSettimanali);

                this.startAnimationForBarChart(websiteViewsChart);


            }
        )


    }

    getMostActiveDay(): string{
        try{
            let max = Math.max(...this.giorniSettimanaGrafico.series[0]);
            let index = this.giorniSettimanaGrafico.series[0].indexOf(max);
            return this.giorniSettimanaGrafico.labels[index];
        }catch (e){
            return '';
        }

    }

    getOverallBest(): { overallBest: number, date: string }{
        return this.overallBest;
    }
    setOverallBest(overallBest: { overallBest: number, date: string }): void{
        this.overallBest = overallBest;
    }

    isIncrease(): boolean {
        return this.segnalazioniSettimanaChart.series[0][5] < this.segnalazioniSettimanaChart.series[0][6];
    }

    getVariation(): string {
        let variation = Math.abs(this.segnalazioniSettimanaChart.series[0][5] - this.segnalazioniSettimanaChart.series[0][6]);
        let variationPercent = variation / this.segnalazioniSettimanaChart.series[0][5];
        return (variationPercent * 100).toFixed(2) + '%';
    }

    initializeSegnalazioniSettimana(days: Array<string>, today: number): any {
        let serie: number[] = this.reportsService.getSerieSettimana();
        let segnalazioniSettimana = {
            labels: [
                days[((today) % 7)],
                days[((today + 1) % 7)],
                days[((today + 2) % 7)],
                days[((today + 3) % 7)],
                days[((today + 4) % 7)],
                days[((today + 5) % 7)],
                days[((today + 6) % 7)]],
            series: []
        };
        segnalazioniSettimana.series[0] = serie;
        return segnalazioniSettimana;
    }

    private getLastUpdateInfo(): string {
        return this.reportsService.getLastUpdateInfo();
    }

    getTotalReports(): number {
        return this.reportsService.getTotalReports();
    }

}
