import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSalaChatComponent } from './card-sala-chat.component';

describe('CardSalaChatComponent', () => {
  let component: CardSalaChatComponent;
  let fixture: ComponentFixture<CardSalaChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardSalaChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSalaChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
