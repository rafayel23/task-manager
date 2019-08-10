import { Injectable } from '@angular/core';
import { MatDialog, MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { ConfirmMessageComponent, TodayTasksDialogComponent } from '../dynamic-components';
import { ConfirmOptions, TodayTasksDialogActions, FilterTerms } from '../interfaces';
import { UNEXPECTED_FILTER_COMBINATION_1, UNEXPECTED_FILTER_COMBINATION_2 } from '../constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DialogService {

  constructor(
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
  ) {}

  actByConfirm(options: ConfirmOptions){
    this.dialog.open(ConfirmMessageComponent,{
      data: options,
      disableClose: true,
      panelClass: 'confirm-dialog-class'
    })
  }

  showTodayTasks(actions: TodayTasksDialogActions){
    this.dialog.open(TodayTasksDialogComponent, {
      data: actions,
      disableClose: false,
      panelClass: 'today-tasks-dialog-class',
    })
  }

  tryOpenWarningSnackbar(filterForm: FilterTerms): Observable<void> | null {

    this.snackbar._openedSnackBarRef && this.snackbar._openedSnackBarRef.dismiss();

    const {exactDate, minDate, maxDate, status} = filterForm;

    const isExactDateSet = !!exactDate;
    const isMissedSet = status === 2;
    const isInProgressSet = status === 1;

    let ref: MatSnackBarRef<SimpleSnackBar> = null;

    const openSnackbar = (message: string) => {
      ref = this.snackbar.open(message,'Fix',{
        duration: 100000,
        panelClass: ['warning-snackbar'],
      }) 
    }

    const today = new Date();
    today.setHours(0,0,0,0);

    if((isExactDateSet || minDate >= today) && isMissedSet){
      openSnackbar(UNEXPECTED_FILTER_COMBINATION_1)
    }
    else if((maxDate && maxDate < today && isInProgressSet)){
      openSnackbar(UNEXPECTED_FILTER_COMBINATION_2)
    }

    return ref && ref.onAction()
    
  }

}
