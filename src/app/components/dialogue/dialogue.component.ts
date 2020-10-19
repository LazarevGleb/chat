import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {User} from '../../data/User';
import {Message} from '../../data/Message';
import {MessageService} from '../../services/message.service';
import {DeleteFsm} from '../../services/DeleteFsm';
import {DeleteState, SetNoMessageAndHidden, Visible} from '../../data/DeleteState';

@Component({
  selector: 'app-dialogue',
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.css']
})
export class DialogueComponent implements OnInit {
  @Input() name: string;
  currentUser: User;
  messageForm: any;
  isForDelete: boolean;
  deleteForEveryone = false;
  deleteState: DeleteState;

  constructor(private formBuilder: FormBuilder, private messageService: MessageService) {
    this.messageForm = formBuilder.group({
      message: ''
    });
    this.deleteState = new SetNoMessageAndHidden();
    this.messageService.initMessageStorage();
  }

  ngOnInit(): void {
    if (this.name === 'Alica') {
      this.currentUser = new User(1, 'Alica');
    } else {
      this.currentUser = new User(2, 'Bob');
    }
  }

  /**
   * Action for button click to sent message
   * @param messageObject message to sent
   */
  onSubmit(messageObject): void {
    if (messageObject.message) {
      this.messageForm.reset();
      this.messageService.createAndSaveMessage(messageObject.message, this.currentUser);
    }
  }

  /**
   * Get messages from service except deleted for the user
   */
  public getMessages(): Array<Message> {
    return this.messageService.getMessages().filter(msg => {
      return msg.deletedForId !== this.currentUser.id;
    });
  }

  /**
   * Define state for delete icons and message for removing
   * @param message message to be deleted
   */
  showDelete(message: Message): void {
    const deleteFsm = new DeleteFsm(this.deleteState, message);
    this.deleteState = deleteFsm.getState();
  }

  /**
   * Delete message with two strategies: for everyone and only for author according to checkbox
   */
  deleteMessage(): void {
    let messages = this.messageService.getMessages();
    if (this.deleteForEveryone) {
      messages = this.preDeleteForAll(messages);
    } else {
      messages = this.preDeleteForAuthor(messages);
    }
    localStorage.setItem('messages', JSON.stringify(messages));

    this.deleteState.isDeleteBtnDisplayed = Visible.hidden;
  }

  /**
   * Filter messages to throw out candidate for deletion
   * @param messages incoming messages to be filtered
   */
  private preDeleteForAll(messages: Array<Message>): Array<Message> {
    this.deleteForEveryone = false;
    return messages.filter(msg => msg.id !== this.deleteState.messageToDelete.id);

  }

  /**
   * Find message to be deleted and mark it to not be shown for author
   * @param messages incoming messages to be filtered
   */
  private preDeleteForAuthor(messages: Array<Message>): Array<Message> {
    const id = this.currentUser.id;

    messages.forEach(msg => {
      if (msg.id === this.deleteState.messageToDelete.id) {
        msg.deletedForId = id;
      }
    });
    return messages;
  }

  /**
   * Manage checkbox state
   * @param e checkbox state
   */
  toggleDeletion(e): void {
    this.deleteForEveryone = e.checked;
  }
}
