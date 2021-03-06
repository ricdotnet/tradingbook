import {Component, Input} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {ToastService} from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  animations: [
    trigger('openToast', [
      transition(':enter', [
        style({opacity: 0}),
        animate('300ms', style({opacity: 1})),
      ]),
      transition(':leave', [
        animate('300ms', style({opacity: 0}))
      ])
    ])
  ]
})
export class ToastComponent {

  constructor(
    public toastService: ToastService
  ) {
  }

  private _message: string = ''
  private _show: boolean = false
  private _type: string = ''

  tempShow = false

  typeError = 'bg-red-400 border-red-500'
  typeSuccess = 'bg-green-400 border-green-500'

  @Input()
  get type(): string {
    return this._type
  }

  set type(type: string) {
    this._type = type
  }

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