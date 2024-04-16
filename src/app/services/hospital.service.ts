import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Hospital } from '../models/hospital.model';
import { map } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

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

  cargarHospitales() {
    const url = `${base_url}/hospitales`;
    return this.http.get<{ok: boolean, hospitales: Hospital[]}>(url, this.headers)
    .pipe(
      map(resp => resp.hospitales)
    )
  }

  crearHospital(nombre: string) {
    const url = `${base_url}/hospitales`;
    return this.http.post<{ok: boolean, hospitales: Hospital[]}>(url, {nombre}, this.headers);
  }

  actualizarHospital(_id: string, nombre: string) {
    const url = `${base_url}/hospitales/${_id}`;
    return this.http.put<{ok: boolean, hospitales: Hospital[]}>(url, {nombre}, this.headers);
  }

  borrarHospital(_id: string) {
    const url = `${base_url}/hospitales/${_id}`;
    return this.http.delete<{ok: boolean, hospitales: Hospital[]}>(url, this.headers);
  }

}
