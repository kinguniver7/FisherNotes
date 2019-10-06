import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinFishingComponent } from './spin-fishing.component';

describe('SpinFishingComponent', () => {
  let component: SpinFishingComponent;
  let fixture: ComponentFixture<SpinFishingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpinFishingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinFishingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
