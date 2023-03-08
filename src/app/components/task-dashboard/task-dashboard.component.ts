import { AfterViewInit, Component, OnInit, ViewChild, Input, SimpleChanges, OnChanges } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { TaskDashboardDataSource } from './task-dashboard-datasource';
import { Task } from '../../interfaces';
import { TASK_COLUMNS, MISSED_TASK_EDITING_ALERT } from '../../constants';
import { StorageService, DeadlineService, DialogService } from '../../services';

@Component({
  selector: 'app-task-dashboard',
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.scss']
})

export class TaskDashboardComponent implements OnChanges, OnInit, AfterViewInit {

  /* --- initializations --- */

  dataSource: TaskDashboardDataSource;
  displayedColumns: string[];
  editingId: string = null;

  @Input() contentRef: HTMLElement;
  @Input() taskList: Task[] = [];
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<Task>;


  /* --- constructor --- */

  constructor(
    private _storage: StorageService,
    private _dialog: DialogService,
    public _deadline: DeadlineService,
  ){this.displayedColumns = TASK_COLUMNS}


  /* --- methods --- */

  get isEmpty(): boolean {
    return this.dataSource.data.length === 0;
  }

  trackById(_,task): string {
    return task.id;
  }

  taskStyles(task: Task): object{
    return {
      'done-task': task.isDone,
      'today-task': this._deadline.isToday(task.deadline) && !task.isDone,
      'passed-task': this._deadline.isPassed(task.deadline) && !task.isDone,
      'editing-task': this.editingId === task.id,
    }
  }

  removeTask(id: string): void {
    this._storage.removeTask(id);
  }

  removeAllTasks(): void {
    this._storage.removeAllTasks();
  }

  removeMissedTasks(): void {
    this._storage.removeMissedTasks();
  }

  markAllAsDone(): void {
    this._storage.markAllAsDone();
  }

  toggleStatus(id: string): void {
    this._storage.toggleStatus(id);
  }

  prepareToEditing(task: Task): void {

    const content: HTMLElement = document.getElementById('visible-content');
    this._storage._editor.next(task.id);

    if(this._deadline.isPassed(task.deadline)){
      content.scrollTo(0,0)
      this._dialog.actByConfirm({
        message: MISSED_TASK_EDITING_ALERT,
        isAlert: true,
      })
    }else{
      content.scrollTo({top: 0,behavior: 'smooth'});
    }
  }

  resetPaginator(){
    this.dataSource.paginator.pageIndex = 0;
    this.dataSource._updateListener.next();
  }
  
  /* --- LC hooks --- */

  ngOnChanges(changes: SimpleChanges){

    const currentTasks = changes.taskList.currentValue;
    const isInitial = changes.taskList.firstChange;
    
    if(!isInitial){
      this.dataSource.data = currentTasks;
      this.dataSource._updateListener.next();
    }

  }

  ngOnInit() {
    this.dataSource = new TaskDashboardDataSource(this.taskList);
    this._storage._editor.subscribe(id => {
      this.editingId = id;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  };

}