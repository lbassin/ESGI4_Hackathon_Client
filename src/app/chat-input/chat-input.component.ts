import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {MessageService} from '../Injectables/message-service';
import {ChatMessageListComponent} from '../chat-message-list/chat-message-list.component';
@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss'],
  providers: [],
  encapsulation: ViewEncapsulation.None,
})
export class ChatComponent implements OnInit {

  placeholderMessage: string;
  chatMessageList: ChatMessageListComponent;
  constructor(private _messageService: MessageService) {
    this._messageService = _messageService;
  }

  ngOnInit() {
    this.placeholderMessage = 'Tapez votre message ici';
  }

  checkKey(event: KeyboardEvent, elem: HTMLInputElement) {
    if (event.keyCode === 13) {
      this._messageService.add({textMessage: elem.value , sendBy : 'user'});
      elem.value = '';
    }
  }
}
