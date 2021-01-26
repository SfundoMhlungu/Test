import { Component, OnInit } from '@angular/core';
// remember to remove

import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  page = 0;
  resultsCount= 10;
  totalPages = 10;

  data = [];


  bulkEdit = false;
  sortDirection = 0;


  sortKey = null;


  constructor(private http: HttpClient) {


   }

  ngOnInit(): void {
    this.loadData();
  }


  loadData(){
    this.http.get(`https://randomuser.me/api/?page=${this.page}&results=${this.resultsCount}`).subscribe(res =>{
      console.log('res_ ', res);
      this.data = res['results'];
      this.sort()
    });
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

  }

  bulkDelete(){

  }

  removeRow(index){
     this.data.splice(index, 1)
  }




}
