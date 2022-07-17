import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

declare var google:any;

@Injectable()
export class GoogleMaps {
  mapElement: any;
  map: any;
  marker: any;
  apiKey: string = "AIzaSyA3uv4zlpr1Yi4Hb0h7rB7xXLNiePeBEc0";
  centerChangedCallback: any;

  constructor(public geolocation: Geolocation) {
  }

  init(mapElement: any, centerChangedCallback: any): Promise<any> {
    this.mapElement = mapElement;
    this.centerChangedCallback = centerChangedCallback;

    return this.loadMap();
  }

  loadMap(): Promise<any> {
    return new Promise((resolve) => {
      if (typeof google == 'undefined' || typeof google.maps == "undefined") {
        window['mapInit'] = () => {
          this.initMap().then(() => {
            resolve(true);
          });
        }

        let script = document.createElement("script");
        script.id = "googleMaps";

        if (this.apiKey) {
          script.src = 'http://maps.google.com/maps/api/js?key=&#39; + this.apiKey + '&callback=mapInit';
        } else {
          script.src = 'http://maps.google.com/maps/api/js?callback=mapInit&#39;;
        }

        document.body.appendChild(script);
      } else {
        resolve(true);
      }
    });
  }

  initMap(): Promise<any> {
    return new Promise((resolve) => {
      this.geolocation.getCurrentPosition().then((position) => {
        let center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        let mapOptions = {
          center: center,
          zoom: 17,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(this.mapElement, mapOptions);
        this.map.addListener('click', e => {
          this.map.panTo(e.latLng);

          if (this.marker == undefined) {
            this.marker = new google.maps.Marker({
              map: this.map,
              position: e.latLng
            });
          } else {
            this.marker.setPosition(e.latLng);
          }

          if (this.centerChangedCallback)
            this.centerChangedCallback(e.latLng);
        });

        resolve(true);
      });
    });
  }
}