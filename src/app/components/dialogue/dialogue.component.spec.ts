import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DialogueComponent} from './dialogue.component';
import {FormBuilder} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';

describe('DialogueComponent', () => {
  let component: DialogueComponent;
  let fixture: ComponentFixture<DialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatCheckboxModule],
      declarations: [DialogueComponent],
      providers: [FormBuilder]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
