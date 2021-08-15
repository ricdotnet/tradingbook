import {NgModule} from "@angular/core";

import {SpinnerIcon} from './spinner.icon'
import {UserIcon} from './user.icon'
import {LeftIcon} from './left.icon'
import {LeftDoubleIcon} from "./leftdouble.icon";
import {RightIcon} from "./right.icon";
import {RightDoubleIcon} from "./rightdouble.icon";

@NgModule({
  declarations: [
    SpinnerIcon,
    UserIcon,
    LeftIcon,
    LeftDoubleIcon,
    RightIcon,
    RightDoubleIcon
  ],
  exports: [
    SpinnerIcon,
    UserIcon,
    LeftIcon,
    LeftDoubleIcon,
    RightIcon,
    RightDoubleIcon
  ]
})
export class Icons {
}