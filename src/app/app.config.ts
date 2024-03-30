import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideRouter(routes), 
    provideClientHydration(), 
    provideAnimationsAsync(), 
    importProvidersFrom(provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyCzi_PropLAWTowzhfmRrpbI1B-Lc0l-Rs",
      authDomain: "develaware-228cc.firebaseapp.com",
      databaseURL: "https://develaware-228cc-default-rtdb.firebaseio.com",
      projectId: "develaware-228cc",
      storageBucket: "develaware-228cc.appspot.com",
      messagingSenderId: "528492058443",
      appId: "1:528492058443:web:395043def37736763bface"
    }))), 
    importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore()))],
    

};
