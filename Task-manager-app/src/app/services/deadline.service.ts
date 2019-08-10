import { Injectable } from '@angular/core';
import { Task } from '../interfaces';

@Injectable({
  providedIn: 'root'
})

export class DeadlineService {

  get _today(): Date{
    return new Date();
  }

  get _tommorow(): Date{
    const tommorow = new Date();
    tommorow.setDate(tommorow.getDate() + 1);
    return tommorow;
  }

  get isThereMissedTasks(): boolean {
    const tasks = JSON.parse(localStorage.getItem('tasks')) as Task[];
    return tasks.some(task => this.isPassed(task.deadline) && !task.isDone);
  }

  getTodayTasks(): Task[] {
    return JSON.parse(localStorage.getItem('tasks'))
    .filter(task => this.isToday(task.deadline) && !task.isDone)
  }

  isPassed(date: Date | string): boolean {
    
    const srcDate = new Date(date).setHours(0,0,0,0);
    const today = new Date().setHours(0,0,0,0);

    return today - srcDate > 0;
    
  }

  isToday(date: Date | string): boolean {

    const srcDate = new Date(date).setHours(0,0,0,0);
    const today = new Date().setHours(0,0,0,0);

    return today === srcDate

  }

  isSameDate(srcDate: Date | string, targetDate: Date | string): boolean{

    const time_1 = new Date(srcDate).setHours(0,0,0,0);
    const time_2 = new Date(targetDate).setHours(0,0,0,0);

    return time_1 === time_2;

  }

  isInDateScope(srcDate: Date | string, minDate: Date | string, maxDate: Date | string): boolean{

    const srcTime = new Date(srcDate).getTime();
    const minTime = minDate && new Date(minDate).setHours(0,0,0,0) || 0;
    const maxTime = maxDate && new Date(maxDate).setHours(23,59,59,0) || Infinity;
    
    return srcTime < maxTime && srcTime >= minTime

  }
  
}
