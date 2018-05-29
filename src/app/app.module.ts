import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import {AgmCoreModule} from '@agm/core';
import {AppComponent} from './app.component';
import {FormComponent} from './components/form/form.component';


import {GooglePlacesService} from './services/google-places.service';


import {SuggestionListComponent} from './components/form/suggestion-list/suggestion-list.component';

@NgModule({
  declarations: [
    AppComponent, FormComponent, SuggestionListComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule, AgmCoreModule.forRoot({apiKey: 'AIzaSyC7m2sRMSAROfGjr_Gufex4baYiyFpPDrM', libraries: ['places']})
  ],
  providers: [

    GooglePlacesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
