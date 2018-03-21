import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ComponentService} from './component.service';
import {API_URL} from './app.vars';
import {TextComponent} from './response/text/text.component';
import {ResponseComponent} from './response/response.component';
import {CardComponent} from './response/card/card.component';
import {SpeechRecognitionService} from './speech-recognition.service';
import {Router} from '@angular/router';

@Component({
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.scss']
})
export class BotComponent implements OnInit {

  headers: { headers: HttpHeaders };
  protected response: any;
  protected session: string;
  protected requestSent = false;
  protected speechData: string;

  @ViewChild('displayArea', {read: ViewContainerRef}) container;

  constructor(private http: HttpClient,
              private service: ComponentService,
              private speechRecognitionService: SpeechRecognitionService,
              private router: Router) {
  }

  public ngOnInit(): void {
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

  protected sendRequest(input: HTMLTextAreaElement, buttonSend: HTMLButtonElement) {
    this.requestSent = true;
    const data = {
      question: input.value,
      session: this.session,
    };

    this.http.post(API_URL, data, this.headers).toPromise()
      .then((response: { type: string, data: any, session?: string }) => {
        this.response = JSON.stringify(response);
        this.addResponse(response);
        this.requestSent = false;
        this.session = response.session;
        buttonSend.style.backgroundColor = '#FFF';
      });
  }

  protected addResponse(response: { type: string, data: any }): void {
    let component = ResponseComponent;

    switch (response.type) {
      case 'text':
        component = TextComponent;
        break;
      case 'card':
        component = CardComponent;
        break;
    }

    this.service.addDynamicComponent(this.container, component, response.data);
  }

  protected listenRequest(input: HTMLTextAreaElement, button: HTMLButtonElement, buttonSend: HTMLButtonElement) {
    button.style.backgroundColor = '#FF0000';
    this.speechRecognitionService.record()
      .subscribe(
        (value) => {
          this.speechData = value;
          input.value = value;
          console.log(value);
          buttonSend.style.backgroundColor = '#FF0000';
          this.sendRequest(input, buttonSend);
          button.style.backgroundColor = '#FFF';
        },
        (err) => {
          console.log(err);
          if (err.error === 'no-speech') {
            console.log('--restatring service--');
          }
        },
        () => {
          console.log('--complete--');
        });
  }
}
