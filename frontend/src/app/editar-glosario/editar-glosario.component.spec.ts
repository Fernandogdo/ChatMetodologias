import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarGlosarioComponent } from './editar-glosario.component';

describe('EditarGlosarioComponent', () => {
  let component: EditarGlosarioComponent;
  let fixture: ComponentFixture<EditarGlosarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarGlosarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarGlosarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
