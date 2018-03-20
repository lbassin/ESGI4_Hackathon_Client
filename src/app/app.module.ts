import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {TextComponent} from './response/text/text.component';
import {ComponentService} from './component.service';
import {CardComponent} from './response/card/card.component';
import {ResponseComponent} from './response/response.component';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    ResponseComponent,
    TextComponent,
    CardComponent,
  ],
  providers: [
    ComponentService,
  ],
  entryComponents: [
    ResponseComponent,
    TextComponent,
    CardComponent,
  ],
})
export class AppModule {
}
