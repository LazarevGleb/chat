import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ChatContainerComponent} from './components/chat-container/chat-container.component';
import {DialogueComponent} from './components/dialogue/dialogue.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {WebsocketModule} from './websocket';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    ChatContainerComponent,
    DialogueComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    FormsModule,
    WebsocketModule.config({
      url: environment.ws,
      reconnectAttempts: 3,
      reconnectInterval: 3000
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
