import {
  animate,
  Component,
  OnInit,
  OnChanges,
  style,
  transition,
  trigger,
  SimpleChanges,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import {MessageService} from '../message-service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({opacity: '0'}),
        animate('.5s ease-out', style({opacity: '1'})),
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
export class ChatMessageListComponent implements OnInit {
  messages: Array<Object>;

  constructor(private _messageService: MessageService, private elementRef: ElementRef) {
    this._messageService = _messageService;
    this.messages = [];
  }

  messagesBlockEventStart(event: any) {
    const messageBlock = this.elementRef.nativeElement.querySelector('.messages-block');
    if (messageBlock.clientHeight >= messageBlock.parentElement.clientHeight) {
      messageBlock.style.marginRight = '0';
      const computed = window.getComputedStyle(event.element);
      const mt = parseInt(computed.getPropertyValue('margin-top'), 10);
      const mb = parseInt(computed.getPropertyValue('margin-bottom'), 10);
      const st = messageBlock.scrollTop + event.element.offsetHeight + mt + mb;
      messageBlock.scrollTo(0, st);
    }
  }

  messagesBlockEventEnd(event: any) {
    const messageBlock = this.elementRef.nativeElement.querySelector('.messages-block');
    if (messageBlock.clientHeight >= messageBlock.parentElement.clientHeight) {
      messageBlock.style.overflowY = 'auto';
      messageBlock.style.paddingRight = '-10px';
      messageBlock.style.display = 'block';
    }
  }

  resizeIframe(event: any) {
    console.log(event.path[0]);
    const width = event.path[0].clientWidth;

    console.log((width * 56.25) / 100);
    event.path[0].style.height = ((width * 56.25) / 100) + 'px';
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
