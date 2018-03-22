import { Component, OnInit } from '@angular/core';
import { MessageService } from './message-service';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { VoiceService } from './voice.service';

@Component({
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.scss']
})
export class BotComponent implements OnInit {

  private isKnownUser = false;

  constructor(private messageService: MessageService,
    private apiService: ApiService,
    private router: Router,
    private voiceService: VoiceService) {
  }

  ngOnInit(): void {
    const id = this.router.routerState.snapshot.url;
    this.isKnownUser = id.length > 0 && id !== '/';

    if (!this.isKnownUser) {
      setTimeout(() => {
        this.startSetup();
      }, 2500);
    }
  }

  private startSetup() {
    this.apiService.setUrlToInit();
    this.messageService.showResponse('Bonjour et bienvenue sur Djingo ! :)');
    window.speechSynthesis.speak(
      new SpeechSynthesisUtterance('Bonjour !. Bienvenue sur Djinngo !. Avant de commencer, nous avons quelques question à vous poser.')
    );

    this.messageService.showResponse('Avant de pouvoir utiliser nos services, nous avons besoin de quelques informations à votre sujet');

    const firstnameSentence = new SpeechSynthesisUtterance('Quel est votre prénom ?');
    firstnameSentence.onend = this.voiceService.startRecordingFromInit.bind(this.voiceService);
    window.speechSynthesis.speak(firstnameSentence);

    setTimeout(() => {
      this.messageService.showResponse('Quel est votre prénom ?');
    }, 1000);

  }

}
