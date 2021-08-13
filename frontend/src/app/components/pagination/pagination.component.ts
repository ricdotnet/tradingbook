import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html'
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() currentPage: number = 1
  @Input() pages: number = 0
  _pages: number[] = []

  constructor() {}

  ngOnInit(): void {
    this.setPages()
  }

  ngOnChanges() {
    this.setPages()
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

  setPages() {
    //create an array of numbers from the page number
    this._pages = Array(this.pages).fill(this.pages).map((x,i)=>i+1);
  }

}
