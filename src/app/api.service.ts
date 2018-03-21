import {Injectable} from '@angular/core';
import {API_URL} from './app.vars';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {MessageService} from './message-service';

@Injectable()
export class ApiService {

  private headers: { headers: HttpHeaders };
  private session: string;
  private response: string;

  constructor(private http: HttpClient,
              private router: Router,
              private messageService: MessageService) {
    let id = this.router.routerState.snapshot.url;
    if (id[0] === '/') {
      id = id.slice(1);
    }

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
    this.http.post(API_URL, data, this.headers).toPromise()
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

}
