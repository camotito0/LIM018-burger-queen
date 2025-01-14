import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  productsRef = this.firestore.collection('orders')

  constructor( public firestore: AngularFirestore ) {  }

  setUserData(user:User, uid:string) {
    const userRef = this.firestore.collection('users').doc(uid)
     return userRef.set(user, {
     merge:true,
     });
   }
 
  getUserByUid(uid:string){
    return this.firestore.collection('users').doc(uid).valueChanges()
   }

  addMenuOrder(order:{}) {
  return this.productsRef.add(order)
  }
  
  getOrdersByState(state:string) {
    return this.firestore.collection('orders', ref => ref.where('state', '==', state).orderBy('initialHour', 'asc')).snapshotChanges()
  }

  updateOrder(id:string, field:any) {
    return  this.productsRef.doc(id).update(field)
  }
}
