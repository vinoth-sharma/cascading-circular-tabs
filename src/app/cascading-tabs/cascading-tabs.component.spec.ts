import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CascadingTabsComponent } from './cascading-tabs.component';

describe('CascadingTabsComponent', () => {
  let component: CascadingTabsComponent;
  let fixture: ComponentFixture<CascadingTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CascadingTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CascadingTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
