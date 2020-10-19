import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ChatContainerComponent} from './components/chat-container/chat-container.component';
import {DialogueComponent} from './components/dialogue/dialogue.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';

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
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
