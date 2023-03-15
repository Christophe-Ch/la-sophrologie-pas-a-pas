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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../toast.service';
import { environment } from 'src/environments/environment';
import { TitleService } from '../title.service';
import { Meta } from '@angular/platform-browser';

const RECAPTCHA_SCRIPT_SRC = 'https://www.google.com/recaptcha/enterprise.js?render=6LcAONskAAAAAI3pMP7nClALcT03OW0nVBijMQUs';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit {
  contactForm!: FormGroup;
  isSending = false;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _httpClient: HttpClient,
    private readonly _toastService: ToastService,
    private readonly _titleService: TitleService,
    private readonly _meta: Meta
  ) { }

  ngOnInit(): void {
    this._titleService.setTitle('Contact');
    this._meta.updateTag({
      name: 'description',
      content: 'Contactez-moi pour toute demande de renseignements ou pour prendre rendez-vous. Je suis à votre écoute pour répondre à vos questions sur mes séances de sophrologie.'
    });
    this._meta.updateTag({
      name: 'keywords',
      content: 'Sophrologie, séances de sophrologie, Saint-Aignan-Sur-Ry, Anne Avenel Dubois, contact, rendez-vous, demande de renseignements, qualité de vie'
    });
    this._buildForm();
    this._initializeRecaptcha();
    this._initializeMap();
  }

  public get name() { return this.contactForm.get('name'); }
  public get email() { return this.contactForm.get('email'); }
  public get subject() { return this.contactForm.get('subject'); }
  public get message() { return this.contactForm.get('message'); }

  submit(): void {
    if (this.contactForm.invalid) {
      return;
    }

    this.isSending = true;

    const grecaptcha = (window as any).grecaptcha;
    grecaptcha.enterprise.ready(async () => {
      const token = await grecaptcha.enterprise.execute('6LcAONskAAAAAI3pMP7nClALcT03OW0nVBijMQUs', { action: 'SEND_MAIL' });
      this._httpClient.post(environment.contactEndpoint,
        {
          token,
          name: this.name!.value,
          subject: this.subject!.value,
          email: this.email!.value,
          message: this.message!.value.replaceAll('\n', '<br>')
        },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          }
        })
        .subscribe((response: any) => {
          this.isSending = false;
          if (response.success) {
            this._toastService.showSuccess('Votre message a bien été envoyé !');
            this.contactForm.reset();
          } else {
            switch (response.errorType) {
              case "recaptchaValidation":
                this._toastService.showError('Le captcha a échoué, veuillez rafraichir la page et renvoyer votre message.');
                break;
              case "missingFields":
                this._toastService.showError('Veuillez vérifier que tous les champs sont bien renseignés.');
                break;
              case "mailSending":
                this._toastService.showError('Le message n\'a pas pu être envoyé, veuillez réessayer plus tard.');
                break;
            }
          }
        })
    });
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

  private _initializeRecaptcha(): void {
    const head = document.querySelector('head');
    const script = document.createElement('script');
    script.src = RECAPTCHA_SCRIPT_SRC;
    head?.appendChild(script);
  }
}
