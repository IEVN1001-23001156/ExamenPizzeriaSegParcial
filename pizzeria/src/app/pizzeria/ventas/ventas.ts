import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PizzeriaService } from '../pizzeria.service';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-ventas',
  templateUrl: './ventas.html',
  styleUrl: './ventas.css'
})
export class Ventas {
  private pizzeriaService = inject(PizzeriaService);
  
  // Dia
  diaBusqueda: string = '';
  ventasDia: any[] = [];
  totalDia: number = 0;

  // MES
  mesBusqueda: string = '';
  ventasMes: any[] = [];
  totalMes: number = 0;

  consultarVentasPorDia(): void {
    if (!this.diaBusqueda) {
      alert('Por favor ingresa un día de la semana o fecha');
      return;
    }

    this.pizzeriaService.consultarVentasDia(this.diaBusqueda).subscribe({
      next: (res: any) => {
        this.ventasDia = res.ventas || [];
        this.totalDia = res.total_dia || 0;
      },
      error: (err) => {
        console.error('Error al consultar ventas por día:', err);
        alert('Error al conectar con la API');
      }
    });
  }

  consultarVentasPorMes(): void {
    if (!this.mesBusqueda) {
      alert('Por favor ingresa el nombre de un mes');
      return;
    }

    this.pizzeriaService.consultarVentasMes(this.mesBusqueda).subscribe({
      next: (res: any) => {
        this.ventasMes = res.ventas || [];
        this.totalMes = res.total_mes || 0;
      },
      error: (err) => {
        console.error('Error al consultar ventas por mes:', err);
        alert('Error al conectar con la API');
      }
    });
  }
}