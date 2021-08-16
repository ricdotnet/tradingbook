import {NgModule} from "@angular/core";

import {SpinnerIcon} from './spinner.icon'
import {UserIcon} from './user.icon'
import {LeftIcon} from './left.icon'
import {LeftDoubleIcon} from "./leftdouble.icon";
import {RightIcon} from "./right.icon";
import {RightDoubleIcon} from "./rightdouble.icon";
import {DownDoubleIcon} from "./downdouble.icon";

let exports = [
  SpinnerIcon,
  UserIcon,
  LeftIcon,
  LeftDoubleIcon,
  RightIcon,
  RightDoubleIcon,
  DownDoubleIcon
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