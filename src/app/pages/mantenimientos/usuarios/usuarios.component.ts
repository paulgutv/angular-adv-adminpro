import { Component, OnDestroy, OnInit, inject } from '@angular/core';

import Swal from 'sweetalert2';

import { Usuario } from '../../../models/usuario.model';

import { UsuarioService } from '../../../services/usuario.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription, delay } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: ``
})
export class UsuariosComponent implements OnInit, OnDestroy{
  private usuarioService = inject(UsuarioService);
  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;
  private busquedasService = inject(BusquedasService);
  private modalImagenService = inject(ModalImagenService);
  public imgSubs?: Subscription;

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(delay(200))
    .subscribe(img => this.cargarUsuarios());
  }

  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }


  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde)
    .subscribe(({total, usuarios}) => {
      this.totalUsuarios = total;
      this.usuarios = usuarios;
      this.usuariosTemp = usuarios;
      this.cargando = false;
    })
  }

  cambiarPagina(valor: number) {
    this.desde += valor;
    if(this.desde < 0) {
      this.desde = 0
    } else if (this.desde > this.totalUsuarios) {
      this.desde -= valor;
    }
    this.cargarUsuarios();
  }

  buscar(termino: string) {
    if(termino.length === 0) {
      return this.usuarios = this.usuariosTemp;
    }
    this.busquedasService.buscar('usuarios', termino)
    .subscribe((resultados: any) => {
      this.usuarios = resultados;
    })
    return;
  }

  eliminarUsuario(usuario: Usuario) {
    if(usuario.uid === this.usuarioService.uid) {
      return Swal.fire('Error','No puede borrarse a sí mismo', 'error');
    }
    Swal.fire({
      title: "¿Borrar usuario?",
      text: `Está a punto de borrar a ${usuario.nombre}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, borrarlo"
    }).then((result) => {
      if (result.value) {
        this.usuarioService.eliminarUsuario(usuario)
        .subscribe(resp => {
          this.cargarUsuarios();
          Swal.fire(
            'Usuario borrado',
            `${usuario.nombre} fue eliminado correctamente`,
            'success'
        )}
      );
      }
    });
    return;
  }

  cambiarRole(usuario: Usuario) {
    this.usuarioService.guardarUsuario(usuario)
    .subscribe(resp => {
      console.log(resp);

    })
  }

  abrirModal(usuario: Usuario) {
    console.log(usuario);
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img);

  }

}
