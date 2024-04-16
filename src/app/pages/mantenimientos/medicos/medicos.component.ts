import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../models/medico.model';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { Subscription, delay } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: ``
})
export class MedicosComponent implements OnInit, OnDestroy {

  private medicoService = inject(MedicoService);
  private modalImagenService = inject(ModalImagenService);
  private busquedasService = inject(BusquedasService);
  public medicos: Medico[] = [];
  public medicosTemp: Medico[] = [];
  public cargando: boolean = true;
  private imgSubs?: Subscription;

  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(delay(200))
    .subscribe(img => this.cargarMedicos());
  }

  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicoService.cargarMedicos()
    .subscribe(medicos => {
      this.cargando = false;
      this.medicos = medicos;
      this.medicosTemp = medicos;
    })
  }

  abrirModal(medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);
  }

  buscar(termino: string) {
    if(termino.length === 0) {
      return this.medicos = this.medicosTemp;
    }
    this.busquedasService.buscar('medicos', termino)
    .subscribe((resultados: any) => {
      this.medicos = resultados;
    })
    return;
  }

  borrarMedico(medico: Medico) {
    Swal.fire({
      title: "¿Borrar médico?",
      text: `Está a punto de borrar a ${medico.nombre}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, borrarlo"
    }).then((result) => {
      if (result.value) {
        this.medicoService.borrarMedico(medico._id)
        .subscribe(resp => {
          this.cargarMedicos();
          Swal.fire(
            'Médico borrado',
            `${medico.nombre} fue eliminado correctamente`,
            'success'
        )}
      );
      }
    });
    return;
  }

}
