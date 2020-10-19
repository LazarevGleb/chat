import {Message} from './Message';

/**
 * State of button visibility
 */
export enum Visible {
  visible = 'visible',
  hidden = 'hidden'
}

/**
 * Object to define state of delete button and message to be deleted
 */
export interface DeleteState {
  isDeleteBtnDisplayed: Visible;
  messageToDelete: Message;
}

/**
 * State where message is defined and delete button is visible
 */
export class SetMessageAndVisible implements DeleteState {
  isDeleteBtnDisplayed: Visible;
  messageToDelete: Message;

  constructor(currentMessage: Message) {
    this.isDeleteBtnDisplayed = Visible.visible;
    this.messageToDelete = currentMessage;
  }
}

/**
 * State where messageToDelete is null and delete button is hidden
 */
export class SetNoMessageAndHidden implements DeleteState {
  isDeleteBtnDisplayed: Visible;
  messageToDelete: Message;


  constructor() {
    this.isDeleteBtnDisplayed = Visible.hidden;
    this.messageToDelete = null;
  }
}
