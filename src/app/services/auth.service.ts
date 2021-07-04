import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  //methode pour créer nouveau user
  createNewUser(email: string, password: string){
    return new Promise(
      (resolve, reject) => {
        firebase.default.auth().createUserWithEmailAndPassword(email, password).then(
          (value) => {
            resolve(value);
          },
          (error) => {
            reject(error);
          }
        )
      }
    )
  }
  //methode pour signin user qui a deja un compte
  signInUser(email: string, password: string){
    return new Promise(
      (resolve, reject) => {
        firebase.default.auth().signInWithEmailAndPassword(email, password).then(
          (value) => {
            resolve(value);
          },
          (error) => {
            reject(error);
          }
        )
      }
    )
  }
  //methode pour signout un user from application
  signOutUser(){
    firebase.default.auth().signOut();
  }
}
