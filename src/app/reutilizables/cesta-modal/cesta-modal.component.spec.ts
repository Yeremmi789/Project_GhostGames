import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CestaModalComponent } from './cesta-modal.component';

describe('CestaModalComponent', () => {
  let component: CestaModalComponent;
  let fixture: ComponentFixture<CestaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CestaModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CestaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
