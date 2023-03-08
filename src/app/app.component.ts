import { Component } from '@angular/core';
import { StorageService } from './services';

@Component({
  selector: 'app-root',
  template: '<app-root-page></app-root-page>',
})

export class AppComponent {
  constructor(private _storage: StorageService){
    this._storage.initializeStorage();
  }
}