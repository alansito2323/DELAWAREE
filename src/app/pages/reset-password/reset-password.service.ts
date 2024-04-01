import { Injectable } from "@angular/core";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Swal from "sweetalert2";

@Injectable({
  providedIn: "root",
})
export class ResetPasswordService {
  constructor() {}

  resetPassword(email: string) {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Si el correo se envía correctamente, muestra un mensaje de éxito
        Swal.fire({
          icon: "success",
          title: "Correo enviado",
          text: "Revisa tu bandeja de entrada para restablecer tu contraseña.",
        });
      })
      .catch((error) => {
        // Maneja errores como correo electrónico no registrado o problemas de red
        const errorCode = error.code;
        const errorMessage = error.message;
        Swal.fire({
          icon: "error",
          title: "Error al enviar correo",
          text: `${errorCode}: ${errorMessage} ${email}`,
        });
      });
  }
}
