import { inject } from '@angular/core';
import { CanActivateFn, CanLoadFn, CanMatchFn, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const usuarioService = inject(UsuarioService);
  const router = inject(Router);

  return usuarioService.validarToken()
  .pipe(
    tap(estaAutenticado => {
      if(!estaAutenticado) {
        router.navigateByUrl('/login');
      }
    })
  )
};

export const authGuard2: CanMatchFn = (route, segments) => {

  const usuarioService = inject(UsuarioService);
  const router = inject(Router);

  return usuarioService.validarToken()
  .pipe(
    tap(estaAutenticado => {
      if(!estaAutenticado) {
        router.navigateByUrl('/login');
      }
    })
  )
};
