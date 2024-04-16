import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: ``
})
export class HospitalesComponent implements OnInit, OnDestroy {
  public hospitales: Hospital[] = [];
  public hospitalesTemp: Hospital[] = [];
  public cargando: boolean = true;
  private imgSubs?: Subscription;

  private hospitalService = inject(HospitalService);
  private modalImagenService = inject(ModalImagenService);
  private busquedasService = inject(BusquedasService);

  ngOnInit(): void {
    this.cargarHospitales();
    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(delay(200))
    .subscribe(img => this.cargarHospitales());
  }

  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHospitales()
    .subscribe(hospitales => {
      this.cargando = false;
      this.hospitales = hospitales;
      this.hospitalesTemp = hospitales;
    })
  }

  guardarCambios(hospital: Hospital) {
    this.hospitalService.actualizarHospital(hospital._id, hospital.nombre)
    .subscribe(resp => {
      Swal.fire('Actualizado', hospital.nombre, 'success')
    })
  }

  eliminarHospital(hospital: Hospital) {
    this.hospitalService.borrarHospital(hospital._id)
    .subscribe(resp => {
      this.cargarHospitales();
      Swal.fire('Borrado', hospital.nombre, 'success')
    })
  }

  async abrirSweetAlert() {
    const {value = ''} = await Swal.fire<string>({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: "text",
      inputLabel: "Nombre hospital",
      inputPlaceholder: "Nombre del hospital",
      showCancelButton: true,
    });

    if(value && value.trim().length > 0) {
      this.hospitalService.crearHospital(value)
      .subscribe((resp: any) => {
        this.hospitales.push(resp.hospital)
      })
    }
  }

  abrirModal(hospital: Hospital) {
    this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img);
  }

  buscar(termino: string) {
    if(termino.length === 0) {
      return this.hospitales = this.hospitalesTemp;
    }
    this.busquedasService.buscar('hospitales', termino)
    .subscribe((resultados: any) => {
      this.hospitales = resultados;
    })
    return;
  }

}
