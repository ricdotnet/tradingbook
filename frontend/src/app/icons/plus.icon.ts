import {Component, Input} from "@angular/core";

@Component({
  selector: 'plus-icon',
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" [classList]="classes" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  `
})
export class PlusIcon {
  @Input() classes = ''
}