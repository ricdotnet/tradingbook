import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
})
export class UploadComponent implements OnInit {

  constructor() {
  }

  @Input() label = ''

  @Output() upload = new EventEmitter();

  ngOnInit(): void {
  }

  handleFile(event: any) {
    this.upload.emit(event.target?.files[0])
  }

}