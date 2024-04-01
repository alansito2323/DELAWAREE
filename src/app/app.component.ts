import { Component, OnInit } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { IndexComponent } from "./pages/index/index.component";
import { AboutusComponent } from "./pages/aboutus/aboutus.component";
import { CrudComponent } from "./pages/crud/crud.component";
import { PlansComponent } from "./pages/plans/plans.component";
import { DataServices } from "./services/data.services";
import { HttpClientModule } from "@angular/common/http";
import { LoginService } from "./pages/login/login.service";
import { CommonModule } from "@angular/common";
import { CookieService } from "ngx-cookie-service";
import { LoginGuardian } from "./pages/login/login-guardian";
import { AngularFireModule } from "@angular/fire/compat";
import { FormsModule } from "@angular/forms";

import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { RegisterComponent } from "./pages/register/register.component";
import firebase from "firebase/compat/app";
import { FirestoreService } from "./services/firestore.service";
import {
  Firestore,
  FirestoreModule,
  getFirestore,
} from "@angular/fire/firestore";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    FormsModule,
    RouterOutlet, // Para la colocación de componentes basados en la ruta.
    IndexComponent,
    AboutusComponent,
    CrudComponent,
    PlansComponent,
    RouterLink,
    // Esto generalmente no es necesario aquí, considera usar RouterLink directamente en tus plantillas HTML.
    HttpClientModule,
    CommonModule,
    RegisterComponent,
  ],
  providers: [DataServices, LoginService, CookieService, LoginGuardian],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"], // Corregido a 'styleUrls' y debe ser un array.
})
export class AppComponent implements OnInit {
  title = "develaware";
  rol: string;
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.obtenerPermisos();
    // firebase.initializeApp({
    //   apiKey: "AIzaSyCzi_PropLAWTowzhfmRrpbI1B-Lc0l-Rs",
    //   authDomain: "develaware-228cc.firebaseapp.com",
    //   databaseURL: "https://develaware-228cc-default-rtdb.firebaseio.com",
    // })
  }

  estaLogueado() {
    return this.loginService.estaLogueado();
  }
  obtenerPermisos() {
    // console.log(this.loginService.getDatosUser())
    this.loginService.getDatosUser().then((res) => {
      // console.log(res)
      this.rol = res;
      return this.rol;
    });
  }
  logout() {
    this.loginService.logout();
  }
}
