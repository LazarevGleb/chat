import {Message} from '../data/Message';
import {DeleteState, SetMessageAndVisible, SetNoMessageAndHidden, Visible} from '../data/DeleteState';

/**
 * Final state machine implementation.
 * @see SetMessageAndVisible
 * @see SetNoMessageAndHidden
 */
export class DeleteFsm {
  isDeleteBtnDisplayed: Visible;
  messageToDelete: Message;
  currentMessage: Message;

  constructor(deleteState: DeleteState, message: Message) {
    this.isDeleteBtnDisplayed = deleteState.isDeleteBtnDisplayed;
    this.messageToDelete = deleteState.messageToDelete;
    this.currentMessage = message;
  }

  getState(): DeleteState {
    if (this.forVisibleState()) {
      return new SetMessageAndVisible(this.currentMessage);
    } else if (this.forHiddenState()) {
      return new SetNoMessageAndHidden();
    }
  }

  /**
   * True if button is hidden OR
   * button is visible and current message is not a candidate to be deleted
   */
  private forVisibleState(): boolean {
    return this.isDeleteBtnDisplayed === Visible.hidden ||
      this.isDeleteBtnDisplayed === Visible.visible &&
      this.messageToDelete?.id !== this.currentMessage.id;
  }

  /**
   * True if button is visible and current message is a candidate to be deleted
   * @private
   */
  private forHiddenState(): boolean {
    return this.isDeleteBtnDisplayed === Visible.visible &&
      this.messageToDelete?.id === this.currentMessage.id;
  }
}
