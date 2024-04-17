import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusquedasService } from '../../services/busquedas.service';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: ``
})
export class BusquedaComponent implements OnInit {

  private activatedRoute = inject(ActivatedRoute);
  private busquedasService = inject(BusquedasService);
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];
  public usuarios: Usuario[] = [];

  ngOnInit(): void {
    this.activatedRoute.params
    .subscribe(({termino}) => {
      this.busquedaGlobal(termino)
    })
  }

  busquedaGlobal(termino: string) {
    this.busquedasService.busquedaGlobal(termino)
    .subscribe((resp: any) => {
      console.log(resp);
      this.usuarios = resp.usuarios;
      this.medicos = resp.medicos;
      this.hospitales = resp.hospitales;
    })
  }

  abrirMedico(medico: Medico) {
    console.log(medico);

  }

}
