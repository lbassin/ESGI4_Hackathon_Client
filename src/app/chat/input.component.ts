import {Component, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {MessageService} from '../message-service';
import {ChatMessageListComponent} from './list.component';
import {ApiService} from '../api.service';
import {SpeechRecognitionService} from '../speech-recognition.service';
import {VoiceService} from '../voice.service';

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
              private speechRecognitionService: SpeechRecognitionService,
              private voiceService: VoiceService) {
  }

  ngOnInit() {
    this.placeholderMessage = 'Tapez votre message ici';
    this.keepSpeechAlive();

    this.voiceService.getSubject().subscribe(() => {
      this.listenRequest(this.input.nativeElement);
    });

    window.addEventListener('keypress', (event) => {
      if (event.keyCode === 41) {
        this.vocalActivation(); // TODO REMOVE DEBUG
      }
    });
  }

  submit(event: any, elem: HTMLInputElement) {
    if (event.keyCode === 13) {
      if (elem.value.trim().length <= 0) {
        return;
      }

      this.apiService.ask(elem.value);
      setTimeout(() => this.keepSpeechAlive(), 1250);

      elem.value = '';
    }
  }

  protected keepSpeechAlive() {
    this.speechRecognitionService.record().subscribe((value) => {
      this.speechRecognitionService.DestroySpeechObject();
      if (value === 'ok Google') {
        this.vocalActivation();
      } else {
        this.keepSpeechAlive();
      }
    });
  }

  private vocalActivation() {
    const msg = new SpeechSynthesisUtterance(this.getActivationSentence());
    window.speechSynthesis.speak(msg);

    setTimeout(() => {
      this.listenRequest(this.input.nativeElement);
    }, 1750);
  }

  protected listenRequest(input: HTMLTextAreaElement) {
    console.log('RECORD');
    this.speechRecognitionService.record().subscribe((value) => {
        this.speechData = value;
        input.value = value[0].toUpperCase() + value.slice(1);
        input.focus();
        this.submit({keyCode: 13}, this.input.nativeElement);
        this.keepSpeechAlive();
      },
      (err) => {
      });
  }

  private getActivationSentence() {
    const index = parseInt((Math.random() * 4).toString(), 10);
    const sentences = [
      'Que puis-je faire pour vous ?',
      'Oui ?',
      'Que désirez vous ?',
      'Comment puis je vous aider ?'
    ];

    return sentences[index];
  }
}
