import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {MessageService} from './message-service';
import {VoiceService} from './voice.service';

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
              private messageService: MessageService,
              private voiceService: VoiceService) {
    this.updateHeaders();
  }

  private updateHeaders() {
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
    this.http.post(this.url, data, this.headers).toPromise()
      .then((response: { type: string, data: any, session?: string }) => {
        this.response = JSON.stringify(response);
        this.session = response.session;

        this.displayResponse(response);
      })
      .catch((response) => {
        setTimeout(() => {
          this.messageService.showResponse('Je suis désolé... Je n\'arrive pas à joindre mes informateurs');
        }, 750);
      });
  }

  private displayResponse(response: { type: string, data: any, session?: string }) {
    let restartRecord = false;

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
      case 'init_erreur':
        this.showInitErreur(response);
        break;
      case 'init_done':
        this.doneInit(response);
        break;
      case 'help':
        this.showHelp(response.data);
        break;
    }

    if (response.restartRecord) {
      restartRecord = true;
    }

    const text = new SpeechSynthesisUtterance(response.data.vocal);
    if (restartRecord) {
      text.onend = this.voiceService.startRecording.bind(this.voiceService);
    }

    window.speechSynthesis.speak(text);
  }

  private showText(data) {
    this.messageService.showResponse(data.message);
  }

  private showCard(data) {
    this.messageService.showResponse(data.message);
    this.messageService.showCards(data.cards);
  }

  private showHelp(data) {
    this.messageService.showResponse(data.message);
    this.messageService.showHelps(data.helps);
  }

  private showVideo(data) {
    this.messageService.showResponse(data.message);
    this.messageService.showVideo(data.video);
  }

  private showInit(data) {
    if (data.session === 'genre') {
      this.router.navigate([data.data.pseudo.toLowerCase()]);
      setTimeout(() => {
        this.messageService.showResponse(data.data.message);
        this.updateHeaders();
      }, 750);
    }
  }

  private showInitErreur(data) {
    setTimeout(() => {
      const erreurSentence = new SpeechSynthesisUtterance(
        'J\'ai peur de ne pas avoir compris votre réponse.' +
        'Veuillez répetey votre choix parmi les options valables');
      erreurSentence.onend = this.voiceService.startRecordingFromInit.bind(this.voiceService);

      window.speechSynthesis.speak(erreurSentence);

      this.messageService.showResponse('J\'ai peur de ne pas avoir bien compris');
      this.messageService.showResponse('Veuillez répondre par une des propositions suivantes');

      let options = '';
      for (const index in data.data.options) {
        if (!data.data.options.hasOwnProperty(index)) {
          continue;
        }

        options += data.data.options[index] + ' / ';
      }
      options = options.slice(0, options.length - 2);

      this.messageService.showResponse(options);
    });
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
