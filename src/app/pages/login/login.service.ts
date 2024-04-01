import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";

import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import { CookieService } from "ngx-cookie-service";
import { UserI } from "../../models/users.model";
import { Firestore } from "@angular/fire/firestore";
// import { Auth } from '@angular/fire/auth';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, getIdToken, GoogleAuthProvider, signInWithPopup  } from "firebase/auth";
import Swal from "sweetalert2";
import { FirestoreService } from "../../services/firestore.service";

@Injectable({
    providedIn: 'root'
  })
export class LoginService{
    constructor(private router:Router, private cookies:CookieService, private firestore: Firestore, private fsService : FirestoreService){}

    token:string;
    uid: string;
    login(email:string, password:string, ){
        
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password).then(
            response=>{
                // console.log(response.user)
                const id = response.user.uid
                const token = getIdToken(response.user)
                .then((idToken) => {
                    this.token=idToken;
                    this.cookies.set("token", this.token);
                    this.cookies.set("uid", id);
                    this.router.navigate(['/home']);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    
                    Swal.fire({  
                        icon: 'error',  
                        title: errorCode,  
                        text: errorMessage,   
                    })
                    // console.log(errorCode + errorMessage)
                  });
                
                // firebase.auth().currentUser?.getIdToken().then(
                //     token =>{
                        
                //     }
                // )
            }
        ).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + errorMessage)
            Swal.fire({  
                icon: 'error',  
                title: 'Credenciales Incorrectas',    
            })
          });
    }
    loginGoogle(){
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            // The signed-in user info.
            const user = result.user;
            const id = result.user.uid;
            // console.log(result)
            
            this.cookies.set("token", this.token);
            this.cookies.set("uid", id);
            this.router.navigate(['/home']);

        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }
    getIdToken(){
        return this.cookies.get("token");
        // return this.token;
    }

    estaLogueado(){
        return this.cookies.get("token");
        // return this.token;
    }

    logout(){
        const auth = getAuth();
        signOut(auth).then((res) => {
            // console.log(res);
            this.token="";
            const id = "";
            this.cookies.set("token", this.token);
            this.cookies.set("uid", id);

            // this.router.navigate(['/']);
            window.location.reload();
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + errorMessage)
          });
    }

    registerUser(email:string, password:string){
        const auth = getAuth();
        return createUserWithEmailAndPassword(auth, email, password);
        // .then(
        //     response=>{
        //         this.router.navigate(['/crud']);
        //     }
        // )
    }
    async getDatosUser(){
        const uid = this.cookies.get("uid");
        if(uid.length > 10){
            const res = await this.fsService.obtenerDocumento(uid)
            if (res.length > 0) {
                const perfil = res[0]["perfil"];
                console.log(perfil);
                return perfil;
            } else {
                Swal.fire({  
                    icon: 'error',  
                    title: 'Algo Ocurrio con la base de datos',    
                })
            }
        }
    }
}