import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselV1Component } from './carousel-v1.component';

describe('CarouselV1Component', () => {
  let component: CarouselV1Component;
  let fixture: ComponentFixture<CarouselV1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselV1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
