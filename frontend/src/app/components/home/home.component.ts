import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GlobalStore} from "../../store/global.store";
import {Listeners} from "../../utils/listeners";
import {HttpEventType, HttpHeaders} from "@angular/common/http";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  file: File | undefined
  uploadSub: Subscription | undefined;
  progress: number = 0

  constructor(
    private activatedRoute: ActivatedRoute,
    private globalStore: GlobalStore,
    private http: Listeners
  ) { }

  ngOnInit(): void {
    this.globalStore.currentActiveUrl = ''
  }

  // handleFile(file: any) {
  //   this.file = file
  // }
  //
  // upload() {
  //   // const formData = new FormData()
  //   // formData.append('photo', this.file!)
  //   this.http.post({
  //     uri: 'test/upload',
  //     body: this.file,
  //     // headers: new HttpHeaders({'Content-Type': 'multipart/form-data'}),
  //     reportProgress: true,
  //     observe: 'events'
  //   }).subscribe(event => {
  //     if(event.type === HttpEventType.UploadProgress) {
  //       this.progress = Math.round(100 * (event.loaded/event.total!))
  //     }
  //   })
  // }
}
