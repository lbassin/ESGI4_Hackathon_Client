import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class VoiceService {

  private event: Subject<any> = new Subject();
  private autoRecordOnInit = false;

  constructor() {
  }

  public getSubject() {
    return this.event.asObservable();
  }

  public startRecording() {
    this.event.next({});
  }

  startRecordingFromInit() {
    if (this.autoRecordOnInit) {
      this.event.next({});
    }
  }
}
