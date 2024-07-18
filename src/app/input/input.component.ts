import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { LocalstorageService } from '../localstorage.service';

const key: string = 'userData'; // the key for localStorage

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  userNameError: boolean = false;
  workoutTypeError: boolean = false;
  workoutMinuteAbsentError: boolean = false;
  workoutMinuteInvalidError: boolean = false;

  constructor(private localStorageService: LocalstorageService) { }

  ngOnInit(): void {
  }

  workoutForm = new FormGroup({
    userName: new FormControl(''),
    workoutType: new FormControl(''),
    workoutMinutes: new FormControl(),
  })

  storeUserInput() {
    this.clearErrors();

    if(!this.workoutForm.value.userName) {
      this.userNameError = true;
    } else if(!this.workoutForm.value.workoutType) {
      this.workoutTypeError = true;
    } else if(!this.workoutForm.value.workoutMinutes) {
      this.workoutMinuteAbsentError = true;
    } else if (this.workoutForm.value.workoutMinutes <= 0) {
      this.workoutMinuteInvalidError = true;
    } else if(this.workoutForm.value.userName && this.workoutForm.value.workoutType && this.workoutForm.value.workoutMinutes) {
      this.localStorageService.setUserData(this.workoutForm.value.userName, this.workoutForm.value.workoutType, this.workoutForm.value.workoutMinutes);
      this.clearValues();
    }
  }

  clearErrors() {
    this.userNameError = false;
    this.workoutTypeError = false;
    this.workoutMinuteAbsentError = false;
    this.workoutMinuteInvalidError = false;
  }

  clearValues() {
    this.workoutForm.setValue({userName : null, workoutType: null, workoutMinutes: null});
  }
}
