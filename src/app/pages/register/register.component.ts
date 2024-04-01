import { NgFor } from '@angular/common';
import { Component, Injectable } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserI } from '../../models/users.model';
import { LoginService } from '../login/login.service';
import { FirestoreService } from '../../services/firestore.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    NgFor,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
@Injectable({
  providedIn: 'root'
})
export class RegisterComponent {

  datos: UserI = {
    uid: '',
    nombre: '',
    correo: '',
    password: '',
    perfil: 'visitante'
  }

  constructor(private loginService:LoginService, private firestore: FirestoreService, private router : Router){}

  async registrar(form: NgForm){
    this.datos.correo = form.value.email
    this.datos.nombre = form.value.name
    const password = form.value.password
    this.datos.password = null
    // console.log(email, nombre, password)
    const res = await this.loginService.registerUser(this.datos.correo, password)
    .catch(
      error=>{
          console.log('error' + error)
      })
    if(res){
      console.log(res)
      this.datos.uid = res.user.uid;
      await this.firestore.crearUsuario(this.datos)
      .then(() =>{
        this.router.navigate(['/login']);
        
        Swal.fire({  
          icon: 'success',  
          title: 'Usuario Registrado',  
          text: 'Inicie Sesion',   
        })
      })
      .catch(
        error=>{
            console.log('error' + error)
        })
    }

    // this.loginService.login(email, password);
  }
}
