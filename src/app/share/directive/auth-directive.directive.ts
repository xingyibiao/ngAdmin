import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { AuthServiceService, Menu } from '../../serves/auth-service/auth-service.service';

@Directive({
  selector: '[appAuthDirective]'
})
export class AuthDirectiveDirective {
  private hasView: boolean = false

  constructor(private auth: AuthServiceService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) { }

  @Input()
  set appAuthDirective(str: string) {
    const authArray = str.split(':')
    let permission: string[] = []

    this.auth.menus.subscribe(
      (menus: Menu[]) => {
        menus.forEach((menu) => {
          menu.children.forEach((child) => {
            if (child.menuPinyin === authArray[0]) {
              permission = child.permission
            }
          })
        })
      }
    )

    if ((permission.indexOf(authArray[1]) > -1 || permission.length === 0) && !this.hasView ) {
      this.viewContainer.createEmbeddedView(this.templateRef)
      this.hasView = true
    } else {
      this.viewContainer.clear()
      this.hasView = false
    }
  }

}
