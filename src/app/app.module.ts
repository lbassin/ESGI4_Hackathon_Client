import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BotComponent} from './bot.component';
import {HttpClientModule} from '@angular/common/http';
import {TextComponent} from './response/text/text.component';
import {ComponentService} from './component.service';
import {CardComponent} from './response/card/card.component';
import {ResponseComponent} from './response/response.component';
import {SpeechRecognitionService} from './speech-recognition.service';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([{path: '**', component: BotComponent}]),
  ],
  declarations: [
    AppComponent,
    BotComponent,
    ResponseComponent,
    TextComponent,
    CardComponent,
  ],
  providers: [
    ComponentService,
    SpeechRecognitionService,
  ],
  entryComponents: [
    ResponseComponent,
    TextComponent,
    CardComponent,
  ],
})
export class AppModule {
}
