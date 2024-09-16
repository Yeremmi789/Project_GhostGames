import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoCarouselComponent } from './producto-carousel.component';

describe('ProductoCarouselComponent', () => {
  let component: ProductoCarouselComponent;
  let fixture: ComponentFixture<ProductoCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
