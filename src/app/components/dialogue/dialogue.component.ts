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
  messageForm;

  constructor(private formBuilder: FormBuilder) {
    this.messageForm = formBuilder.group({
      message: ''
    });
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
    this.messages.push(new Message(message, this.currentUser));
  }
}
