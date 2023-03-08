import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Directive({
  selector: '[appFeedback]'
})
export class FeedbackDirective {

  @Input('appFeedback') message: string = 'Success';
  @Input() duration: number = 2500;

  native: HTMLFormElement;
  constructor(
    private snackbar: MatSnackBar,
    private ref: ElementRef,
  ) {this.native = this.ref.nativeElement};

  @HostListener('click')
  showFeedback(){
    this.snackbar.open(this.message,'',{
      duration: this.duration,
    })
  }

}
