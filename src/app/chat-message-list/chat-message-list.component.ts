import {animate, Component, OnInit, OnChanges, style, transition, trigger, SimpleChanges, ElementRef, AfterViewInit} from '@angular/core';
import {MessageService} from '../Injectables/message-service';
declare var UIkit: any;

@Component({
  selector: 'app-chat-message-list',
  templateUrl: './chat-message-list.component.html',
  styleUrls: ['./chat-message-list.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0'}),
        animate('.5s ease-out', style({ opacity: '1' })),
      ]),
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({transform: 'TranslateY(100%)'}),
        animate('.5s ease-out', style({transform: 'TranslateY(0)'})),
      ]),
    ]),
    trigger('leftIn', [
      transition(':enter', [
        style({transform: 'TranslateX(100%)'}),
        animate('.5s ease-out', style({transform: 'TranslateX(100%)'})),
      ]),
    ]),
  ],
  providers: [],
})
export class ChatMessageListComponent implements OnInit{
  messages: Array<Object>;
  constructor(private _messageService: MessageService, private elementRef: ElementRef) {
    this._messageService = _messageService;
    this.messages = [];
    console.log(UIkit);
  }
  messagesBlockEventStart(event: any) {
    const messageBlock = this.elementRef.nativeElement.querySelector('.messages-block');
    if (messageBlock.clientHeight >= messageBlock.parentElement.clientHeight) {

      const computed = window.getComputedStyle(event.element);
      const mt = parseInt(computed.getPropertyValue('margin-top'), 10);
      const mb = parseInt(computed.getPropertyValue('margin-bottom'), 10);
      const st = messageBlock.scrollTop + event.element.offsetHeight + mt + mb;
      messageBlock.scrollTo(0, st);
    }
  }

  ngOnInit() {
    this._messageService.messageUpdater.subscribe(
      (message) => {
        this.messages = this._messageService.getMessages();
        // this.messagesBlockTrigger();
      }
    );
  }

}
