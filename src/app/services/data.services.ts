import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginService } from "../pages/login/login.service";
import { Datos } from "../models/datos.model";

@Injectable()
export class DataServices{

    constructor(private httpClient:HttpClient, private loginService:LoginService){}

    cargarAlgo(){       //cargar archivos puesto ya en la bd
        const token = this.loginService.getIdToken();
        return this.httpClient.get('https://develaware-228cc-default-rtdb.firebaseio.com/datos.json?auth=' + token)
    }
    hacerAlgo(datos:Datos){
        //cambiar post a put para remplazar
        this.httpClient.put('https://develaware-228cc-default-rtdb.firebaseio.com/datos.json', datos).subscribe({
            next: (v) => console.log(v),
            error: (e) => console.error(e),
            complete: () => console.info('complete') 
        })
    }
}