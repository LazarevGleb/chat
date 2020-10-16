import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {User} from '../../data/User';
import {Message} from '../../data/Message';

enum Visible {
  visible = 'visible',
  hidden = 'hidden'
}

// TODO: 2.Delete message only by author; 3.Tests; 4.Fix bug with click before delete


@Component({
  selector: 'app-dialogue',
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.css']
})
export class DialogueComponent implements OnInit {
  @Input() name: string;
  currentUser: User;
  messageForm: any;
  isDeleteBtnDisplayed = Visible.hidden;
  messageToDelete: Message;
  isForDelete: boolean;

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
      this.currentUser = new User(2, 'Bob');
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

  showDelete(message: Message): void {
    if (message.user.id === this.currentUser.id) {
      if (this.messageToDelete?.id === message.id) {
        this.toggleVisibility();
      } else {
        this.messageToDelete = message;
      }
    }
  }

  private toggleVisibility(): void {
    if (this.isDeleteBtnDisplayed === Visible.hidden) {
      this.isDeleteBtnDisplayed = Visible.visible;
    } else {
      this.isDeleteBtnDisplayed = Visible.hidden;
      this.messageToDelete = null;
    }
  }

  deleteMessage(): void {
    let messages = JSON.parse(localStorage.getItem('messages'));
    messages = messages.filter(msg => msg.id !== this.messageToDelete.id);
    this.isDeleteBtnDisplayed = Visible.hidden;
    localStorage.setItem('messages', JSON.stringify(messages));
  }
}
