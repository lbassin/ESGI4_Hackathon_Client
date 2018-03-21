import {Component, OnInit} from '@angular/core';
import {MessageService} from './message-service';
import {ApiService} from './api.service';

@Component({
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.scss']
})
export class BotComponent implements OnInit {

  private isKnownUser = false;

  constructor(private messageService: MessageService, private apiService: ApiService) {
  }

  ngOnInit(): void {
    if (!this.isKnownUser) {
      setTimeout(() => {
        this.startSetup();
      }, 2500);
    }
  }

  private startSetup() {
    this.apiService.setUrlToInit();
    this.messageService.showResponse('Bonjour et bienvenue sur Djingo ! :)');
    this.messageService.showResponse('Avant de pouvoir utiliser nos services, nous avons besoin de quelques informations à votre sujet');

    setTimeout(() => {
      this.messageService.showResponse('Quel est votre prénom ?');
    }, 1000);

  }

}
