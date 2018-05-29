import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {MapsAPILoader} from '@agm/core';
import {} from '@types/googlemaps';
import {isArray} from 'util';

@Injectable({providedIn: 'root'})
export class GooglePlacesService {

  private _placesAutoCompleteService : google.maps.places.AutocompleteService;
  private _geocodeService : google.maps.Geocoder;

  constructor(private _mapsAPILoader : MapsAPILoader) {
    this.loadGoogleAPI();
  }

  private loadGoogleAPI() {
    this
      ._mapsAPILoader
      .load()
      .then(() => {
        this._placesAutoCompleteService = new google
          .maps
          .places
          .AutocompleteService();
        this._geocodeService = new google
          .maps
          .Geocoder();
      })
      .catch(errorResp => {
        console.log('errorResp', errorResp);
      })
  };

  public getPlaces(input : string) {
    /* reach out to google servers and obtain prediction data, based upon the input value provided*/
    return Observable.create(observer => {

      let options = {
        input: input
      };

      this
        ._placesAutoCompleteService
        .getPlacePredictions(options, (predictions, status) => {
          observer.next({predictions, status});
          observer.complete();
        });
    });
  };

  public getGeoParams(placeId : string) {
    /* take the place id and use geocode api to obtain exact geo data*/ 
    return Observable.create(observer => {
      this
        ._geocodeService
        .geocode({
          placeId: placeId
        }, (response, status) => {

          if (isArray(response) && response.length > 0) {
            // google always returns an array that contains   a single object,corresponding
            // to the place ID is supplied
            observer.next(response.shift());
            observer.complete()
          };
        })
    });

  };
};