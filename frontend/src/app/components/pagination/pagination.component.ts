import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html'
})
export class PaginationComponent implements OnInit {

  @Input() currentPage: number = 0
  @Input() pages: number = 0
  _pages: number[] = []

  constructor() {}

  ngOnInit(): void {
    //create an array of numbers from the page number
    this._pages = Array(this.pages).fill(0).map((x,i)=>i+1);
  }

  @Output() navigateTo = new EventEmitter<string>();

  previous() {
    this.navigateTo.emit('decrease')
  }

  next() {
    this.navigateTo.emit('increase')
  }

  custom(page: number) {
    this.navigateTo.emit(page.toString())
  }

}
