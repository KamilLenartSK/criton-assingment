import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';

@Component({selector: 'app-suggestion-list', templateUrl: './suggestion-list.component.html', styleUrls: ['./suggestion-list.component.css']})
export class SuggestionListComponent implements OnInit,
OnChanges {
  @Input()suggestions : Array < object >;
  @Input()statusCode : string;
  @Output()onSuggestionSelect : EventEmitter < any > = new EventEmitter();
  public statusMessage : string;
  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    switch (this.statusCode) {
      case 'OK':
        this.statusMessage = 'Suggestions Found';
        break;
      case 'ZERO_RESULTS':
        this.statusMessage = 'No Suggestions Found';
        break;
      case 'OVER_QUERY_LIMIT':
        this.statusMessage = 'Daily Qouate Exceeded !';
        break;
      case 'REQUEST_DENIED':
        this.statusMessage = 'Invalid API Key supplied!';
        break;

      case 'INVALID_REQUEST':
        this.statusMessage = 'Missing correct Format of the request!';
        break;
      default:
        'Google servers have collapsed-  the World is about to end';
        break;
    }
  }
  onSelected(address) {
    // emits the selected address 
    this
      .onSuggestionSelect
      .emit(address)
  }

}
