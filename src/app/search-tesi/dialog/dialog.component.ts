import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FeedbackUtenti} from "../../classes/FeedbackUtenti/FeedbackUtenti";
import {HttpClient} from "@angular/common/http";

/*interface City{
  city: string
}
class Address{
  constructor(
      public address: City,
  ) {
  }
}*/

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  // citta = 'Caricamento...';

  constructor(@Inject(MAT_DIALOG_DATA) public data: FeedbackUtenti) {
    /*if (data !== undefined){
      this.httpClient.get('http://nominatim.openstreetmap.org/reverse?format=json&lon=' + data.gpx.longt + '&lat=' + data.gpx.lat)
          .subscribe(
          (res: Address) => this.citta = res.address.city
      );
    }*/
  }

  ngOnInit(): void {
  }

}
