import { Component, OnInit } from '@angular/core';
import {ReportsService} from "../services/reports.service";
import Map from 'ol/Map';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import {fromLonLat} from 'ol/proj.js';
import Geolocation from "ol/Geolocation";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import Icon from "ol/style/Icon";
import Style from "ol/style/Style";
import Text from "ol/style/Text";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";

import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import {Gpx} from "../classes/FeedbackUtenti/Gpx";
import {ToInitialize} from "../classes/ToInitialize";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-maps',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})


export class MapComponent implements OnInit {
  private map: Map;
  private geolocation: Geolocation;
  private vectorSource: VectorSource;
  private vectorLayer: VectorLayer;
  private toInitialize: ToInitialize[];

  private isMapInitialized = false;
  options: FormGroup;
  gravityControl = new FormControl(['tutte']);
  categoryControl = new FormControl(['tutte']);
  categories: string[];
  constructor(private reportsService: ReportsService, fb: FormBuilder) {
    this.categories = this.reportsService.getCategories();
    this.options = fb.group({
      gravity: this.gravityControl,
      category: this.categoryControl,
    });
  }

  ngOnInit() {
    this.initializeMap(['tutte'], ['tutte']);
    this.isMapInitialized = true;
    this.geolocation = new Geolocation({
      trackingOptions: {
        enableHighAccuracy: true,
      },
        projection: this.map.getView().getProjection()
    });
  }


  initializeMap(gravity: string[], reportCategory: string[]) {
    this.toInitialize = this.reportsService.getToInitialize();
    this.vectorSource = new VectorSource({
      features: []
    });
    this.toInitialize.forEach(
        (record) => {
          let feature = new Feature({
            type: 'click',
            desc: 'Test',
            geometry: new Point(fromLonLat([record.gpx.longt, record.gpx.lat]))
          });
          switch (record.gravity){
            case 1:
              feature.setStyle(new Style({
                image: new Icon(({
                  crossOrigin: 'anonymous',
                  src: 'assets/greenpin.svg',
                  imgSize: [22, 22],
                })),
              }));
              break;
            case 2:
              feature.setStyle(new Style({
                image: new Icon(({
                  crossOrigin: 'anonymous',
                  src: 'assets/orangepin.svg',
                  imgSize: [22, 22],
                })),
              }));
              break;
            case 3:
              feature.setStyle(new Style({
                image: new Icon(({
                  crossOrigin: 'anonymous',
                  src: 'assets/redpin.svg',
                  imgSize: [22, 22],
                })),
              }));
              break;
          }


          this.vectorSource.addFeature( feature );
        }
    );




    this.vectorLayer = new VectorLayer({
      source: this.vectorSource
    });




    if (this.isMapInitialized){
      this.map.dispose();

    }

    this.map = new Map({
      target: 'map',
      layers: [
        new Tile({
          source: new OSM()
        }), this.vectorLayer
      ],
      view: new View({
        center: fromLonLat([12.496366, 41.902782]),
        zoom: 6,
        constrainResolution: true
      })
    });
  }


  localPosition(): void{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setView(10, [position.coords.longitude, position.coords.latitude]);
      });
    }
  }

  private setView(zoom: number, center: [number, number]) {
    this.map.getView().setZoom(zoom);
    this.map.getView().setCenter(fromLonLat(center));
  }


  updateMap(): void{
    let gravity = this.gravityControl.value;
    let reportCategory = this.categoryControl.value;
    if (gravity.length == 0 || reportCategory.length == 0){
      alert('Inserisci dei parametri di ricerca.');
    }
    else{
      this.initializeMap(gravity, reportCategory);
    }

  }
}
