import {Injectable} from '@angular/core';
import {Message} from '../data/Message';
import {User} from '../data/User';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() {
  }

  initMessageStorage(): void {
    if (!localStorage.getItem('messages')) {
      const messages = new Array<Message>();
      localStorage.setItem('messages', JSON.stringify(messages));
    }
  }

  createAndSaveMessage(message: string, currentUser: User): void {
    const messages = JSON.parse(localStorage.getItem('messages'));
    messages.push(new Message(message, currentUser));
    localStorage.setItem('messages', JSON.stringify(messages));
  }


  getMessages(): Array<Message> {
    return JSON.parse(localStorage.getItem('messages'));
  }
}
