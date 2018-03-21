import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class MessageService {
  messageList = [];
  messageUpdater: EventEmitter<any> = new EventEmitter();

  add(message) {
    this.messageList.push(message);
    this.messageUpdater.emit(message);
  }

  getMessages() {
    return this.messageList;
  }

}
