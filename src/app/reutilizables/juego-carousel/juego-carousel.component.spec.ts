import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoCarouselComponent } from './juego-carousel.component';

describe('JuegoCarouselComponent', () => {
  let component: JuegoCarouselComponent;
  let fixture: ComponentFixture<JuegoCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuegoCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JuegoCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
