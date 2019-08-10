import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../interfaces';
import { DeadlineService } from '../services';

const CHECKED = '&#10004;'
const PROGRESS = '&#8635;'
const MISSED = '&#10008;'

@Pipe({
  name: 'status'
})

export class StatusPipe implements PipeTransform {

  constructor(private _deadline: DeadlineService){};

  transform(task: Task): string {

    /* for HTML specsymbols only */
    const elem = document.createElement('span');

    if(task.isDone){
      elem.innerHTML = `Done ${CHECKED}`
      return elem.innerHTML;
    }

    else if(this._deadline.isPassed(task.deadline)){
      elem.innerHTML = `Missed ${MISSED}`
      return elem.innerHTML;
    }
    
    else{
      elem.innerHTML = `In Progress ${PROGRESS}`
      return elem.innerHTML;
    }
    
  }

}
