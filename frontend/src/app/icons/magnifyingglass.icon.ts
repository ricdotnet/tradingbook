import {Component, Input} from "@angular/core";

@Component({
  selector: 'magnifyingglass-icon',
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" [classList]="classes" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  `
})
export class MagnifyingglassIcon {
  @Input() classes = ''
}