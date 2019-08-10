/*--- Modules ---*/
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/*--- Components ---*/
import { AppComponent } from './app.component';

import { ConfirmMessageComponent, TodayTasksDialogComponent } from './dynamic-components';

import {
  RootPageComponent,
  AddTaskPanelComponent,
  FilterTabComponent,
  TaskDashboardComponent,
  SearchBoxComponent,
} from './components'


/*--- Directives ---*/
import { TrimDirective, FeedbackDirective } from './directives';


/*--- Pipes ---*/
import { NearestDaysPipe, StatusPipe } from './pipes';


/*--- Material Design Modules ---*/
import { 
  MatDatepickerModule, 
  MatNativeDateModule, 
  MatFormFieldModule, 
  MatInputModule, 
  MatButtonModule, 
  MatIconModule, 
  MatTooltipModule, 
  MatTableModule, 
  MatMenuModule, 
  MatDialogModule, 
  MatExpansionModule, 
  MatSelectModule, 
  MatCheckboxModule, 
  MatRadioModule, 
  MatSidenavModule, 
  MatListModule,
  MatDividerModule,
  MatProgressSpinnerModule,
  MatBadgeModule, 
  MatPaginatorModule, 
  MatSortModule, 
  MatSlideToggleModule,
  MatSnackBarModule,
} 
from '@angular/material';



@NgModule({

  declarations: [

    AppComponent,
    RootPageComponent,
    AddTaskPanelComponent,
    FilterTabComponent,
    TaskDashboardComponent,
    SearchBoxComponent,

    ConfirmMessageComponent,
    TodayTasksDialogComponent,

    TrimDirective,
    FeedbackDirective,

    NearestDaysPipe,
    StatusPipe,

  ],

  imports: [

    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,

    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatTableModule,
    MatMenuModule,
    MatDialogModule,
    MatExpansionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatPaginatorModule,
    MatSortModule,
    MatListModule,
    MatSlideToggleModule,
    MatSnackBarModule,
  ],

  entryComponents: [
    ConfirmMessageComponent,
    TodayTasksDialogComponent,
  ],

  bootstrap: [AppComponent],

})

export class AppModule {}