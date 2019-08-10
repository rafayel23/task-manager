import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { StorageService, DeadlineService, FilterService, DialogService } from '../../services';
import { Status, FilterTerms } from '../../interfaces';
import { debounceTime, take } from 'rxjs/operators';

@Component({
  selector: 'app-filter-tab',
  templateUrl: './filter-tab.component.html',
  styleUrls: ['./filter-tab.component.scss']
})
export class FilterTabComponent implements OnInit {

  filterForm: FormGroup;
  status = Status;
  @Output() filterChange = new EventEmitter<FilterTerms>();

  constructor(
    private fb: FormBuilder,
    private _storage: StorageService,
    public _deadline: DeadlineService,
    private _filter: FilterService,
    private _dialog: DialogService,
  ) {}

  get placeNames(): string[]{
    return this._storage.placeNames;
  }

  get addresses(): string[]{
    return this._filter.generateShorthandAdresses().concat(this._storage.addresses.concat())
  }

  get minTreshold(): Date {
    return this.filterForm.get('minDate').value;
  }

  get maxTreshold(): Date {
    return this.filterForm.get('maxDate').value;
  }

  resetDateScope(){
    this.filterForm.patchValue({maxDate: null, minDate: null});
  }

  resetExactDate(){
    this.filterForm.get('exactDate').setValue(null);
  }

  resetStatus(){
    this.filterForm.get('status').setValue(null);
  }

  resetPlace(){
    this.filterForm.get('placeName').setValue(null);
  }

  resetAdress(){
    this.filterForm.get('address').setValue(null);
  }

  resetAll(){
    this.filterForm.reset();
  }

  ngOnInit() {

    this.filterForm = this.fb.group({
      exactDate: [null],
      minDate: [null],
      maxDate: [null],
      status: [null],
      placeName: [null],
      address: [null],
    })

    this.filterForm.valueChanges.pipe(debounceTime(10)).subscribe(terms => {

      this.filterChange.emit(terms);
      const observable = this._dialog.tryOpenWarningSnackbar(terms)
      observable && observable.subscribe(_ => this.resetStatus())
      
    })
  }

}