import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {formatDate} from '@angular/common';

class Message {
  text: string;
  date: string;
  user: User;


  constructor(text: string, user: User) {
    this.text = text;
    this.user = user;
    this.date = formatDate(Date.now(), 'hh:mm a | MMM d ', 'en-US', '+0300');
  }
}

class User {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

@Component({
  selector: 'app-dialogue',
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.css']
})
export class DialogueComponent implements OnInit {
  @Input() name: string;
  messages = new Array<Message>();
  currentUser: User;
  messageForm: any;

  constructor(private formBuilder: FormBuilder) {
    this.messageForm = formBuilder.group({
      message: ''
    });
    if (!localStorage.getItem('messages')) {
      const messages = new Array<Message>();
      localStorage.setItem('messages', JSON.stringify(messages));
    }
  }

  ngOnInit(): void {
    if (this.name === 'Alica') {
      this.currentUser = new User(1, 'Alica');
    } else {
      this.currentUser = new User(2, 'Jack');
    }
  }

  onSubmit(messageObject): void {
    if (messageObject.message) {
      this.messageForm.reset();
      this.processMessage(messageObject.message);
    }
  }

  processMessage(message: string): void {
    const messages = JSON.parse(localStorage.getItem('messages'));
    messages.push(new Message(message, this.currentUser));
    localStorage.setItem('messages', JSON.stringify(messages));
  }

  public getMsgs(): Array<Message> {
    return JSON.parse(localStorage.getItem('messages'));
  }
}
