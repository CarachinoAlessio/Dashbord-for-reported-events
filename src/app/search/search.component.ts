import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {FormControl} from "@angular/forms";
import {FeedbackUtenti} from "../classes/FeedbackUtenti/FeedbackUtenti";
import {ReportsService} from "../services/reports.service";

export interface PeriodicElement {
  titolo: string;
  data: string;
  categorie: string;
  zona: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {titolo: 'Green City', data: 'Hydrogen', categorie: 'Test', zona: 'H'},
  {titolo: 'Green City', data: 'Helium',   categorie: 'Test', zona: 'He'},
  {titolo: 'Green City', data: 'Lithium',  categorie: 'Test', zona: 'Li'},
  {titolo: 'Green City', data: 'Beryllium',categorie: 'Test', zona: 'Be'},
  {titolo: 'Green City', data: 'Boron',    categorie: 'Test', zona: 'B'},
  {titolo: 'Green City', data: 'Carbon',   categorie: 'Test', zona: 'C'},
  {titolo: 'Green City', data: 'Nitrogen', categorie: 'Test', zona: 'N'},
  {titolo: 'Green City', data: 'Oxygen',   categorie: 'Test', zona: 'O'},
  {titolo: 'Green City', data: 'Fluorine', categorie: 'Test', zona: 'F'},
  {titolo: 'Green City', data: 'Neon',     categorie: 'Test', zona: 'Ne'},
  {titolo: 'Green City', data: 'Sodium',   categorie: 'Test', zona: 'Na'},
  {titolo: 'Green City', data: 'Magnesium',categorie: 'Test', zona: 'Mg'},
  {titolo: 'Green City', data: 'Aluminum', categorie: 'Test', zona: 'Al'},
  {titolo: 'Green City', data: 'Silicon',  categorie: 'Test', zona: 'Si'},
  {titolo: 'Green City', data: 'Phophorus',categorie: 'Test', zona: 'P'},
  {titolo: 'Green City', data: 'Sulfur',   categorie: 'Test', zona: 'S'},
  {titolo: 'Green City', data: 'Chlorine', categorie: 'Test', zona: 'Cl'},
  {titolo: 'Green City', data: 'Argon',    categorie: 'Test', zona: 'Ar'},
  {titolo: 'Green City', data: 'Potassiu', categorie: 'Test', zona: 'K'},
  {titolo: 'Green City', data: 'Calcium',  categorie: 'Test', zona: 'Ca'},
];


@Component({
  selector: 'app-event',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['titolo', 'data', 'categorie', 'zona'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  hasSearched = false;
  isResultVoid = true;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  selected = new FormControl(0);
  idInput = new FormControl('');

  constructor(private reportsService: ReportsService) { }

  ngOnInit(): void {
  }



  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  searchByID(): void{
    if (this.idInput.value === ''){
      alert('Non puoi lasciare il campo id vuoto');
      return;
    }
    const feedback: FeedbackUtenti = this.reportsService.getById(this.idInput.value);
    if (feedback === undefined){

    }else{

    }
    this.hasSearched = true;
    this.isResultVoid = false;
  }

  searchByCity() {
    this.hasSearched = true;
    this.isResultVoid = false;
  }
}
