import shortid from 'shortid'

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DeadlineService } from './deadline.service';
import { DialogService } from './dialog.service';
import { Task } from '../interfaces';

import { 
  DELETE_WARNING, 
  EDITING_WARNING,
  MARK_AS_UNDONE_WARNING, 
  MOCK_TASKS,
  INITIAL_ALERT,
  REMOVE_MULTIPLE_WARNING,
  DELETE_FEEDBACK,
  EDITING_FEEDBACK,
  REMOVE_MULTIPLE_FEEDBACK,
  REMOVE_ALL_FEEDBACK,
} from '../constants';


@Injectable({
  providedIn: 'root'
})

export class StorageService {

  public _editor = new Subject<string>();
  public _updateListener = new Subject<void>();

  constructor(
    private _dialog: DialogService,
    private _deadline: DeadlineService,
  ) {}

  /* ----- Private Implementations ----- */

  private _byId(tasks: Task[], id: string): number{
    return tasks.findIndex(task => task.id === id)
  }

  private _removeTask(id: string){
    const tasks: Task[] = this.taskList;
    const _index = this._byId(tasks,id);
    tasks.splice(_index,1);
    this._updateStorage(tasks);
  }

  private _toggleStatus(id: string){
    const tasks: Task[] = this.taskList;
    const _task = tasks[this._byId(tasks,id)];
    _task.isDone = !_task.isDone;
    this._updateStorage(tasks);
  }

  private _editTask(id: string, newValue: Task){
    const tasks: Task[] = this.taskList;
    const _index = this._byId(tasks,id);
    tasks[_index] = {...newValue, id: tasks[_index].id};
    this._updateStorage(tasks);
    this._editor.next(null);
  }

  private _updateStorage(tasks: Task[]){
    window.localStorage.setItem('tasks',JSON.stringify(tasks));
    this._updateListener.next();
  }




  /* ----- Public Methods ----- */

  get taskList(): Task[]{
    return JSON.parse(window.localStorage.getItem('tasks'));
  }

  get placeNames(): string[]{
    const placeNames = Array.from(new Set(this.taskList.map(task => task.placeName)));
    placeNames.sort();
    return placeNames;
  }

  get addresses(): string[]{
    const addresses = Array.from(new Set(this.taskList.map(task => task.address)))
    addresses.sort();
    return addresses;
  }
  

  addTask(newTask: Task){
    newTask.id = shortid.generate();
    const tasks: Task[] = this.taskList;
    tasks.push(newTask);
    this._updateStorage(tasks);
  }

  removeTask(id: string){
    this._dialog.actByConfirm({
      message: DELETE_WARNING,
      accept: () => this._removeTask(id),
      feedback: DELETE_FEEDBACK,
    })
  }

  editTask(id: string, newValue: Task){
    this._dialog.actByConfirm({
      message: EDITING_WARNING,
      accept: () => this._editTask(id, newValue), 
      feedback: EDITING_FEEDBACK,
    })
  }

  toggleStatus(id: string){
    const _task = this.taskList.find(task => task.id === id);
    if(this._deadline.isPassed(_task.deadline)){
      this._dialog.actByConfirm({
        message: MARK_AS_UNDONE_WARNING,
        accept: () => this._toggleStatus(id),
      })
    }else{
      this._toggleStatus(id);
    }
  }

  removeAllTasks(){
    const quantity = this.taskList.length;
    this._dialog.actByConfirm({
      message: REMOVE_MULTIPLE_WARNING(quantity),
      accept: () => this._updateStorage([]),
      feedback: REMOVE_ALL_FEEDBACK(quantity),
    })
  }

  removeMissedTasks(){
    const notMissedTasks = this.taskList.filter(task => {
      return !this._deadline.isPassed(task.deadline) || task.isDone;
    });
    const missedTasksQuantity = this.taskList.length - notMissedTasks.length;

    this._dialog.actByConfirm({
      message: REMOVE_MULTIPLE_WARNING(missedTasksQuantity),
      accept: () => this._updateStorage(notMissedTasks),
      feedback: REMOVE_MULTIPLE_FEEDBACK(missedTasksQuantity),
    })
  }

  markAllAsDone(){
    const tasks = this.taskList.slice();
    tasks.forEach(task => {
      if(!this._deadline.isPassed(task.deadline)){
        task.isDone = true;
      }
    })
    this._updateStorage(tasks);
  }


  initializeStorage(): void {
    if(!this.taskList){
      this._updateStorage(MOCK_TASKS);
      this._dialog.actByConfirm({
        message: INITIAL_ALERT,
        isAlert: true,
      })
    } 
  }


}