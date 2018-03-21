import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ComponentService} from './component.service';
import {TextComponent} from './response/text/text.component';
import {ResponseComponent} from './response/response.component';
import {CardComponent} from './response/card/card.component';
import {SpeechRecognitionService} from './speech-recognition.service';

@Component({
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.scss']
})
export class BotComponent implements OnInit {

  protected speechData: string;

  @ViewChild('displayArea', {read: ViewContainerRef}) container;

  constructor(private http: HttpClient,
              private service: ComponentService,
              private speechRecognitionService: SpeechRecognitionService) {
  }

  public ngOnInit(): void {

  }

  protected addResponse(response: { type: string, data: any }): void {
    let component = ResponseComponent;

    switch (response.type) {
      case 'text':
        component = TextComponent;
        break;
      case 'card':
        component = CardComponent;
        break;
    }

    this.service.addDynamicComponent(this.container, component, response.data);
  }

  protected listenRequest(input: HTMLTextAreaElement, button: HTMLButtonElement, buttonSend: HTMLButtonElement) {
    button.style.backgroundColor = '#FF0000';
    this.speechRecognitionService.record()
      .subscribe(
        (value) => {
          this.speechData = value;
          input.value = value;
          console.log(value);
          buttonSend.style.backgroundColor = '#FF0000';
          // this.sendRequest(input, buttonSend);
          button.style.backgroundColor = '#FFF';
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
