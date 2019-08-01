import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamsDetailsComponent } from './params-details.component';

describe('ParamsDetailsComponent', () => {
  let component: ParamsDetailsComponent;
  let fixture: ComponentFixture<ParamsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParamsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
