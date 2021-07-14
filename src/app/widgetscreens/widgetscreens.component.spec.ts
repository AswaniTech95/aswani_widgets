import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetscreensComponent } from './widgetscreens.component';

describe('WidgetscreensComponent', () => {
  let component: WidgetscreensComponent;
  let fixture: ComponentFixture<WidgetscreensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetscreensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetscreensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
