import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Output() closeme = new EventEmitter();
  @Output() confirmme = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  closeMe() {
    this.closeme.emit();
  }

  confirmMe() {
    this.confirmme.emit();
  }
}
