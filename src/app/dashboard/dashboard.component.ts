import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from '../localstorage.service';
const key: string = 'userData'; // the key for localStorage


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userData: any[] = [];

  constructor(localStorageService: LocalstorageService) {
    
  }

  ngOnInit(): void {


    var x = localStorage.getItem(key);
    if (x === null) {
      this.userData = [];
    } else {
      this.userData = this.transform(x);
    }
  }

  transform(inputFromLocal: any): any[] {
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
