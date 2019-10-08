import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreroomItemComponent } from './storeroom-item.component';

describe('StoreroomItemComponent', () => {
  let component: StoreroomItemComponent;
  let fixture: ComponentFixture<StoreroomItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreroomItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreroomItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
