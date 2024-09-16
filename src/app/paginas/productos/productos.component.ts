import { Component } from '@angular/core';
import { ProductoCarouselComponent } from '../../reutilizables/producto-carousel/producto-carousel.component';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    ProductoCarouselComponent
  ],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {

}
