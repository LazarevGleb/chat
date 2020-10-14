import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ChatContainerComponent} from './components/chat-container/chat-container.component';
import {DialogueComponent} from './components/dialogue/dialogue.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatContainerComponent,
    DialogueComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
