import { Component, OnInit } from '@angular/core';
import { Feature, Map, View } from 'ol';
import { Point } from 'ol/geom';
import TileLayer from 'ol/layer/Tile';
import * as layer from 'ol/layer';
import * as source from 'ol/source';
import { fromLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(private readonly _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this._buildForm();
    this._initializeMap();
  }

  public get name() { return this.contactForm.get('name'); }
  public get email() { return this.contactForm.get('email'); }
  public get subject() { return this.contactForm.get('subject'); }
  public get message() { return this.contactForm.get('message'); }

  log() {
    console.log(this.email);
  }

  private _buildForm(): void {
    this.contactForm = this._formBuilder.group({
      name: [
        '',
        Validators.required
      ],
      email: [
        '',
        {
          validators: [
            Validators.required,
            Validators.email
          ],
          updateOn: 'blur'
        }
      ],
      subject: [
        '',
        Validators.required
      ],
      message: [
        '',
        Validators.required
      ]
    })
  }

  private _initializeMap(): void {
    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: fromLonLat([1.351260, 49.503270]),
        zoom: 13
      })
    });

    const markers = new layer.Vector({
      source: new source.Vector(),
      style: new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: '/assets/marker.png',
          scale: 0.5
        })
      })
    });
    map.addLayer(markers);

    const marker = new Feature(new Point(fromLonLat([1.351260, 49.503270])));
    markers.getSource()?.addFeature(marker);
  }
}
