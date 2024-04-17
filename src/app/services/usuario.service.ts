import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone, inject } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment.development';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';
import { Usuario } from '../models/usuario.model';
import { BusquedasService } from './busquedas.service';

declare const google: any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private http = inject(HttpClient);
  private router = inject(Router);
  private ngZone = inject(NgZone);
  public usuario?: Usuario;

  get token():string {
    return localStorage.getItem('token') || '';
  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
    if (this.usuario && this.usuario.role) {
      return this.usuario.role;
    } else {
      return 'USER_ROLE'
    }
  }

  get uid(): string {
    return this.usuario?.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  guardarLocalStorage(token: string, menu: any){
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');

    if(this.usuario?.google) {
      google.accounts.id.revoke('gutierrez.paul@pucp.pe', () => {
        this.ngZone.run(() => {
          this.router.navigateByUrl('/login');
        })
      })
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  validarToken(): Observable<boolean> {
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => {
        const { email, google, nombre, role, img, uid } = resp.usuario;
        this.usuario = new Usuario(nombre, email, '', img, google, role, uid);
        this.guardarLocalStorage(resp.token, resp.menu);
        return true;
      }),
      map(resp => true),
      catchError(error => of(false))
    )
  }

  crearUsuario(formData: RegisterForm ) {
    return this.http.post(`${base_url}/usuarios`, formData)
    .pipe(
      tap((resp: any) => {
        this.guardarLocalStorage(resp.token, resp.menu);
      })
    )
  }

  actualizarPerfil(data: {email: string, nombre: string, role?: string}) {
    data = {
      ...data,
      role: this.usuario?.role
    }
    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, this.headers);
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData)
    .pipe(
      tap((resp: any) => {
        this.guardarLocalStorage(resp.token, resp.menu);
      })
    )
  }

  loginGoogle(token: string) {
    return this.http.post(`${base_url}/login/google`, { token })
    .pipe(
      tap((resp: any) => {
        this.guardarLocalStorage(resp.token, resp.menu);
      })
    )
  }

  cargarUsuarios(desde: number = 0) {
    const url = `${base_url}/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuario>(url, this.headers)
    .pipe(
      map(resp => {
        const usuarios = resp.usuarios.map(
          user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
        );
        return {
          total: resp.total,
          usuarios
        }
      })
    )
  }

  eliminarUsuario(usuario: Usuario) {
    const url = `${base_url}/usuarios/${usuario.uid}`;
    return this.http.delete(url, this.headers);
  }

  guardarUsuario(usuario: Usuario) {
    return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario, this.headers);
  }


}
