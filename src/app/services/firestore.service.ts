import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { UserI } from '../models/users.model';
import { DocumentData, addDoc, deleteDoc, doc, getDoc, getDocs, query, where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) { }

  async crearUsuario(user : UserI){
    let col = collection(this.firestore,'Usuarios');
    const docRef = await addDoc(col, user);

    return docRef.id;
  }
  obtenerDocumentos(){
    let col = collection(this.firestore, 'Usuarios');
    return collectionData(col,{idField:'id'});
  }
  async obtenerDocumento(uid: string){
    let col = collection(this.firestore, 'Usuarios');
    const q = query(col, where("uid", "==", uid));
    // console.log('uid', uid)

    const querySnapshot = await getDocs(q);
    //console.log(querySnapshot)
    const userData: DocumentData[] = [];

    querySnapshot.forEach(doc => {
        userData.push(doc.data());
    });

    return userData;
  }
  borrarDoc(id: string, path: string){
    let docRef = doc(this.firestore, path +'/'+id)
    return deleteDoc(docRef);
  }
}
