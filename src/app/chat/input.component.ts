import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {MessageService} from '../message-service';
import {ChatMessageListComponent} from './list.component';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [],
  encapsulation: ViewEncapsulation.None,
})
export class ChatComponent implements OnInit {

  protected placeholderMessage: string;

  constructor(private messageService: MessageService, private apiService: ApiService) {
  }

  ngOnInit() {
    this.placeholderMessage = 'Tapez votre message ici';
  }

  submit(event: KeyboardEvent, elem: HTMLInputElement) {
    if (event.keyCode === 13) {
      this.messageService.add({textMessage: elem.value, sendBy: 'user'});
      this.apiService.ask(elem.value);

      elem.value = '';
    }
  }
}
