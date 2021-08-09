import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() _show: boolean = false

}
