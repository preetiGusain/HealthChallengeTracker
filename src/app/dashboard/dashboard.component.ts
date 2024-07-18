import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from '../localstorage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userData: any[] = [];

  constructor(private localStorageService: LocalstorageService) {}

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.userData = this.localStorageService.getUserData();
  }
}
