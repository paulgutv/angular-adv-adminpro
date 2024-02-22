import { Component, inject } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  public menuItems: any[] = [];
  private sidebarService = inject(SidebarService);

  constructor() {
    this.menuItems = this.sidebarService.menu;
    console.log(this.menuItems);

  }


}
