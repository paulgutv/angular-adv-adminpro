import { Component, inject } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: ``
})
export class ModalImagenComponent {

  public modalImagenService = inject(ModalImagenService);
  public fileUploadService = inject(FileUploadService);

  public imagenSubir?: File;
  public imgTemp: any = '';

  cerrarModal() {
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
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
    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    if(this.imagenSubir && id && tipo) {
      this.fileUploadService
      .actualizarFoto(this.imagenSubir, tipo, id)
      .then(img => {
        Swal.fire('Cambiado', 'Se cambió la imagen de perfil', 'success');
        this.modalImagenService.nuevaImagen.emit(img);
        this.cerrarModal();
      }).catch(err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      })
    }
  }

}
