import {Injectable} from "@angular/core";

@Injectable()
export class Helpers {

  // TODO: make this a decorator
  // this function could also have an object instead of 2 params. would be good to practice the
  // parsing of objects in functions
  tradeStatus(type: string, entry: number, exit?: number): string {
    if(!exit || exit === 0)
      return 'open'

    if((type.toLowerCase() === 'long' && entry < exit) || (type.toLowerCase() === 'short' && entry > exit))
      return 'win'

    if(entry === exit)
      return 'draw'

    return 'loss'
  }

}