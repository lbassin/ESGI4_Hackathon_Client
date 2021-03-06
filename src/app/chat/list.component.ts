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
import {DetailsService} from '../details.service';
import {Router} from '@angular/router';
import {HelpService} from '../help.service';

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
  iframeHeight = 250;
  user = '';

  constructor(private _messageService: MessageService,
              private elementRef: ElementRef,
              private detailsService: DetailsService,
              private router: Router,
              private helpServier: HelpService) {
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
    const width = event.path[0].clientWidth;
    this.iframeHeight = ((width * 56.25) / 100);
  }

  ngOnInit() {
    this.user = this.router.routerState.snapshot.url;
    if (this.user[0] === '/') {
      this.user = this.user.slice(1);
    }
    if (this.user[0]) {
      this.user = this.user[0].toUpperCase() + this.user.slice(1);
    }

    this._messageService.messageUpdater.subscribe(
      (message) => {
        this.messages = this._messageService.getMessages();
        const lastMessage: any = this.messages[this.messages.length - 1];
        if (lastMessage.type === 'film-cards') {
          this.detailsService.show(lastMessage.cards[0]);
        } else {
          this.detailsService.show(null);
        }
      }
    );
  }


  protected displayHelp() {
    this.helpServier.displayHelp();
  }
}
