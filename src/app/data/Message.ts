import {formatDate} from '@angular/common';
import {User} from './User';

export class Message {
  constructor(text: string, user: User) {
    this.text = text;
    this.user = user;
    this.date = formatDate(Date.now(), 'hh:mm a | MMM d ', 'en-US', '+0300');
    this.id = Message.idCounter++;
  }

  static idCounter = 0;
  text: string;
  date: string;
  user: User;
  id: any;
}
