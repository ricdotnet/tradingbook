import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewtradeComponent } from './newtrade.component';

describe('NewtradeComponent', () => {
  let component: NewtradeComponent;
  let fixture: ComponentFixture<NewtradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewtradeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewtradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
