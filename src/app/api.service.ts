import {Injectable} from '@angular/core';
import {API_URL} from './app.vars';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable()
export class ApiService {

  private headers: { headers: HttpHeaders };
  private session: string;
  private response: string;

  constructor(private http: HttpClient, private router: Router) {
    let id = this.router.routerState.snapshot.url;
    if (id[0] === '/') {
      id = id.slice(1);
    }

    this.headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': id
      })
    };
  }

  ask(question: string) {
    const data = {
      question: question,
      session: this.session,
    };

    this.http.post(API_URL, data, this.headers).toPromise()
      .then((response: { type: string, data: any, session?: string }) => {
        this.response = JSON.stringify(response);
        console.log(response);
        this.session = response.session;
      });

  }

}
