import { Component } from "@angular/core";
import { ResetPasswordService } from "./reset-password.service";
import { NgForm } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { NgFor } from "@angular/common"; // Importa NgFor

@Component({
  selector: "app-reset-password",
  standalone: true,

  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.css"],
  imports: [FormsModule, NgFor],
})
export class ResetPasswordComponent {
  email: string = "";

  constructor(private resetPasswordService: ResetPasswordService) {}

  onSubmit(event: Event) {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario
    this.resetPasswordService.resetPassword(this.email);
  }
}
