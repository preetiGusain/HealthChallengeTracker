import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LocalstorageService } from '../localstorage.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private localStorageService: LocalstorageService) {}

  ngOnInit(): void {
  }

  searchForm = new FormGroup({
    userName: new FormControl(''),
    workoutType: new FormControl(''),
  })

  search() {
    console.log(this.searchForm.value);
    
    if(this.searchForm.value.userName) {
      if(this.searchForm.value.workoutType) {
        this.localStorageService.searchData(this.searchForm.value.userName, this.searchForm.value.workoutType);
      } else {
        this.localStorageService.searchData(this.searchForm.value.userName)
      }
    }
  }
}
