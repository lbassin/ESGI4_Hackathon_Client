import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {MessageService} from './message-service';

@Injectable()
export class ApiService {

  private headers: { headers: HttpHeaders };
  private session: string;
  private response: string;

  private defaultUrl = 'http://127.0.0.1:3000/api/';
  private initUrl = 'http://127.0.0.1:3000/init/';

  private url = this.defaultUrl;

  constructor(private http: HttpClient,
              private router: Router,
              private messageService: MessageService) {
    this.updateHeaders();
  }

  private updateHeaders() {
    let id = this.router.routerState.snapshot.url;
    if (id[0] === '/') {
      id = id.slice(1);
    }

    console.log(id);

    this.headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': id
      })
    };
  }

  ask(question: string) {
    const data = {
      question: question,
      session: this.session,
    };

    this.messageService.showQuestion(question);
    console.log(this.headers);
    this.http.post(this.url, data, this.headers).toPromise()
      .then((response: { type: string, data: any, session?: string }) => {
        this.response = JSON.stringify(response);
        this.session = response.session;

        this.displayResponse(response);
      });
  }

  private displayResponse(response: { type: string, data: any, session?: string }) {
    switch (response.type) {
      case 'text':
        this.showText(response.data);
        break;
      case 'card':
        this.showCard(response.data);
        break;
      case 'video':
        this.showVideo(response.data);
        break;
      case 'init':
        this.showInit(response);
        break;
      case 'init_done':
        this.doneInit(response);
        break;
    }

    window.speechSynthesis.speak(new SpeechSynthesisUtterance(response.data.vocal));
  }

  private showText(data) {
    this.messageService.showResponse(data.message);
  }

  private showCard(data) {
    this.messageService.showResponse(data.message);
    this.messageService.showCards(data.cards);
  }

  private showVideo(data) {
    this.messageService.showResponse(data.message);
    this.messageService.showVideo(data.video);
  }

  private showInit(data) {
    if (data.session === 'genre') {
      this.router.navigate([data.data.pseudo]);
      setTimeout(() => {
        this.messageService.showResponse(data.data.message);
        this.updateHeaders();
      }, 750);
    }
  }

  private doneInit(data) {
    this.setUrlToDefault();
    setTimeout(() => {
      this.messageService.showResponse(data.data.message);
    }, 750);
  }

  setUrlToInit() {
    this.url = this.initUrl;
  }

  setUrlToDefault() {
    this.url = this.defaultUrl;
  }
}
