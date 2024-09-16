import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotasPendientesComponent } from './notas-pendientes.component';

describe('NotasPendientesComponent', () => {
  let component: NotasPendientesComponent;
  let fixture: ComponentFixture<NotasPendientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotasPendientesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotasPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
