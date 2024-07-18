import { Injectable } from '@angular/core';
const key: string = 'userData'; // the key for localStorage

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  setUserData(userName: string, workoutType: string, workoutMinutes: number): void {
    var x = localStorage.getItem(key);
    var dataToSave;
    if(x === null) {
      dataToSave = [];
    } else {
      dataToSave = JSON.parse(x);
    }

    const indexOfExistingElement = dataToSave.findIndex((elem: any) => elem.name === userName)

    if(indexOfExistingElement !== -1) { // this is for when we are entering a new workout for an existing user

      // get the existing entry
      const existingVal = dataToSave[indexOfExistingElement];
      //insert this new workout into existing entry's workout array
      existingVal['workouts'].push({ type: workoutType, minutes: Number(workoutMinutes) });
      //put back this updated value into dataToSave at the correct place
      dataToSave[indexOfExistingElement] = existingVal;
    } else { // for a new user entry

      const newEntry = {
        id: dataToSave.length + 1, // this will allow us to create auto-increasing ids
        name: userName,
        workouts: [
          { type: workoutType, minutes: Number(workoutMinutes) }
        ]
      };
      dataToSave.push(newEntry);
    }

    localStorage.setItem(key, JSON.stringify(dataToSave)); // put dataToSave as string into localStorage
  }

  getUserData(): any[] {
    var x = localStorage.getItem(key);
    if (x === null) {
      return [];
    } else {
      return this.transform(x);
    }
  }

  private transform(inputFromLocal: any): any[] {
    const JSONfromLocal = JSON.parse(inputFromLocal);
    const toReturn = JSONfromLocal.map((element: any) => {
      const workouts = element["workouts"].map((workout: any) => workout.type).join(', ');
      const totalWorkoutMinutes = element["workouts"].reduce(
        (accumulator: Number, workout: any) => Number(accumulator) + Number(workout.minutes),
        0,
      );
      return {
        name: element.name,
        workouts,
        numberOfWorkouts: element["workouts"].length,
        totalWorkoutMinutes,
      }
    });
    return toReturn;
  }
}
