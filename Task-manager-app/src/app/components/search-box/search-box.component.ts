import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  /* --- */
  searchTerm: FormControl = new FormControl(null);
  isSearching: boolean = false;
  isFocused: boolean = false;
  @Output() searchTermChange = new EventEmitter<string>();

  prevent(e: MouseEvent){
    e.preventDefault(); 
  }

  ngOnInit() {
    this.searchTerm.valueChanges.pipe(
      tap(term => term && (this.isSearching = true)),
      debounceTime(500),
      tap(() => this.isSearching = false),
      map(term => term && term.toLowerCase())
    ).subscribe(term => this.searchTermChange.emit(term))
  }

}
