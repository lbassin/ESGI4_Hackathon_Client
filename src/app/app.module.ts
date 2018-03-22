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
import {ChatComponent} from './chat/input.component';
import {ChatMessageListComponent} from './chat/list.component';
import {ResponseBlockComponent} from './response-block/response-block.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MessageService} from './message-service';
import {ApiService} from './api.service';
import {AdviceBackgroundComponent} from './advice-background/advice-background.component';
import {VoiceService} from './voice.service';
import {FicheMediaComponent} from './fiche-media/fiche-media.component';
import {DetailsService} from './details.service';


@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([{path: '**', component: BotComponent}]),
  ],
  declarations: [
    AppComponent,
    BotComponent,
    ResponseComponent,
    TextComponent,
    CardComponent,
    ChatComponent,
    ChatMessageListComponent,
    ResponseBlockComponent,
    AdviceBackgroundComponent,
    FicheMediaComponent,
  ],
  providers: [
    ComponentService,
    SpeechRecognitionService,
    MessageService,
    ApiService,
    VoiceService,
    DetailsService,
  ],
  entryComponents: [
    ResponseComponent,
    TextComponent,
    CardComponent,
  ],
})
export class AppModule {
}
