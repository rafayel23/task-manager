import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge, Subject } from 'rxjs';
import { Task } from '../../interfaces';

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

export class TaskDashboardDataSource extends DataSource<Task> {

  data: Task[]
  paginator: MatPaginator;
  sort: MatSort;
  _updateListener = new Subject<void>();

  constructor(data: Task[]) {
    super();
    this.data = data;
  }

  
  connect(): Observable<Task[]> {

    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange,
      this._updateListener,
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  disconnect() {}

  private getPagedData(data: Task[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(data: Task[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((t1, t2) => {
      const isAsc = this.sort.direction === 'asc';
      const targetType = this.sort.active;
      switch (targetType) {

        case 'title': 
        case 'description':
        case 'placeName':
        case 'address':
          return compare(t1[targetType], t2[targetType], isAsc);

        case 'deadline': 
          return compare(new Date(t1[targetType]), new Date(t2[targetType]), isAsc);

        default: return 0;

      }
    });
  }
}