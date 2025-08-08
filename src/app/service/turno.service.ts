import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

    private baseUrl = 'http://localhost:8080/api/turnos';


  constructor(private http: HttpClient) {}



   
  getComercios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/comercios`);
  }

  getServicios(idComercio: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/servicios/${idComercio}`);
  }



  generarTurno(fechaInicio: string, fechaFin: string, idServicio: number): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}/generar`, {
      
      fechaInicio,
      fechaFin,
      idServicio
    });
  }  



 /*  getTurnos(idServicio: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${idServicio}`);
  } */
}
