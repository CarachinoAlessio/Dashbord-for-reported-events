import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  isResultVoid = true;
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void{
    alert('Hai cercato');
    this.isResultVoid = false;
  }

}
