import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ComponentService} from './component.service';
import {API_URL} from './app.vars';
import {TextComponent} from './response/text/text.component';
import {ResponseComponent} from './response/response.component';
import {CardComponent} from './response/card/card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  headers: { headers: HttpHeaders };
  protected response: any;
  protected session: string;
  protected requestSent = false;

  @ViewChild('displayArea', {read: ViewContainerRef}) container;

  constructor(private http: HttpClient, private service: ComponentService) {
  }

  public ngOnInit(): void {
    this.headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': '1'
      })
    };
  }

  protected sendRequest(input: HTMLTextAreaElement) {
    this.requestSent = true;
    const data = {
      question: input.value,
      session: this.session,
    };

    this.http.post(API_URL, data, this.headers).toPromise()
      .then((response: { type: string, data: any, session?: string }) => {
        this.response = JSON.stringify(response);
        this.addResponse(response);
        this.requestSent = false;
        this.session = response.session;
      });
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
}
