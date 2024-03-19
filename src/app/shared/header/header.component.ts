import { Component, inject } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private usuarioService = inject(UsuarioService);
  
  logout() {
    this.usuarioService.logout();
  }
}
