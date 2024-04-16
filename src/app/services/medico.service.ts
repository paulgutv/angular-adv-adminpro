import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Medico } from '../models/medico.model';
import { map } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  private http = inject(HttpClient);

  constructor() { }

  get token():string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  cargarMedicos() {
    const url = `${base_url}/medicos`;
    return this.http.get<{ok: boolean, medicos: Medico[]}>(url, this.headers)
    .pipe(
      map(resp => resp.medicos)
    )
  }

  obtenerMedicoPorId(id: string) {
    const url = `${base_url}/medicos/${id}`;
    return this.http.get<{ok: boolean, medico: Medico}>(url, this.headers)
    .pipe(
      map(resp => resp.medico)
    )
  }

  crearMedico(medico: {nombre: string, hospital: string}) {
    const url = `${base_url}/medicos`;
    return this.http.post<{ok: boolean, medicos: Medico[]}>(url, medico, this.headers);
  }

  actualizarMedico(medico: Medico) {
    const url = `${base_url}/medicos/${medico._id}`;
    return this.http.put<{ok: boolean, medicos: Medico[]}>(url, medico, this.headers);
  }

  borrarMedico(_id: string) {
    const url = `${base_url}/medicos/${_id}`;
    return this.http.delete<{ok: boolean, medicos: Medico[]}>(url, this.headers);
  }

}
