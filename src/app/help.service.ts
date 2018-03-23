import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class HelpService {

  private event: Subject<any> = new Subject();

  public displayHelp() {
    this.event.next({});
  }

  public getObservable() {
    return this.event.asObservable();
  }
}
