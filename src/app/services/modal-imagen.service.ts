import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {
  private _ocultarModal: boolean = true;
  public tipo?: 'usuarios' | 'medicos' | 'hospitales';
  public id?: string;
  public img?: string;

  public nuevaImagen: EventEmitter<string> = new EventEmitter();

  get ocultarModal() {
    return this._ocultarModal;
  }

  constructor() { }

  abrirModal(tipo: 'usuarios' | 'medicos' | 'hospitales', id?: string, img: string = 'no-img') {
    console.log(img);
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
    if(img.includes('https')) {
      this.img = img;
    } else {
      this.img = `${base_url}/upload/${tipo}/${img}`
    }
  }

  cerrarModal() {
    this._ocultarModal = true;
  }

}
