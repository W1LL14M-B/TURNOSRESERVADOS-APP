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
  servicios: any[] = [];
  servicio: any = null;
  fechaInicial: string = '';
  fechaFinal: string = '';
  turnos: any[] = [];
  comercios: any[] = []; 
  servicioId: string = '';

  constructor(public auth: AuthService, private turnoService: TurnoService) {}

  ngOnInit(): void {
    this.cargarComercios();
  }



    cargarComercios() {
      this.turnoService.getComercios().subscribe({
        next: (data) => {
          this.comercios = data;
        },
        error: (err) => {
          console.error('Error al cargar comercios', err);
          alert('No se pudo cargar la lista de comercios.');
        }
      });
    }
  
    limpiarComercios() {
      this.comercios = [];
    }

    onComercioChange(event: Event) {
      const selectElement = event.currentTarget as HTMLSelectElement;
      const value = selectElement.value;
      // Aquí puedes manejar el cambio de comercio
      console.log(value);
    }

    cargarServicios() {
      const id = Number(this.comercio);
      if (!id) {
        alert('Seleccione un comercio primero.');
        return;
      }
      this.turnoService.getServiciosPorComercio(id).subscribe({
        next: (data) => {
          console.log('Servicios cargados:', data);
          this.servicios = data;
        },
        error: (err) => {
          console.error('Error al cargar servicios', err);
          alert('No se pudieron cargar los servicios del comercio.');
        }
      });
    }
    
    limpiarServicios() {
      this.servicios = [];
    }

    generarTurnos() {
      const idServicio = Number(this.servicioId);
      if (!idServicio || !this.fechaInicial || !this.fechaFinal) {
        alert('Todos los campos son obligatorios.');
        return;
      }
    
      this.turnoService.generarTurnos(this.fechaInicial, this.fechaFinal, idServicio)
        .subscribe({
          next: (data) => {
            this.turnos = data;
          },
          error: (err) => {
            console.error('Error:', err);
            alert('Error al generar turnos');
          }
        });
    }

  }

