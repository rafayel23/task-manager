import { Directive, HostListener, ElementRef, Injector } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appTrim]'
})
export class TrimDirective {

  native: HTMLInputElement;
  constructor(
    private ref: ElementRef,
    private injector: Injector,
  ) {this.native = this.ref.nativeElement}

  @HostListener('blur') 
  trimOnBlur(){
    const valueAtBlur = this.native.value;
    const normalized = valueAtBlur.split(' ').filter(val => val).join(' ');
    const controller: NgControl = this.injector.get(NgControl);
    controller.control.setValue(normalized);
  }

}
