import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  inject
} from '@angular/core/testing';
import {By} from '@angular/platform-browser'

import {FormComponent} from './form.component';
import {GooglePlacesService} from '../../services/google-places.service'
import {ReactiveFormsModule, FormControl} from '@angular/forms';

describe('FormComponent', () => {
  let component : FormComponent;
  let fixture : ComponentFixture < FormComponent >;

  beforeEach(async(() => {
    TestBed.configureTestingModule({declarations: [FormComponent], imports: [ReactiveFormsModule]}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  it('should create the address form control and update its value ', fakeAsync(() => {
    let addressField = fixture
      .debugElement
      .query(By.css('#address'))
      .nativeElement;
    expect(addressField.value.trim('').toBe(''));
    fixture.detectChanges();

    addressField.value = 'Glasgow Uk'
    tick();
    expect(fixture.componentInstance.addressQueryForm.get('address').value).toEqual('Glasgow Uk');

  }))
});
