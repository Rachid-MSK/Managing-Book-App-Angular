import { Component } from '@angular/core';
import * as firebase from 'firebase';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
constructor(){ 
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyBWNP-ZoeAZEc5NpJwvp7bLgdWisBTSeUI",
    authDomain: "book-store-managment.firebaseapp.com",
    projectId: "book-store-managment",
    storageBucket: "book-store-managment.appspot.com",
    messagingSenderId: "141286925242",
    appId: "1:141286925242:web:9023b5aeff4e8f482d3383",
    measurementId: "G-65NLLEFK7S"
  };
  // Initialize Firebase
    firebase.default.initializeApp(firebaseConfig);
}
}
