import { Component, inject } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  public sidebarService = inject(SidebarService);
  private usuarioService = inject(UsuarioService);
  public usuario?: Usuario;
  constructor() {
    this.usuario = this.usuarioService.usuario;
  }


}
