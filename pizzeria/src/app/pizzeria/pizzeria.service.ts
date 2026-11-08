import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PizzeriaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000/api/pedidos';

  guardarPedido(pedido: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/guardar`, pedido);
  }

  consultarTodos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/todos`);
  }

  consultarVentasDia(dia: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/ventas/dia/${dia}`);
  }

  consultarVentasMes(mes: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/ventas/mes/${mes}`);
  }

  eliminarPedido(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  
}