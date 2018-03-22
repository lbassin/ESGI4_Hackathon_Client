import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ChatComponent } from './chat-input/chat-input.component';
import { ChatMessageListComponent } from './chat-message-list/chat-message-list.component';
import {MessageService} from './Injectables/message-service';
import { ResponseBlockComponent } from './response-block/response-block.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AdviceBackgroundComponent } from './advice-background/advice-background.component';


@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    ChatMessageListComponent,
    ResponseBlockComponent,
    AdviceBackgroundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
