import {Component, OnInit, ViewChild} from '@angular/core';
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
import {MatSelect} from "@angular/material/select";
import {MatOption, MatOptionSelectionChange} from "@angular/material/core";


@Component({
    selector: 'app-maps',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})


export class MapComponent implements OnInit {

   //MAPPA ---------------------------------------------------------------------------
    private map: Map;
    private geolocation: Geolocation;
    private vectorSource: VectorSource;
    private vectorLayer: VectorLayer;
    private toInitialize: ToInitialize[];
    private isMapInitialized = false;

   //FORM ----------------------------------------------------------------------------
    allGravitySelected = true;
    allCategorySelected = true;
    options: FormGroup;
    gravityControl = new FormControl(['tutte']);
    categoryControl = new FormControl(['tutte']);
    categories: string[];
    @ViewChild('gravitySelect') gravitySelect: MatSelect;
    @ViewChild('categorySelect') categorySelect: MatSelect;


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

  //MAPPA ---------------------------------------------------------------------------

    initializeMap(gravity: string[], reportCategory: string[]) {
        this.toInitialize = this.reportsService.getToInitialize(gravity, reportCategory);
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
                switch (record.gravity) {
                    case 1:
                        feature.setStyle(new Style({
                            image: new Icon(({
                                crossOrigin: 'anonymous',
                                src: 'assets/greenpin.svg',
                                imgSize: [25, 25],
                            })),
                        }));
                        break;
                    case 2:
                        feature.setStyle(new Style({
                            image: new Icon(({
                                crossOrigin: 'anonymous',
                                src: 'assets/orangepin.svg',
                                imgSize: [25, 25],
                            })),
                        }));
                        break;
                    case 3:
                        feature.setStyle(new Style({
                            image: new Icon(({
                                crossOrigin: 'anonymous',
                                src: 'assets/redpin.svg',
                                imgSize: [25, 25],
                            })),
                        }));
                        break;
                }


                this.vectorSource.addFeature(feature);
            }
        );


        this.vectorLayer = new VectorLayer({
            source: this.vectorSource
        });


        if (this.isMapInitialized) {
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


    localPosition(): void {
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


    updateMap(): void {
        let gravity = this.gravityControl.value;
        let reportCategory = this.categoryControl.value;
        if (gravity.length == 0 || reportCategory.length == 0) {
            alert('Inserisci dei parametri di ricerca.');
        } else {
            this.initializeMap(gravity, reportCategory);
        }

    }



  //FORM ----------------------------------------------------------------------------

    toggleGravityAllSelection(): void {
        this.allGravitySelected = !this.allGravitySelected;

        if (this.allGravitySelected) {
            this.gravitySelect.options.forEach((item: MatOption) => item.select());
        } else {
            this.gravitySelect.options.forEach((item: MatOption) => {
                item.deselect()
            });
        }
        this.gravitySelect.close();
    }


    gravitySelChanged($event: MatOptionSelectionChange): void {
        {
            if ($event.isUserInput) {
                if (this.allGravitySelected) {
                    this.allGravitySelected = false;
                    this.gravitySelect.options.first.deselect();
                } else {
                    let allExceptFirst = true;
                    for (let i = 0; i < this.gravitySelect.options.toArray().length; i++) {
                        if (i != 0 && !this.gravitySelect.options.toArray()[i].selected) {
                            allExceptFirst = false;
                            break;
                        }
                    }
                    if (allExceptFirst) {
                        this.allGravitySelected = true;
                        this.gravitySelect.options.forEach((item: MatOption) => item.deselect());
                        this.gravitySelect.options.first.select();
                    }
                }
            }
        }
    }

    toggleCategoryAllSelection(): void {
        this.allCategorySelected = !this.allCategorySelected;  // to control select-unselect

        if (this.allCategorySelected) {
            this.categorySelect.options.forEach((item: MatOption) => item.select());
        } else {
            this.categorySelect.options.forEach((item: MatOption) => {
                item.deselect()
            });
        }
        this.categorySelect.close();
    }


    categorySelChanged($event: MatOptionSelectionChange): void {
        {
            if ($event.isUserInput) {
                if (this.allCategorySelected) {
                    this.allCategorySelected = false;
                    this.categorySelect.options.first.deselect();
                } else {
                    let allExceptFirst = true;
                    for (let i = 0; i < this.categorySelect.options.toArray().length; i++) {
                        if (i != 0 && !this.categorySelect.options.toArray()[i].selected) {
                            allExceptFirst = false;
                            break;
                        }
                    }
                    if (allExceptFirst) {
                        this.allCategorySelected = true;
                        this.categorySelect.options.forEach((item: MatOption) => item.deselect());
                        this.categorySelect.options.first.select();
                    }
                }
            }
        }
    }
}
