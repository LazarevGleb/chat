import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dialogue',
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.css']
})
export class DialogueComponent implements OnInit {
  @Input() public name: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
