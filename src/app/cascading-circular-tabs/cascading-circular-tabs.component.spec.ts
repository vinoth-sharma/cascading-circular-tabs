import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CascadingCircularTabsComponent } from './cascading-circular-tabs.component';

describe('CascadingCircularTabsComponent', () => {
  let component: CascadingCircularTabsComponent;
  let fixture: ComponentFixture<CascadingCircularTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CascadingCircularTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CascadingCircularTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
