import { Component, OnInit } from '@angular/core';
// remember to remove

import {HttpClient} from '@angular/common/http';
import { DatabaseService} from '../database.service';

import {openDB} from "idb/with-async-ittr-cjs";






@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  page = 0;
  resultsCount= 10;
  totalPages = 10;

 public data = [];


  bulkEdit = false;
  sortDirection = 0;


  sortKey = null;


  constructor(private http: HttpClient, private db: DatabaseService) {


   }

  ngOnInit(): void {
    // this.loadData();
    this.getData();


  }


  loadData(){

  }

  sortBy(key){
    this.sortKey = key;
    this.sortDirection++;
    this.sort();

  }

  sort(){
   if(this.sortDirection == 1){
      this.data = this.data.sort((a, b)=>{
        const valA = a[this.sortKey];
        const valB = b[this.sortKey];

        return valA.localeCompare(valB);
      })
   }

   else if (this.sortDirection == 2){
    this.data = this.data.sort((a, b)=>{
      const valA = a[this.sortKey];
      const valB = b[this.sortKey];

      return valB.localeCompare(valA);
    })
   }

   else{
     this.sortDirection = 0;
     this.sortKey = null;
   }
  }

  toggleBulkEdit(){
  console.log(this.data);
  }

  bulkDelete(){

  }

  removeRow(index){
     this.data.splice(index, 1)
  }


  async getData(){
  const db = await openDB("Orders", 1, {
    upgrade(db) {
      const store = db.createObjectStore('OrderStore', {
        autoIncrement: true,
      });

    }
  });

console.log();


db.getAll("OrderStore").then(result => {
  console.log(result)
  this.data = result;


  console.log(this.data)
})
}

}
