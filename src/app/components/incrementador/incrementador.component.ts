import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: ``
})
export class IncrementadorComponent implements OnInit{

  @Input('valor')
  progreso: number = 50;
  @Input()
  btnClass: string = 'btn-primary';

  @Output()
  valorSalida: EventEmitter<number> = new EventEmitter();

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

  get getPorcentaje() {
    return `${this.progreso}%`;
  }

  cambiarValor(valor: number) {
    if(this.progreso + valor < 0) {
      this.valorSalida.emit(0);
      this.progreso = 0;
      return;
    }

    if ( this.progreso + valor > 100) {
      this.valorSalida.emit(100);
      this.progreso = 100;
      return;
    }

    this.progreso = this.progreso + valor;
    this.valorSalida.emit(this.progreso);
  }

  onChange(nuevoValor: number) {
    if(nuevoValor >= 100) {
      this.progreso = 100;
    } else if(nuevoValor <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = nuevoValor;
    }
    this.valorSalida.emit(this.progreso);
  }
}
