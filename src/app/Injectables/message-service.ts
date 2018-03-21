import {EventEmitter, Injectable, Sanitizer} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import * as url from 'url';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable()
export class MessageService {
  private _listners = new Subject<any>();
  messageList = [];
  messageUpdater: EventEmitter<any> = new EventEmitter();

  constructor(protected sanitizer: DomSanitizer){
    this.sanitizer = sanitizer;
  }
  responseMessage() {
    const responseObject = {};
    responseObject.type = 'message';
    responseObject.sendBy = 'bot';
    responseObject.textMessage = 'lorem ipsum dolor sit amet';

   this.add(responseObject);
  }

  responseVideoCard() {
    const responseObject = {};
    responseObject.sendBy = 'bot';
    responseObject.type = 'video-card';
    responseObject.link = 'https://youtu.be/VJawYtS_MlE';
    this.add(responseObject);
  }
  responseMoviesCards() {
    const responseObject =  {};
    responseObject.sendBy = 'bot';
    responseObject.type = 'movie-cards';
    responseObject.cards = [];
    responseObject.cards.push({
      name : 'Breaking Bad',
      type : 'Action',
      video : 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/1yeVJox3rjo2jBKrrihIMj7uoS9.jpg'
    });

    this.add(responseObject);
  }

  responseFilmCards() {
    const responseObject = {};
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

    this.add(responseObject);

  }

  add(message) {
    if (message.sendBy === 'user' && message.textMessage === 'film cards') {
      window.setTimeout(this.responseMessage.bind(this), 1000);
      window.setTimeout(this.responseFilmCards.bind(this), 2000);
    }

    if (message.sendBy === 'user' && message.textMessage === 'movie cards') {
      window.setTimeout(this.responseMessage.bind(this), 1000);
      window.setTimeout(this.responseMoviesCards.bind(this), 2000);
    }
    if (message.sendBy === 'user' && message.textMessage === 'video card') {
      window.setTimeout(this.responseMessage.bind(this), 1000);
      window.setTimeout(this.responseVideoCard.bind(this), 2000);
    }
    this.messageList.push(message);
    this.messageUpdater.emit(message);
  }
  getMessages() {
    return this.messageList;
  }

}
