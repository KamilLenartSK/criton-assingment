import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
  ViewEncapsulation,
  OnDestroy
} from '@angular/core';
import {FormGroup, FormBuilder, FormControl} from '@angular/forms';
import {GooglePlacesService} from '../../services/google-places.service';

import {Observable, Subscription} from 'rxjs';
import {debounceTime, filter, mergeMap} from 'rxjs/operators';


@Component({selector: 'app-form', templateUrl: './form.component.html', styleUrls: ['./form.component.css'], encapsulation: ViewEncapsulation.None})
export class FormComponent implements AfterViewInit,
OnInit,
OnDestroy {

  private _addressFieldChanged : Subscription;
  public addressQueryForm : FormGroup;
  public addressSuggestions : Array < object >;
  public statusAutocomplete : string = null;

  public buildForm() : void {
    this.addressQueryForm = this
      .formBulder
      .group({address: new FormControl, latitude: new FormControl(), longitude: new FormControl()})

  }

  constructor(private GoogleMapService : GooglePlacesService, private formBulder : FormBuilder, private ref : ChangeDetectorRef) {}

  ngOnInit() {
    this.buildForm();
  };
  ngOnDestroy() {
    this
      ._addressFieldChanged
      .unsubscribe()
  }

  ngAfterViewInit() {
    /*  every time address input changes , we make a new request to get our suggestions
         fired each 500ms and only if the field  value contains 2 char entities minimum

         two observables are chained together for better  declarative approach 
     */
    this._addressFieldChanged = this
      .addressQueryForm
      .get('address')
      .valueChanges
      .pipe(filter(currentValue => currentValue !== '' && currentValue.length >= 2), debounceTime(500), mergeMap(currentValue => this.GoogleMapService.getPlaces(currentValue)))
      .subscribe(this.onValueChange.bind(this));

  };

  onValueChange(placeSuggestions : object) {
   
    this.addressSuggestions = placeSuggestions['predictions'];
    this.statusAutocomplete = placeSuggestions['status'];
    this
      .ref
      .detectChanges(); // update suggestion bindings for this component
  };

  onSuggestionSelect(suggestion : any) {
   /* take the selected address and reach out to google servers,using geocode API, 
      to get the lat long data
   */
    if (suggestion) {
       
      this
        .GoogleMapService
        .getGeoParams(suggestion['place_id'])
        .subscribe(singleAddress => {
          // extract the desired data attributes
          let coords = singleAddress['geometry']
            ? singleAddress['geometry']['location']
            : null;
          this
            .addressQueryForm
            .get('address')
            .setValue(singleAddress['formatted_address']);
          this.populateCoords(coords)
        })
    }
  }
  populateCoords(location) {
    /* extract latitude and longitude data values  and populate the respective form-fields*/
    let lat = location.lat();
    let long = location.lng();
    this
      .addressQueryForm
      .get('latitude')
      .setValue(lat);
    this
      .addressQueryForm
      .get('longitude')
      .setValue(long);
  }

};