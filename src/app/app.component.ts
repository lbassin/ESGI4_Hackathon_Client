import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ComponentService } from './component.service';
import { API_URL } from './app.vars';
import { TextComponent } from './response/text/text.component';
import { ResponseComponent } from './response/response.component';
import { CardComponent } from './response/card/card.component';
import { SpeechRecognitionService } from './speech-recognition.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  headers: { headers: HttpHeaders };
  protected response: any;
  protected speechData: string;

  @ViewChild('displayArea', { read: ViewContainerRef }) container;
  @ViewChild('button') buttonListen;
  @ViewChild('send') buttonSend;
  @ViewChild('input') input;

  protected requestSent = false;

  constructor(private http: HttpClient, private service: ComponentService, private speechRecognitionService: SpeechRecognitionService) {
  }

  public ngOnInit(): void {
    this.headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': '1'
      })
    };

    this.keepSpeechAlive();
  }

  protected keepSpeechAlive() {
    console.log("listening");
    this.speechRecognitionService.record()
      .subscribe(
      (value) => {
        this.speechRecognitionService.DestroySpeechObject();
        if (value === "ok djingo") {
          let msg = new SpeechSynthesisUtterance('Que puis-je faire pour vous ?');
          window.speechSynthesis.speak(msg);
          console.log("j'écoute");
          this.listenRequest(this.input.nativeElement, this.buttonListen.nativeElement, this.buttonSend.nativeElement);
        } else if ("merci") {
          let msg = new SpeechSynthesisUtterance('De rien ma gueule');
          window.speechSynthesis.speak(msg);
        } else {
          this.speechData = value;
          let css = "color: red";
          console.log("%c %s", css, value);
          console.log("restarting");
          this.keepSpeechAlive();
        }
      });
  }

  protected sendRequest(input: HTMLTextAreaElement, buttonSend: HTMLButtonElement) {
    const data = { question: input.value };
    this.requestSent = true;

    this.http.post(API_URL, data, this.headers).toPromise()
      .then((response: { type: string, data: any }) => {
        this.response = JSON.stringify(response);
        this.addResponse(response);
        this.requestSent = false;
        buttonSend.style.backgroundColor = "#FFF";
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

    let msg = new SpeechSynthesisUtterance(response.data.message);
    window.speechSynthesis.speak(msg);
    this.service.addDynamicComponent(this.container, component, response.data);
  }

  // WARNING EARLY BETA SPEECH TO TEXT
  protected listenRequest(input: HTMLTextAreaElement, button: HTMLButtonElement, buttonSend: HTMLButtonElement) {
    button.style.backgroundColor = "#FF0000";
    this.speechRecognitionService.record()
      .subscribe(
      //listener
      (value) => {
        this.speechData = value;
        input.value = value;
        console.log(value);
        buttonSend.style.backgroundColor = "#FF0000";
        this.sendRequest(input, buttonSend);
        button.style.backgroundColor = "#FFF";
        console.log("restarting after success");
        this.keepSpeechAlive();
      },
      //errror
      (err) => {
        console.log(err);
        if (err.error == "no-speech") {
          console.log("--restatring service--");
        }
      },
      //completion
      () => {
        console.log("--complete--");
      });
  }
}
