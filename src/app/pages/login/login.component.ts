import { Component, OnInit } from '@angular/core';
// import { DataServices } from '../../services/data.services';
import { NgForm } from "@angular/forms";
import { LoginService } from './login.service';
import { FormsModule } from "@angular/forms";
import { DataServices } from '../../services/data.services';
import { NgFor } from '@angular/common'; // Importa NgFor
import { Datos } from '../../models/datos.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgFor,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  constructor( private loginService:LoginService, private dataService:DataServices){
  }

  ngOnInit():void{  
    // this.obtenerDatos().subscribe(misDatos =>{
    //   console.log(misDatos)

    //   this.datos= Object.values(misDatos)
    //   this.setDatos(this.datos)
    // })

  }
  setDatos(misDatos:Datos[]){
    this.datos = misDatos;
  }
  obtenerDatos(){
    return this.dataService.cargarAlgo()
  }

  datos:Datos[] = [
  //   // new Datos("Dato 1", "Dato de Ejemplo"),
  //   // new Datos("Dato 2", "Dato2 de Ejemplo")
  ]
  login(form: NgForm){
    const email = form.value.email
    const password = form.value.password

    this.loginService.login(email, password);
  }
  loginGoogle(){
    this.loginService.loginGoogle()
  }
  login2(form: NgForm){
    const email = form.value.email
    const password = form.value.password
    let datos = new Datos(email, password)

    this.dataService.hacerAlgo(datos);
  }
}
