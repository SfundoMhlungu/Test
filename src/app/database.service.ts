import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  localStorage: Storage;

  constructor() {

    this.localStorage = window.localStorage;

   }


   getData(){



    let toBeReturned: Array<any> = [];

    let request = window.indexedDB.open("Orders", 1),
       db,
       tx,
      store,
      index;


  request.onupgradeneeded = (e) => {
   let db = request.result,
       store = db.createObjectStore("OrderStore",
       {autoIncrement : true});


  }


  request.onerror = (error) => {
    console.log(error);
  }


  request.onsuccess = (e) => {
    console.log("success")
      db = request.result;
      tx = db.transaction("OrderStore", "readwrite");
      store = tx.objectStore("OrderStore");
      db.onerror = function(e) {
          console.log("ERR" + e.target.errorCode)
        }


    // store.put({file: this.selectedFile});

    let  data= store.getAll();

    data.onsuccess = function() {
      console.log( data.result)
      this.toBeReturned = data.result;

    }



    tx.oncomplete = function(e) {
      db.close();
      console.log("closing")
    }


    return toBeReturned;


  }





   }


   sendData(data:Object) {


    let toBeReturned: Array<any> = [];

    let request = window.indexedDB.open("Orders", 1),
       db,
       tx,
      store,
      index;


  request.onupgradeneeded = (e) => {
   let db = request.result,
       store = db.createObjectStore("OrderStore",
       {autoIncrement : true});


  }



  request.onerror = (error) => {
    console.log(error);
  }


  request.onsuccess = (e) => {
    console.log("success")
      db = request.result;
      tx = db.transaction("OrderStore", "readwrite");
      store = tx.objectStore("OrderStore");
      db.onerror = function(e) {
          console.log("ERR" + e.target.errorCode)
        }


   let inputData = store.put(data);



   inputData.onsuccess = function() {
      console.log(inputData.result)


    }



    tx.oncomplete = function(e) {
      db.close();
      console.log("closing")
    }
  }

   }


}
