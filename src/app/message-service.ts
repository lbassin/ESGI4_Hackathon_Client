import {EventEmitter, Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable()
export class MessageService {
  private _listners = new Subject<any>();
  messageList = [];
  messageUpdater: EventEmitter<any> = new EventEmitter();

  constructor(private sanitizer: DomSanitizer) {
  }

  showQuestion(text) {
    const message = {sendBy: 'user', type: 'message', textMessage: text};
    this.update(message);
  }

  showResponse(text) {
    const message = {sendBy: 'bot', type: 'message', textMessage: text};
    this.update(message);
  }

  showCards(cards) {
    const message = {sendBy: 'bot', type: 'film-cards', cards: cards};
    this.update(message);
  }

  showVideo(video) {
    const message = {sendBy: 'bot', type: 'video-card', video: video};
    message.video.media = this.getSafeUrl(message.video.media);

    this.update(message);
  }

  private update(message) {
    this.messageList.push(message);
    this.messageUpdater.emit(message);
  }

  getMessages() {
    return this.messageList;
  }

  getSafeUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
