import {ComponentFactoryResolver, Injectable, ViewContainerRef} from '@angular/core';
import {ResponseComponent} from './response/response.component';

@Injectable()
export class ComponentService {

  constructor(private factoryResolver: ComponentFactoryResolver) {
  }

  public addDynamicComponent(container: ViewContainerRef, element: any, data: any) {
    const factory = this.factoryResolver.resolveComponentFactory(element);
    const component = factory.create(container.parentInjector);

    (<ResponseComponent>component.instance).data = data;

    container.insert(component.hostView);
  }
}
