import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';

const key: string = 'userData'; // the key for localStorage

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  workoutForm = new FormGroup({
    userName: new FormControl(''),
    workoutType: new FormControl(''),
    workoutMinutes: new FormControl(0),
  })

  storeUserInput() {
    var x = localStorage.getItem(key);
    var dataToSave;
    if(x === null) {
      dataToSave = [];
    } else {
      dataToSave = JSON.parse(x);
    }

    const indexOfExistingElement = dataToSave.findIndex((elem: any) => elem.name === this.workoutForm.value.userName)

    if(indexOfExistingElement !== -1) { // this is for when we are entering a new workout for an existing user

      // get the existing entry
      const existingVal = dataToSave[indexOfExistingElement];
      //insert this new workout into existing entry's workout array
      existingVal['workouts'].push({ type: this.workoutForm.value.workoutType, minutes: Number(this.workoutForm.value.workoutMinutes) });
      //put back this updated value into dataToSave at the correct place
      dataToSave[indexOfExistingElement] = existingVal;
    } else { // for a new user entry

      const newEntry = {
        id: dataToSave.length + 1, // this will allow us to create auto-increasing ids
        name: this.workoutForm.value.userName,
        workouts: [
          { type: this.workoutForm.value.workoutType, minutes: Number(this.workoutForm.value.workoutMinutes) }
        ]
      };
      dataToSave.push(newEntry);
    }

    localStorage.setItem(key, JSON.stringify(dataToSave)); // put dataToSave as string into localStorage
  }
}
