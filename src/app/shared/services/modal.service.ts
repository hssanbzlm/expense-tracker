import {
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  ViewContainerRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { ModalComponent } from 'src/app/home/modal/modal.component';

@Injectable()
export class ModalService {
  private componentRef: ComponentRef<ModalComponent>;
  private componentSubscriber: Subject<string> = new Subject<string>();
  constructor(private resolver: ComponentFactoryResolver) {}

  open(
    componentContainer: ViewContainerRef,
    modalTitle: string,
    modalBody: string
  ) {
    let factory = this.resolver.resolveComponentFactory(ModalComponent);
    this.componentRef = componentContainer.createComponent(factory);
    this.componentRef.instance.closeme.subscribe(() => this.closeMe());
    this.componentRef.instance.confirmme.subscribe(() => this.confirm());
    this.componentRef.instance.title = modalTitle;
    this.componentRef.instance.body = modalBody;
    return this.componentSubscriber;
  }

  closeMe() {
    this.componentRef.destroy();
  }
  confirm() {
    this.componentSubscriber.next('confirm');
    this.closeMe();
  }
}
