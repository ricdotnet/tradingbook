import {Component, Input} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  animations: [
    trigger('openToast', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class ToastComponent{

  constructor(
    public toastService: ToastService
  ) {}

  private _message: string = ''
  private _show: boolean = false

  @Input()
  get message(): string {
    return this._message
  }
  set message(message: string) {
    this._message = message
  }

  @Input()
  get show(): boolean {
    return this._show
  }
  set show(show: boolean) {
    this._show = show
  }

  close() {
    this.toastService.clearToast()
  }
}