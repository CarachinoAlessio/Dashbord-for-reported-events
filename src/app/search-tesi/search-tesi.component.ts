import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {FormControl} from "@angular/forms";
import {FeedbackUtenti} from "../classes/FeedbackUtenti/FeedbackUtenti";
import {ReportsService} from "../services/reports.service";
import {DialogComponent} from "./dialog/dialog.component";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';

export interface RisultatoRicerca {
    idsegnalazione?: string,
    titolo: string;
    data: string;
    categorie: string;
    zona: string;
}

const risultatoRicerca: RisultatoRicerca[] = [];


@Component({
    selector: 'app-event',
    templateUrl: './search-tesi.component.html',
    styleUrls: ['./search-tesi.component.css']
})
export class SearchTesiComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = ['titolo', 'data', 'categorie', 'zona'];
    dataSource = new MatTableDataSource<RisultatoRicerca>(risultatoRicerca);
    hasSearched = false;
    isResultVoid = true;
    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    tabSelected = new FormControl(0);
    idInput = new FormControl('');
    zoneSelected = new FormControl();
    startDateControl = new FormControl();
    endDateControl = new FormControl();
    risultatiRicerca: RisultatoRicerca[] = [];
    zone: string[] = [];
    @ViewChild('content') content: ElementRef;


    constructor(private reportsService: ReportsService, public dialog: MatDialog) {
        this.zone = this.reportsService.getZones();
    }

    ngOnInit(): void {
    }


    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }

    searchByID(): void {
        if (this.idInput.value === '') {
            alert('Non puoi lasciare il campo id vuoto');
            return;
        }
        const feedback: FeedbackUtenti = this.reportsService.getById(this.idInput.value);
        this.dialog.open(DialogComponent, {data: feedback});
    }

    searchByZone(): void {
        if (this.zoneSelected.value == undefined && this.startDateControl.value == undefined && this.endDateControl.value == undefined) {
            alert('Devi riempire almeno un campo');
            return;
        }
        this.risultatiRicerca = this.reportsService.getRisultatiRicercaByZone(this.zoneSelected.value, this.startDateControl.value, this.endDateControl.value);
        this.dataSource = new MatTableDataSource<RisultatoRicerca>(this.risultatiRicerca);
        this.ngAfterViewInit();
        this.hasSearched = true;
        this.isResultVoid = false;
    }

    openDialog(idsegnalazione: string) {
        const feedback: FeedbackUtenti = this.reportsService.getById(idsegnalazione);
        this.dialog.open(DialogComponent, {data: feedback});
    }

    savePdf(): void {

        let rows = [];
        rows.push(['ID', 'Titolo', 'Data', 'Categorie', 'Zona']);
        this.risultatiRicerca.forEach(
            (ris) => {
                const row = [ris.idsegnalazione, ris.titolo, ris.data, ris.categorie, ris.zona];
                rows.push(row);
            }
        );

        const documentDefinition = {
          pageSize: 'A4',
          pageOrientation: 'landscape',
            content: {
                table: {
                    widths: ['*', '*', '*', '*', '*', '*'],
                    body: rows
                }
            }
        };
        pdfMake.createPdf(documentDefinition).open();
    }
}
