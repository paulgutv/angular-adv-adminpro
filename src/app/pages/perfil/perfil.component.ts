import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: ``
})
export class PerfilComponent implements OnInit {
  public perfilForm!: FormGroup;
  private fb = inject(FormBuilder);
  private usuarioService = inject(UsuarioService);
  private fileUploadService = inject(FileUploadService);
  public usuario?: Usuario;
  public imagenSubir?: File;
  public imgTemp: any = '';

  constructor() {
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario?.nombre, Validators.required],
      email: [this.usuario?.email, [Validators.required, Validators.email]]
    });
  }

  actualizarPerfil() {
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
    .subscribe( () => {
      const { nombre, email } = this.perfilForm.value;
      if(this.usuario) {
        this.usuario.nombre = nombre;
        this.usuario.email = email;
        Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
      }
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error');
    })
  }

  cambiarImagen(event: Event) {
    let file: File = (event.target as HTMLInputElement).files![0];
    this.imagenSubir = file;
    if(!file) {
      return this.imgTemp = null;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }

    return
  }

  subirImagen() {
    if(this.imagenSubir && this.usuario?.uid) {
      this.fileUploadService
      .actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
      .then(img => {
        if(this.usuario && this.usuario.img) {
          this.usuario.img = img
        }
        Swal.fire('Cambiado', 'Se cambió la imagen de perfil', 'success');
      }).catch(err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      })
    }
  }
}
