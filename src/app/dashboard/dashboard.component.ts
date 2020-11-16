import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as Chartist from 'chartist';
import {ReportsService} from "../services/reports.service";
import {FeedbackUtenti} from "../classes/FeedbackUtenti/FeedbackUtenti";

class Variazione{
    constructor(
        public incremento: boolean,
        public valore: string,
        public ultimoAggiornamento: string
    ) {
    }

}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {
  private segnalazioniSettimanaChart: { labels: string[], series: number[][]};
  private isServiceReady = false;
  private serie: Array<number> = [];
  @Input() variazione = new Variazione(false, '0.0%', 'aggiornato 0 secondi fa');
  constructor(private reportsService: ReportsService) {
      this.reportsService.getReports();
  }
  startAnimationForLineChart(chart){
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if(data.type === 'point') {
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

              // per non cambiare le date al JSON ogni giorno, assegno una data.
              // Leggi nel reports service per più info (dove calcolo la serie numerica)
              // let today = new Date().getDay();
              let today = new Date('Mon Nov 09 2020 19:32:31 GMT+0100').getDay();
              const days: Array<string> = [ 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom' ]
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
                  high: max + 10,
                  chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
              }

              let segnalazioniSettimanaGrafico = new Chartist.Line('#segnalazioniSettimana', this.segnalazioniSettimanaChart, opzioniGraficoSegnSettimanali);

              this.startAnimationForLineChart(segnalazioniSettimanaGrafico);

/*

              /!* ----------==========     Completed Tasks Chart initialization    ==========---------- *!/

              const dataCompletedTasksChart: any = {
                  labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
                  series: [
                      [230, 750, 450, 300, 280, 240, 200, 190]
                  ]
              };

              const optionsCompletedTasksChart: any = {
                  lineSmooth: Chartist.Interpolation.cardinal({
                      tension: 0
                  }),
                  low: 0,
                  high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
                  chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
              }

              var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

              // start animation for the Completed Tasks Chart - Line Chart
              this.startAnimationForLineChart(completedTasksChart);



              /!* ----------==========     Emails Subscription Chart initialization    ==========---------- *!/

              var datawebsiteViewsChart = {
                  labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
                  series: [
                      [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

                  ]
              };
              var optionswebsiteViewsChart = {
                  axisX: {
                      showGrid: false
                  },
                  low: 0,
                  high: 1000,
                  chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
              };
              var responsiveOptions: any[] = [
                  ['screen and (max-width: 640px)', {
                      seriesBarDistance: 5,
                      axisX: {
                          labelInterpolationFnc: function (value) {
                              return value[0];
                          }
                      }
                  }]
              ];
              var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

              //start animation for the Emails Subscription Chart
              this.startAnimationForBarChart(websiteViewsChart);

*/




          }
      )


  }

  isIncrease(): boolean{
      return this.segnalazioniSettimanaChart.series[0][5] < this.segnalazioniSettimanaChart.series[0][6];
  }

  getVariation(): string{
      let variation = Math.abs(this.segnalazioniSettimanaChart.series[0][5] - this.segnalazioniSettimanaChart.series[0][6]);
      let variationPercent = variation/this.segnalazioniSettimanaChart.series[0][5];
      return (variationPercent*100).toFixed(2) + '%';
  }

    initializeSegnalazioniSettimana(days: Array<string>, today: number) {
      let serie: number[] = this.reportsService.getSerieSettimana();
      let segnalazioniSettimana = {
          labels: [
              days[((today)%7)],
              days[((today+1)%7)],
              days[((today+2)%7)],
              days[((today+3)%7)],
              days[((today+4)%7)],
              days[((today+5)%7)],
              days[((today+6)%7)]],
          series: []
      };
        segnalazioniSettimana.series[0] = serie;
        return segnalazioniSettimana;
    }

    private getLastUpdateInfo(): string{
      return this.reportsService.getLastUpdateInfo();
    }
}
