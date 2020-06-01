import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class FireBaseService {

  auth
  public usersURL = "users";
  public notifsURL = "notification";
  public ideasURL = "ideas";
  public initiativesURL = "initiatives";
  public publicURL = "initiatives";
  
  constructor(public db: AngularFirestore, public ds: DataService) {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(environment.firebaseConfig);
    }
    this.auth = firebase.auth()
  }

  getCollectionDoc(param, pId): Observable<any> {
    if (environment.refresh) {
      return this.db.collection(param).doc(pId).valueChanges().pipe(map(res => {
        return res
      }), catchError(err => this.handleError(err)))
    } else {
      return this.db.collection(param).doc(pId).get().pipe(map(res => {
        return res.data()
      }), catchError(err => this.handleError(err)))
    }

  }

  getCollection(param): Observable<any> {
    if (environment.refresh) {
      return this.db.collection(param).valueChanges().pipe(map(res => {
        return res
      }), catchError(err => this.handleError(err)))
    } else {
      return this.db.collection(param).get().pipe(map(res => {
        return res.docChanges().map(ress => ress.doc.data())
      }), catchError(err => this.handleError(err)))
    }

  }

  addWidthDocId(param, pUser) {
    return this.db.collection(param).doc(pUser.id).set(pUser.data)
  }

  updateDoc(param, pUser) {
    return this.db.doc(param + '/' + pUser.id).update(pUser.data);
  }

  deleteDoc(param, pUser) {
    return this.db.doc(param + '/' + pUser.id).delete();
  }

  handleError(error: any) {
    // this.logout('')
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return of(errMsg);
  }
}
