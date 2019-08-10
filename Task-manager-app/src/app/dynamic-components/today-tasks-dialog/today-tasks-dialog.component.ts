import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { TodayTasksDialogActions, Task } from '../../interfaces';

@Component({
  selector: 'app-today-tasks-dialog',
  templateUrl: './today-tasks-dialog.component.html',
  styleUrls: ['./today-tasks-dialog.component.scss','../dialog-main.scss']
})
export class TodayTasksDialogComponent {

  actions: TodayTasksDialogActions;

  constructor(@Inject (MAT_DIALOG_DATA) actions,){
    this.actions = actions;
  }

}
