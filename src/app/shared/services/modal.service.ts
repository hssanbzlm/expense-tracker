import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalComponent } from 'src/app/home/modal/modal.component';

@Injectable()
export class ModalService {
  private componentRef: ComponentRef<ModalComponent>;
  private componentSubscriber: Subject<string>;
  constructor() {}

  open(
    componentContainer: ViewContainerRef,
    modalTitle: string,
    modalBody: string
  ) {
    this.componentRef = componentContainer.createComponent(ModalComponent);
    this.componentRef.instance.closeme.subscribe(() => this.closeMe());
    this.componentRef.instance.confirmme.subscribe(() => this.confirm());
    this.componentRef.instance.title = modalTitle;
    this.componentRef.instance.body = modalBody;
    this.componentSubscriber = new Subject<string>();
    return this.componentSubscriber.asObservable();
  }

  closeMe() {
    this.componentSubscriber.complete();
    this.componentRef.destroy();
  }
  confirm() {
    this.componentSubscriber.next('confirm');
    this.closeMe();
  }
}
