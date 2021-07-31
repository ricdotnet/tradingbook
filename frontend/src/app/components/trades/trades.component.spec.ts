import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradesComponent } from './trades.component';
import {HttpClientModule} from "@angular/common/http";

describe('TradesComponent', () => {
  let component: TradesComponent;
  let fixture: ComponentFixture<TradesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradesComponent ],
      imports: [HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    localStorage.setItem('auth', JSON.stringify({token: 'aaaaaa'}))
    fixture = TestBed.createComponent(TradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
