

import { UbigeoService } from './../../services/coberturas/ubigeo.service';
import { CoberturasService } from 'src/app/shared/services/coberturas/coberturas.service';
import { Ubigeo } from './../../../interfaces/ubigeo.interface';
import { Component, OnInit, Input, ViewChild, ElementRef, NgZone, EventEmitter, Output, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import icBlock from '@iconify/icons-ic/twotone-block';
import icWarning from '@iconify/icons-ic/twotone-warning';
import icWhereToVote from '@iconify/icons-ic/twotone-where-to-vote';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from './location.model';
import { CoordenadasData } from '../../../../static-data/coordenadasData';

import { HttpClient } from "@angular/common/http";
import { RutasApiRest } from "src/app/shared/config/app.config";

import swal from "sweetalert2";

import {
  FormGroup, FormControl
} from "@angular/forms";

// Referencia: https://www.freakyjolly.com/angular-google-maps-using-agm-core/#.Xr7j4xNKhBw

@Component({
  selector: 'vex-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.scss']
})
export class GmapComponent implements OnInit {

  @Input() ubigeo: any = null; 
  @Input() formLead: FormGroup;
  @Input() height = 'h300';

  @Input() title: string;
  @Input() showMap = true;
  @Input() showExtraData = true;
  @Input() showAddress = false;
  @Input() showImage = false;
  @Input() prueba = false;
  @Input() showField = false;
  @Input() showAddressInvoice = false;
  @Input() noEdit = false;

  @Input() isDisableDirection = false;
  @Input() isFacturacion = false;
  @Input() isInstalacion = false;

  @Input() cobertura: any;
  @Input() fcNameUbigeo="nUbigeo"
  @Input() fcNameDireccion="sDireccion"
  @Input() fcNameDireccionDetalle="sDireccionDetalle"
  @Input() fcNamePiso ="sPiso"
  @Input() fcNamePredio ="sPredio"
  
  @Input() fcNameVia = "stipoVia"
  @Input() fcNameNombreVia = "sNombreVia"
  @Input() fcNamePuerta = "sPuerta"
  @Input() fcNameBloque = "sBloque"
  @Input() fcNameIntDpto = "sIntDpto"
  @Input() fcNameZona = "stipoZona"
  @Input() fcNameNombreZona = "sNombreZona"
  @Input() fcNameManzana = "sManzana"
  @Input() fcNameLote = "sLote"
  @Input() fcNameKm = "sKm"
  @Input() fcNameSubZona = "stipoSubZona";
  @Input() fcNameNombreSubZona = "sNombreSubZona";
  @Input() fcNameReferencia = "sReferencia"
  
  @Input() eval_ubigeo:any = true
  @Input() evalUbigeo:any

//   fcCobertura = new FormControl('');
  @Input() latitude: number;
  @Input() longitude: number;
  @Input() zoom: number = 18;

  @Output() UbigeoZytrust = new EventEmitter<any>();
  @Output() limpiar =  new EventEmitter<any>();

  address: string;
  ubigeoZytrust:any

  @ViewChild('search', { static: false })
  public searchElementRef: ElementRef;

  strokeColor: string = '#662D91';
  strokeWeight: number = 5;
  fillColor: string = '#7433a4';

  icBlock = icBlock;
  icWarning = icWarning;
  icWhereToVote = icWhereToVote;
  bZytrustUbigeo:boolean;

  googleMapsIsActive = 0;

  loading = true;
  items = [];
  item: string;
  tipoVia: string;
  nombreVia: string;
  tipoZona: string;
  nombreZona: string;
  numero: string;
  manzana: string;
  lote: string;
  km: string;
  tipoSubZona: string;
  nombreSubZona: string;

  concat:string;
  data=[];
  sDireccion:string;
  // coordenadasData = CoordenadasData;
  coordenadasData: any;

  theRanchPolygon: any;

  coordenadasPoligonos = [];

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private coberturasService: CoberturasService,

    private cdr: ChangeDetectorRef
  ) { 
    
  }
 
  ngOnInit() {
    this.sDireccion = this.formLead.value.sDireccion;
    this.cobertura = this.formLead.value.fcCobertura;
  
    if (!this.showMap) {
      return false;
    }
    this.getNodos();
    this.obtenerUbigeoZytrust()
  }

  obtenerUbigeo(e){
    this.bZytrustUbigeo = e
  }

  apply(){
    if(this.evalUbigeo){
      this.UbigeoZytrust.emit(this.bZytrustUbigeo);
    }
  }

  obtenerUbigeoZytrust(){
    let id = this.ubigeo[0].nIdUbigeo;
    if(id !== ''){
      this.coberturasService.getUbigeoZytrust(id)
      .subscribe(
        (res) => { 
          this.obtenerUbigeo(res.status)
          this.apply()
      }); 
    } 
  }

  checkCobertura(position) {
    let latLng = new google.maps.LatLng(position);

    var result = false;
    for(let i = 0; i < this.coordenadasPoligonos.length; i++) {
      // console.log(this.coordenadasData[i]);

      if (google.maps.geometry.poly.containsLocation(latLng, this.coordenadasPoligonos[i])) {
            // Show alert if user has left the polygon
            result = true;
            
          }

          // this.theRanchPolygon = new google.maps.Polygon({ paths: this.coordenadasData[i] });
          
        }

        this.cobertura = result ? 1 : 3;
       
        this.formLead.controls.fcCobertura.patchValue(this.cobertura);
      
        // console.log(result);



    // this.coordenadasPoligonos.forEach(function(e, latLng){

    //   if (google.maps.geometry.poly.containsLocation(latLng, e)) {
    //     // Show alert if user has left the polygon
    //     console.log('Dentro');
    //   }

    // });

  //   if (google.maps.geometry.poly.containsLocation(latLng, this.theRanchPolygon)) {
  //     // Show alert if user has left the polygon
  //     console.log('Dentro');


  // } else {
  //     console.log('Fuera');

  //   }
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        // this.latitude = position.coords.latitude;
        // this.longitude = position.coords.longitude;
        this.updateCoords(position.coords.longitude, position.coords.latitude);
        this.loading = false;
      }, (e) => {
        this.setFirstCoordsFromFirstCover();
        switch (e.code) {
          case 1:
            this.openSnackbar('Debes permitir la mostrar tu ubicación para este sitio web. En la barrada de direcciones debes darle clic al ícono (i) para permitir mostrar la ubicación.');
            break;
          default:
            console.log(e);
            alert(e.message);
        }
      });
    } else {
      console.warn('La condición (\'geolocation\' in navigator) ha resuelto FALSE');
      this.setFirstCoordsFromFirstCover();
    }
  }
  valText(event: any, type: any) {
    let pattern;
    switch (type) {
      case 1: {
        // Alfanumericos con espacios
        pattern = /[0-9A-Za-z                       ]/;
        break;
      }
    }
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  private setFirstCoordsFromFirstCover(loading = false) {
    this.latitude = this.coordenadasData[0][0].lat;
    this.longitude = this.coordenadasData[0][0].lng;
    this.loading = loading;
  }

  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.updateCoords($event.coords.lng, $event.coords.lat);
  }


  // toggleCobertura() {

  //   this.cobertura++;
  //   if(this.cobertura > 3) {
  //     this.cobertura = 1;
  //   }
    
  // }

  openSnackbar(message = 'Sin mensaje', duration = 5000) {
    this.snackBar.open(message, 'CLOSE', {
      duration: duration,
      horizontalPosition: 'center'
    });
  }

  updateCoords(lng, lat) {
    this.latitude = lat;
    this.longitude = lng;
    this.formLead.controls.nLatitud.patchValue(lat);
    this.formLead.controls.nLongitud.patchValue(lng);
    console.log('lat', lat)
    console.log('long', lng)

    this.checkCobertura({lat: lat, lng: lng});
  }

  // update() {
  //   console.log({
  //     departamento: '',
  //     provincia: '',
  //     distrito: '',
  //     direccion: '',
  //     tipo: '',
  //     pisos: '',
  //     longitud: this.latitude,
  //     latitud: this.loading,
  //   });
  // }


  getNodos() {

    // Buscar lista de equipo
    this.http
      .get(RutasApiRest.urlApi+"/v1/cobertura")
      .subscribe(
        (response: any) => {

          // console.log(response.aData);
          if (response) {
            // console.log(response.aData[0][0].lat);

            this.coordenadasData = response.aData;
            // this.loadGmap();
            this.FnGoogleMapsIsActive();
            if(this.coordenadasData.length > 0) {
              if(!this.latitude || !this.longitude) {
                this.latitude = this.coordenadasData[0][0].lat;
                this.longitude = this.coordenadasData[0][0].lng;
              }
            } else {
            
              this.latitude = -12.09480743585423;
              this.longitude = -76.95401629173374;
              swal.fire(
                "Alerta",
                "No hay coberturas activas.",
                "warning"
              );
            }

            
            

            // this.options = response.aData;
          }
        },
        (error) => {
          console.log(error);
          swal.fire(
            "Información",
            "Ha ocurrido un error al obtener la cobertura.",
            "error"
          );
          return;
        }
      );
  }


  loadGmap() {
    this.mapsAPILoader.load().then(() => {

      if(!this.latitude || !this.longitude) {
        this.setCurrentLocation();
      }

    
      

// Cargamos las coberturas de forma dinámica
// console.log('-------->', this.coordenadasData[0]);


        // this.coordenadasData.forEach(function(element) {
        //   console.log(this.coordenadasData);
        //   // this.coordenadasPoligonos.push([element]);
        // });
        // console.log(this.coordenadasData.length);
        
        // Referencia: https://pusher.com/tutorials/geofencing-angular
        for(let i = 0; i < this.coordenadasData.length; i++) {
          // console.log(this.coordenadasData[i]);
          this.coordenadasPoligonos.push(new google.maps.Polygon({ paths: this.coordenadasData[i] }));

          // this.theRanchPolygon = new google.maps.Polygon({ paths: this.coordenadasData[i] });

        }

        
          // console.log('poligonos', this.coordenadasPoligonos);

          // const dentro = {lat: -12.06585218910639, lng: -76.96508658807984};
          // const fuera = {lat: -12.16956463305689, lng: -76.9313443986725};

          // this.checkCobertura(fuera);


        var options = {
          componentRestrictions: { country: "pe" }
        };



      // auto complete

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, options);

      
      this.loading = false;

      autocomplete.addListener("place_changed", () => {
   
        // console.log('this.ngZone', this.ngZone);
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // FIX BUG: Cuando se selecciona un item del autocomplete no se pinta en el formgroup
          // pero si cambia el value en el input
          var input = (<HTMLInputElement>document.getElementById('sDireccion')).value;
          this.formLead.patchValue({ "sDireccion": input });

          this.updateCoords(place.geometry.location.lng(), place.geometry.location.lat());

          if (place.address_components != undefined && place.address_components != null) {

            if(place.address_components.length > 7){
              this.formLead.controls.nDepartamentoMaps.patchValue(place.address_components[5].long_name);
              this.formLead.controls.nProvinciaMaps.patchValue(place.address_components[4].long_name);
              console.log('dep:'+place.address_components[5].long_name,'prov:'+place.address_components[4].long_name);
            }else if(place.address_components.length > 6){
              this.formLead.controls.nDepartamentoMaps.patchValue(place.address_components[4].long_name);
              this.formLead.controls.nProvinciaMaps.patchValue(place.address_components[3].long_name);
              console.log('dep:'+place.address_components[4].long_name,'prov:'+place.address_components[3].long_name);
            }else if(place.address_components.length > 4){
              this.formLead.controls.nDepartamentoMaps.patchValue(place.address_components[3].long_name);
              this.formLead.controls.nProvinciaMaps.patchValue(place.address_components[2].long_name);
              console.log('dep:'+place.address_components[3].long_name,'prov:'+place.address_components[2].long_name);
            }else{
              this.formLead.controls.nDepartamentoMaps.patchValue(place.address_components[2].long_name);
              this.formLead.controls.nProvinciaMaps.patchValue(place.address_components[1].long_name);
              console.log('dep:'+place.address_components[2].long_name,'prov:'+place.address_components[1].long_name);
            }
            
          }
          
        });
      });
    });
  }

  cambioVerificacionCobertura(e: any) {
      console.log(e);
    this.formLead.controls.fcCobertura.patchValue(e);
    
  }

//   tipoPersona(e: any) {
//     this.typePerson = e;
//     if (this.typePerson == 1) {
//       this.nombres = "Nombres";
//       this.personaJuridica = false;
//       this.ValidatorsPersonaNatural();
//     } else if (this.typePerson == 2) {
//       this.nombres = "Razón social";
//       this.personaJuridica = true;
//       this.ValidatorsPersonaJuridica();
//     }
//   }


  FnGoogleMapsIsActive() {

    this.http
    .get(RutasApiRest.urlApi+"/v1/configuraciones/google-maps-is-active")
    .subscribe(
      (response: any) => {
        this.googleMapsIsActive = response ? Number(response.value) : 0;

        if(this.googleMapsIsActive == 1) {
            this.loadGmap();
        } else {
            this.loading = false;
        }
        console.warn(this.googleMapsIsActive);
      },
      (error) => {
        this.googleMapsIsActive = 0;
        console.warn(error);
      }
    );
    
  }

  ngDoCheck() {
      // console.log('e', this.bZytrustUbigeo)
      this.apply()

  }

  showItem(newItem: string,tipo: number){
    this.items=[];

    if(tipo==1){
      this.tipoVia = newItem;
    }
    else if(tipo==2){
      this.nombreVia = newItem;
    }
    else if(tipo==3){
      this.tipoZona = newItem;
    }
    else if(tipo==4){
      this.nombreZona = newItem;
    }
    else if(tipo==5){
      this.numero = newItem;
    }
    else if(tipo==6){
      this.manzana = "Mz "+newItem;
    }
    else if(tipo==7){
      this.lote = "Lt "+newItem;
    }
    else if(tipo==8){
      this.km = "Km "+newItem;
    }
    else if(tipo==9){
      this.tipoSubZona = newItem;
    }
    else if(tipo==10){
      this.nombreSubZona = newItem;
    }

    this.concat = this.tipoVia+'-'+this.nombreVia+'-'+this.tipoZona+'-'+this.nombreZona+'-'+this.numero+'-'+this.manzana+'-'+this.lote+'-'+this.km+'-'+this.tipoSubZona+'-'+this.nombreSubZona;
    this.data = this.concat.split('-');

    this.data.forEach(element => {
      if(element!='undefined'){
        this.items.push(element);
      }
    });
    this.sDireccion = this.items.join(' ');
  }

  eventClick(event){
    this.limpiar.emit(event);
  }

}
