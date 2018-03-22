import {
  animate, Component, OnInit, OnChanges, style, transition, trigger, SimpleChanges, ElementRef, AfterViewInit,
  Output, EventEmitter
} from '@angular/core';
import {MessageService} from '../Injectables/message-service';
import {DomSanitizer} from '@angular/platform-browser';
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
export class ChatMessageListComponent implements OnInit {

  @Output() reponseChange: EventEmitter<object> = new EventEmitter();

  messages: Array<Object>;
  reponseValue: any;

  constructor(private _messageService: MessageService, private elementRef: ElementRef, private sanitizer: DomSanitizer) {
    this._messageService = _messageService;
    this.sanitizer = sanitizer;
    this.messages = [];
  }

  set response(val) {
    this.reponseValue = val;
    this.reponseChange.emit(this.reponseValue);
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
    const width = event.path[0].clientWidth;
    event.path[0].style.height = ((width * 56.25) / 100) + 'px';
  }
  safe(value) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }
  ngOnInit() {
    this._messageService.messageUpdater.subscribe(
      (message) => {
        this.messages = this._messageService.getMessages();
        if (message.type === 'film-cards') {
          console.log(message);
          this.reponseChange.emit(message.cards[0]);
        }
        // this.messagesBlockTrigger();
      }
    );
  }

}
