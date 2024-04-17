import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any = [];

  cargarMenu() {

    const localMenu = localStorage.getItem('menu');
    if(localMenu) {
      this.menu = JSON.parse(localMenu) || [];
    }
  }

  // menu: any[] = [
  //   {
  //     titulo: 'Dashboard',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       { titulo: 'Main', url: '/' },
  //       { titulo: 'ProgressBar', url: 'progress' },
  //       { titulo: 'Gráficas', url: 'grafica1' },
  //       { titulo: 'Promesas', url: 'promises' },
  //       { titulo: 'Rxjs', url: 'rxjs' },
  //     ]
  //   },
  //   {
  //     titulo: 'Mantenimientos',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { titulo: 'Usuarios', url: 'usuarios' },
  //       { titulo: 'Hospitales', url: 'hospitales' },
  //       { titulo: 'Médicos', url: 'medicos' },
  //     ]
  //   }
  // ]

  constructor() { }
}
