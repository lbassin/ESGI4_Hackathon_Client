import {EventEmitter, Injectable, Sanitizer} from '@angular/core';
import { Subject } from 'rxjs/Subject';
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
    const responseObject = {
      type : 'message',
      sendBy : 'bot',
      textMessage : 'lorem ipsum dolor sit amet'
    };

   this.add(responseObject);
  }

  responseVideoCard() {
    const responseObject = {
      sendBy : 'bot',
      type : 'video-card',
      link : 'https://youtu.be/VJawYtS_MlE'
    };
    this.add(responseObject);
  }
  responseNewsCards() {
    const responseObject =  {
      sendBy : 'bot',
      type : 'news-cards',
      cards : []
    };
    responseObject.cards.push({
      name : 'Breaking Bad',
      type : 'Action',
      video : 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/1yeVJox3rjo2jBKrrihIMj7uoS9.jpg'
    });

    this.add(responseObject);
  }

  responseHelpCards() {
    const responseObject = {
      type : 'help-cards',
      sendBy : 'bot',
      cards : []
    };

    responseObject.cards.push({
      title : 'Tu veux des infos sur les prochaines sorties ?',
      desc : 'Si tu cherche des infos sur les prochaines sorties séries, demande moi ! ',
      button : 'Les prochaines sorties'
    });

    responseObject.cards.push({
      title : 'Tu cherche une séries à regarder?',
      desc : 'Si tu cherche une série à regarder , demande moi ! ',
      button : 'Les séries à regarder'
    });

    responseObject.cards.push({
      title : 'Tu cherche une séries à regarder?',
      desc : 'Si tu cherche une série à regarder , demande moi ! ',
      button : 'Les séries à regarder'
    });

    responseObject.cards.push({
      title : 'Tu cherche une séries à regarder?',
      desc : 'Si tu cherche une série à regarder , demande moi ! ',
      button : 'Les séries à regarder'
    });

    responseObject.cards.push({
      title : 'Tu cherche une séries à regarder?',
      desc : 'Si tu cherche une série à regarder , demande moi ! ',
      button : 'Les séries à regarder'
    });

    responseObject.cards.push({
      title : 'Tu cherche une séries à regarder?',
      desc : 'Si tu cherche une série à regarder , demande moi ! ',
      button : 'Les séries à regarder'
    });

    responseObject.cards.push({
      title : 'Tu cherche une séries à regarder?',
      desc : 'Si tu cherche une série à regarder , demande moi ! ',
      button : 'Les séries à regarder'
    });

    this.add(responseObject);

  }
  responseFilmCards() {
    const responseObject = {
      type : 'film-cards',
      sendBy : 'bot',
      cards : []
    };

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
    if (message.sendBy === 'user' && message.textMessage === 'news cards') {
      window.setTimeout(this.responseMessage.bind(this), 1000);
      window.setTimeout(this.responseNewsCards.bind(this), 2000);
    }
    if (message.sendBy === 'user' && message.textMessage === 'video card') {
      window.setTimeout(this.responseMessage.bind(this), 1000);
      window.setTimeout(this.responseVideoCard.bind(this), 2000);
    }
    if (message.sendBy === 'user' && (message.textMessage.search('aide') != -1)) {
      window.setTimeout(this.responseMessage.bind(this), 1000);
      window.setTimeout(this.responseHelpCards.bind(this), 2000);
    }
    this.messageList.push(message);
    this.messageUpdater.emit(message);
  }
  getMessages() {
    return this.messageList;
  }

}
