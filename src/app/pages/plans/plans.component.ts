import Swal from "sweetalert2";
import { Component } from "@angular/core";

@Component({
  selector: "app-plans",
  standalone: true,
  imports: [],
  templateUrl: "./plans.component.html",
  styleUrl: "./plans.component.css",
})
export class PlansComponent {
  doubleclick(): void {
    Swal.fire("Hiciste un doble CLICK!");
  }
  hoverbutton(): void {
    Swal.fire("Hiciste un hover en el boton!");
  }
  clickEvent(): void {
    Swal.fire("Hiciste un click en el boton!");
  }

  colores = [
    "bg-red-600",
    "bg-blue-600",
    "bg-green-600",
    "bg-purple-600",
    "bg-orange-600",
  ];
  indiceColorActual = 0;
  colorActual = this.colores[this.indiceColorActual];

  cambiarColor() {
    this.indiceColorActual = (this.indiceColorActual + 1) % this.colores.length;
    this.colorActual = this.colores[this.indiceColorActual];
  }
}
