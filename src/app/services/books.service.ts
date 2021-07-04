import { Book } from './../models/book.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  books: Book[] = [];
   //subject qui va emettre la liste de books
  booksSubject = new Subject<Book[]>()

  constructor() { }

  emitBooks(){ // la methode qui va emettre la liste des books vers la base à travers l'objet subject.
    this.booksSubject.next(this.books);
  }
  // methode pour enregistrer les books dans la base de firestore
  saveBooks(){
    firebase.default.database().ref('/books').set(this.books);
  }
  getBooks(){
    firebase.default.database().ref('/books')
    .on('value', (data) => {
      this.books = data.val() ? data.val() : [];
      this.emitBooks();
    })
  }
  getSingleBook(id: number){
    return new Promise(
      (resolve, reject) => {
        firebase.default.database().ref('books' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) =>{
            reject(error);
          }
        )
      }
    )
  }
  createNewBook(newBook: Book){
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }
  removeBook(book: Book){
    const bookIndexToRemove = this.books.findIndex(
      (bookEl) => {
        if(bookEl === book){
          return true;
        }
      }
    )
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }
  uploadFile(file: File){   
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.default.storage().ref()
        .child('images/' + almostUniqueFileName + file.name)
        .put(file);
        upload.on(firebase.default.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement...');
          },
          (error) => {
            console.log("Erreur de chargement: " + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
          );
      }
    );
  }
}
