import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmOptions } from '../../interfaces';
import { DELETE_WARNING, EDITING_WARNING, REMOVE_MULTIPLE_WARNING } from '../../constants'


@Component({
  selector: 'app-confirm-message',
  templateUrl: './confirm-message.component.html',
  styleUrls: ['./confirm-message.component.scss','../dialog-main.scss']
})

export class ConfirmMessageComponent {

  options: ConfirmOptions;
  
  constructor(@Inject(MAT_DIALOG_DATA) options){
    this.options = options;
  }

}
