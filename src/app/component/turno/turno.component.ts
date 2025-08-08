/* import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/api.service.service';

@Component({
  selector: 'app-turno',
  templateUrl: './turno.component.html',
  styleUrls: ['./turno.component.css']
})
export class TurnoComponent {
  comercio: string = '';
  servicio: string = '';
  fechaInicial: string = '';
  fechaFinal: string = '';
  turnos: any[] = [];

  constructor(public auth: AuthService) {}

  generarTurno() {
    if (!this.comercio || !this.servicio || !this.fechaInicial || !this.fechaFinal) {
      alert('Por favor complete todos los campos.');
      return;
    }

    const nuevoTurno = {
      comercio: this.comercio,
      servicio: this.servicio,
      fechaTurno: new Date().toLocaleDateString(),
      fechaInicio: this.fechaInicial,
      horaFin: this.fechaFinal
    };

    this.turnos.push(nuevoTurno);

 
    this.comercio = '';
    this.servicio = '';
    this.fechaInicial = '';
    this.fechaFinal = '';
  }
} */

  import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/api.service.service';
import { TurnoService } from 'src/app/service/turno.service';

@Component({
  selector: 'app-turno',
  templateUrl: './turno.component.html',
  styleUrls: ['./turno.component.css']
})
export class TurnoComponent implements OnInit {
   comercio: string = '';
  servicio: string = '';
  fechaInicial: string = '';
  fechaFinal: string = '';
  turnos: any[] = [];
  comercios: any[] = [];
  servicios: any[] = [];

  constructor(public auth: AuthService,
    private turnoService: TurnoService
  ) {}


  ngOnInit() {
    this.cargarComercios();
  }

  cargarComercios() {
    this.turnoService.getComercios().subscribe({
      next: data => this.comercios = data,
      error: err => console.error('Error cargando comercios', err)
    });
  }

  cargarServicios() {
    if (!this.comercio) return;
    this.turnoService.getServicios(Number(this.comercio)).subscribe({
      next: data => this.servicios = data,
      error: err => console.error('Error cargando servicios', err)
    });
  } 



  generarTurno() {

    if (!this.servicio || !this.fechaInicial || !this.fechaFinal) {
      alert('Por favor complete todos los campos.');
      return;
    }

    this.turnoService.generarTurno(this.fechaInicial, this.fechaFinal, Number(this.servicio)).subscribe({
      
     next: (data) => {
        console.log('Servicios recibidos:', data); // 👈 Aquí ves lo que trae
      },
      error: (err) => {
        console.error('Error al obtener servicios:', err);
      }
    });
  }

  /* listarTurnosExistentes() {
    if (!this.servicio) return;
    this.turnoService.getTurnos(Number(this.servicio)).subscribe({
      next: data => this.turnos = data,
      error: err => console.error('Error listando turnos', err)
    });
  } */
}
