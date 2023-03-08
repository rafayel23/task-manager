import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { StorageService, DeadlineService } from '../../services';
import { Task } from '../../interfaces';


@Component({
  selector: 'app-add-task-panel',
  templateUrl: './add-task-panel.component.html',
  styleUrls: ['./add-task-panel.component.scss'],
})

export class AddTaskPanelComponent {

  taskForm: FormGroup;
  editingId: string = null;

  constructor(
    private _storage: StorageService,
    private fb: FormBuilder,
    public _deadline: DeadlineService,
  ){}

  addTask(){
    this._storage.addTask(this.taskForm.value as Task);
    this.taskForm.reset();
  }

  cancelEditing(){
    this._storage._editor.next(null);
  }

  editTask(){
    this._storage.editTask(this.editingId,this.taskForm.value);
  }
 

  

  /*--- Getters ---*/

  get requiredDeadline(): boolean{
    return this.taskForm.get('deadline').hasError('required');
  }
  get invalidDeadline(): boolean{
    return this.taskForm.get('deadline').hasError('matDatepickerMin');
  }
  get invalidDateFormat(): boolean{
    return this.taskForm.get('deadline').hasError('matDatepickerParse');
  }


  ngOnInit(){

    this.taskForm = this.fb.group({
      title: ['',Validators.required],
      description: ['',Validators.required],
      deadline: ['',Validators.required],
      placeName: ['',Validators.required],
      address: ['',Validators.required],
      isDone: [false],
    })

    
    this._storage._editor.subscribe(id => {
      if(!id){
        this.taskForm.reset();
      }else{
        this.taskForm.patchValue(this._storage.taskList.find(task => task.id === id));
      }
      this.editingId = id;
    })

  }

  

}
