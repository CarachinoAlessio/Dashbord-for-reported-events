import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  isResultVoid = true;
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void{
    alert('Hai cercato');
    this.isResultVoid = false;
  }

}
