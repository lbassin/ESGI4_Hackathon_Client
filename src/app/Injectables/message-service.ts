import {EventEmitter, Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MessageService {
  private _listners = new Subject<any>();
  messageList = [];
  messageUpdater: EventEmitter<any> = new EventEmitter();
  listen(): Observable<any> {
    return this._listners.asObservable();
  }

  filter(filterBy: string) {
    this._listners.next(filterBy);
  }
  responseFilmCards() {
    let responseObject = {};
    responseObject.type = 'film-cards';
    responseObject.sendBy = 'bot';
    responseObject.cards = [];

    responseObject.cards.push({
      name : 'Breaking Bad',
      type : 'Action',
      img : 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/1yeVJox3rjo2jBKrrihIMj7uoS9.jpg'
    });

    responseObject.cards.push({
      name : 'Breaking Bad',
      type : 'Action',
      img : 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/1yeVJox3rjo2jBKrrihIMj7uoS9.jpg'
    });

    responseObject.cards.push({
      name : 'Breaking Bad',
      type : 'Action',
      img : 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/1yeVJox3rjo2jBKrrihIMj7uoS9.jpg'
    });

    responseObject.cards.push({
      name : 'Breaking Bad',
      type : 'Action',
      img : 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/1yeVJox3rjo2jBKrrihIMj7uoS9.jpg'
    });

    responseObject.cards.push({
      name : 'Breaking Bad',
      type : 'Action',
      img : 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/1yeVJox3rjo2jBKrrihIMj7uoS9.jpg'
    });

    responseObject.cards.push({
      name : 'Breaking Bad',
      type : 'Action',
      img : 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/1yeVJox3rjo2jBKrrihIMj7uoS9.jpg'
    });

    this.messageList.push(responseObject);
    this.messageUpdater.emit(responseObject);
  }

  add(message) {
    if (message.sendBy === 'user' && message.textMessage === 'film cards') {
      window.setTimeout(this.responseFilmCards.bind(this), 2000);
    }
    this.messageList.push(message);
    this.messageUpdater.emit(message);
  }
  getMessages() {
    return this.messageList;
  }

}
