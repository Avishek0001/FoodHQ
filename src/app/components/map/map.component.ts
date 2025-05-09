import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { GoogleMapsService } from 'src/app/services/google-maps.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent  implements OnInit {

  @ViewChild('map',{static:true}) mapElementRef: ElementRef;
  googleMaps: any;
  map:any
  marker:any
  mapChange:Subscription
  @Input() center:any={
    lat:22.5662913,lng:88.3738547
  }
  @Input() update=false

  @Output() location: EventEmitter<any> = new EventEmitter

  constructor(private maps: GoogleMapsService,private renderer: Renderer2,private locationService:LocationService) { }

  ngOnInit() {
    this.mapChange = this.maps.markerChange.subscribe(async d=>{
      if(d?.lat && d?.lng) {
        const googleMaps = this.googleMaps;
        const location = new googleMaps.LatLng(d?.lat,d?.lng);
        this.map.panTo(location);
        this.marker.setMap(null)
        await this.addMarker(location)
      }
    })
    this.initMap()}


  async initMap() {
    try {
      if(!this.update) {
        const position = await this.locationService.getCurrentLocation();
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        await this.loadMap();
        this.getAddress(this.center.lat, this.center.lng);
      } else {
        await this.loadMap();
      }
    } catch(e) {
      console.log(e);
      this.loadMap();
      // this.getAddress(this.center.lat, this.center.lng);
    }
  }

  async getAddress(lat, lng) {
    try {
      const result = await this.maps.getAddress(lat, lng);
      console.log('reslut',result);
      const loc = {
        title: result.address_components[0].short_name,
        address: result.formatted_address,
        lat,
        lng
      };
      console.log(loc);
      this.location.emit(loc)
      
    } catch(e) {
      console.log(e);
    }
  }

  async loadMap() {
    try {
      let googleMaps: any = await this.maps.loadGoogleMaps();
      this.googleMaps = googleMaps;
      const style = [
        {
          featureType: 'all',
          elementType: 'all',
          stylers: [
            { saturation: -100 }
          ]
        }
      ];
      const mapEl = this.mapElementRef.nativeElement;
      const location = new googleMaps.LatLng(this.center.lat,this.center.lng);
      this.map = new googleMaps.Map(mapEl, {
        center: location,
        zoom: 15,
        scaleControl: false,
        streetViewControl: false,
        zoomControl: false,
        overviewMapControl: false,
        mapTypeControl: false,
        mapTypeControlOptions: {
          mapTypeIds: [googleMaps.MapTypeId.ROADMAP, 'Food HQ']
        }
      });
      var mapType = new googleMaps.StyledMapType(style, { name: 'Grayscale' });
      this.map.mapTypes.set('Food HQ', mapType);
      this.map.setMapTypeId('Food HQ');
      this.renderer.addClass(mapEl, 'visible');
      this.addMarker(location)
    } catch(e) {
      console.log(e);
    }
  }

  addMarker(location) {
    let googleMaps: any = this.googleMaps;
    const icon = {
      url: '../../assets/location-pin.png',
      scaledSize: new googleMaps.Size(50, 50), 
    };
    this.marker = new googleMaps.Marker({
      position: location,
      map: this.map,
      icon: icon,
      draggable: true,
      animation: googleMaps.Animation.DROP
    });
     this.googleMaps.event.addListener(this.marker, 'dragend', () => {
      this.getAddress(this.marker.position.lat(), this.marker.position.lng());
    });
   
  }

}
