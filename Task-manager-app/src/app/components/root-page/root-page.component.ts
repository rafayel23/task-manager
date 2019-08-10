import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { FilterService, DeadlineService, StorageService, DialogService } from '../../services';
import { Task, FilterTerms } from '../../interfaces';
import { TaskDashboardComponent } from '../task-dashboard/task-dashboard.component';


@Component({
  selector: 'app-root-page',
  templateUrl: './root-page.component.html',
  styleUrls: ['./root-page.component.scss']
})

export class RootPageComponent implements AfterViewInit {
  
  filterTerms: FilterTerms;
  searchTerm: string;
  taskList: Task[];
  childPaginatorReset: Function;
  applyFilters: boolean = true;

  constructor(
    private _filter: FilterService,
    public _deadline: DeadlineService,
    private _storage: StorageService,
    private _dialog: DialogService,
  ) {
    this.updateTasks(false);
    this._storage._updateListener.subscribe(_ => this.updateTasks(true));
  }


  updateTasks(fromStorage: boolean): void {
    if(this.applyFilters){
      this.taskList = this._filter.globalFilter(this.filterTerms, this.searchTerm);
    }else{
      this.taskList = this._storage.taskList;
    }
    this.childPaginatorReset && !fromStorage && this.childPaginatorReset();
  }
  
  get todayTasksTooltip(): string[] | string {
    let todayTasksTitles = this._deadline.getTodayTasks().map(task => task.title);
    const quantity = todayTasksTitles.length;
    if(quantity > 10){
      const excess = quantity - 10;
      todayTasksTitles = todayTasksTitles.slice(0,10);
      todayTasksTitles.push('____________',`and ${excess} more`)
    }

    return quantity ? todayTasksTitles.join('\n') : 'No Tasks for Today';
  }

  showTodayTasks(){
    this._dialog.showTodayTasks({
      todayTasks: this._deadline.getTodayTasks.bind(this._deadline),
      remove: this._storage.removeTask.bind(this._storage),
      markAsDone: this._storage.toggleStatus.bind(this._storage),
    });
  }

  filterChangeHandler(terms: FilterTerms){
    this.filterTerms = terms;
    this.applyFilters = true;
    this.updateTasks(false);
  }

  @ViewChild(TaskDashboardComponent, {static: false}) dashboard: TaskDashboardComponent
  ngAfterViewInit(){
    this.childPaginatorReset = () => this.dashboard.resetPaginator();
  }

}