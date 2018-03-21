import {Component, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {MessageService} from '../message-service';
import {ChatMessageListComponent} from './list.component';
import {ApiService} from '../api.service';
import {SpeechRecognitionService} from '../speech-recognition.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [],
  encapsulation: ViewEncapsulation.None,
})
export class ChatComponent implements OnInit {

  @ViewChild('input') input;

  protected placeholderMessage: string;
  protected speechData: string;

  constructor(private messageService: MessageService,
              private apiService: ApiService,
              private speechRecognitionService: SpeechRecognitionService) {
  }

  ngOnInit() {
    this.placeholderMessage = 'Tapez votre message ici';
    this.keepSpeechAlive();
  }

  submit(event: KeyboardEvent, elem: HTMLInputElement) {
    if (event.keyCode === 13) {
      this.apiService.ask(elem.value);

      elem.value = '';
    }
  }

  protected keepSpeechAlive() {
    console.log('listening');
    this.speechRecognitionService.record()
      .subscribe(
        (value) => {
          this.speechRecognitionService.DestroySpeechObject();
          if (value === 'ok djingo') {
            const msg = new SpeechSynthesisUtterance('Que puis-je faire pour vous ?');
            window.speechSynthesis.speak(msg);
            console.log('j\'écoute');
            this.listenRequest(this.input.nativeElement);
          } else if ('merci') {
            const msg = new SpeechSynthesisUtterance('De rien ma gueule');
            window.speechSynthesis.speak(msg);
          } else {
            this.speechData = value;
            const css = 'color: red';
            console.log('%c %s', css, value);
            console.log('restarting');
            this.keepSpeechAlive();
          }
        });
  }

  protected listenRequest(input: HTMLTextAreaElement) {
    this.speechRecognitionService.record()
      .subscribe(
        (value) => {
          this.speechData = value;
          input.value = value;
          console.log(value);
          console.log('restarting after success');
          this.keepSpeechAlive();
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
