import {NgModule} from "@angular/core";

import {SpinnerIcon} from './spinner.icon'
import {UserIcon} from './user.icon'
import {LeftIcon} from './left.icon'
import {LeftDoubleIcon} from "./leftdouble.icon";
import {RightIcon} from "./right.icon";
import {RightDoubleIcon} from "./rightdouble.icon";
import {DownDoubleIcon} from "./downdouble.icon";
import {UpDoubleIcon} from "./updouble.icon";
import {CameraIcon} from './camera.icon'
import {MagnifyingglassIcon} from "./magnifyingglass.icon";
import {PlusIcon} from "./plus.icon";

let exports = [
  SpinnerIcon,
  UserIcon,
  LeftIcon,
  LeftDoubleIcon,
  RightIcon,
  RightDoubleIcon,
  DownDoubleIcon,
  UpDoubleIcon,
  CameraIcon,
  PlusIcon,
  MagnifyingglassIcon
]

@NgModule({
  declarations: [
    ...exports
  ],
  exports: [
    ...exports
  ]
})
export class Icons {
}