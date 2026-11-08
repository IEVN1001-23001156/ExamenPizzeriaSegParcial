import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PizzeriaService } from '../pizzeria.service';

@Component({
  imports: [CommonModule],
  selector: 'app-detalles',
  styleUrl: './detalles.css',
  templateUrl: './detalles.html',
})
export class Detalles implements OnInit {
  private pizzeriaService = inject(PizzeriaService);
  pedidos: any[] = [];

  ngOnInit(): void {
    this.cargarPedidos();
  }

  cargarPedidos(): void {
    this.pizzeriaService.consultarTodos().subscribe({
      next: (data: any[]) => {
        this.pedidos = data;
      },
      error: (err: any) => {
        console.error('Error al cargar los pedidos:', err);
      }
    });
  }

  get calcularTotalGeneral(): number {
    return this.pedidos.reduce((acc, p) => acc + Number(p.TotalPedido || 0), 0);
  }

  eliminarPedido(id: number): void {
    this.pizzeriaService.eliminarPedido(id).subscribe({
      next: () => {
        alert('Pedido eliminado correctamente');
        this.cargarPedidos();
      },
      error: (err: any) => {
        console.error('Error al eliminar:', err);
      }
    });
  }

  completarPedido(): void {
    alert('¡Pedidos procesados y guardados con éxito!');
  }
}