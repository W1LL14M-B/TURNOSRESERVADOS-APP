import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {
  private apiUrl = 'http://localhost:8080/api/turnos/comercios';

  constructor(private http: HttpClient) {}

  getComercios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getServiciosPorComercio(idComercio: number): Observable<any[]> {
    const url = `http://localhost:8080/api/turnos/servicios/${idComercio}`;
    return this.http.get<any[]>(url);
  }

  generarTurnos(fechaInicio: string, fechaFin: string, idServicio: number): Observable<any[]> {
    const url = 'http://localhost:8080/api/turnos/generar';
    const body = {
      fechaInicio,
      fechaFin,
      idServicio
    };
    return this.http.post<any[]>(url, body);
  }

  

}
