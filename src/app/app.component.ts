import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {API_URL} from './app.vars';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  headers: {headers: HttpHeaders};

  constructor(private http: HttpClient) {
  }

  public ngOnInit(): void {
    this.headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': '1'
      })
    };
  }

  sendRequest(input: HTMLTextAreaElement) {
    const data = {question: input.value};

    this.http.post(API_URL, data, this.headers).toPromise().then(response => {
      console.log(response);
    });
  }
}
