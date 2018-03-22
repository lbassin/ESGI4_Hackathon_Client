import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class DetailsService {

  private event: Subject<any> = new Subject();

  constructor() {
  }

  public getEvent() {
    return this.event.asObservable();
  }

  public show(object: any) {
    this.event.next(object);
  }

}
