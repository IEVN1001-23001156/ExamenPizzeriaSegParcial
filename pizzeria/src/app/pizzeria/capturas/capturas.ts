import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PizzeriaService } from '../pizzeria.service';

@Component({
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  selector: 'app-capturas',
  styleUrl: './capturas.css',
  templateUrl: './capturas.html',
})
export class Capturas {
  private fb = inject(FormBuilder);
  private pizzeriaService = inject(PizzeriaService);

  pedidoForm: FormGroup;
  detallePizzas: any[] = [];

  constructor() {
    const fechaLocal = new Date();
    const anio = fechaLocal.getFullYear();
    const mes = String(fechaLocal.getMonth() + 1).padStart(2, '0');
    const dia = String(fechaLocal.getDate()).padStart(2, '0');
    const fechaHoy = `${anio}-${mes}-${dia}`;

    this.pedidoForm = this.fb.group({
      NombreCliente: ['', Validators.required],
      Direccion: ['', Validators.required],
      Telefono: ['', Validators.required],
      FechaPedido: [fechaHoy, Validators.required],
      Tamano: ['Mediana', Validators.required],
      Ingredientes: this.fb.group({
        jamon: [false],
        pina: [false],
        champiniones: [false],
        pimientos: [false]
      }),
      NumPizzas: [1, [Validators.required, Validators.min(1)]]
    });
  }

  agregarPizza(): void {
    const formVal = this.pedidoForm.value;
    const tamano = formVal.Tamano;
    const numPizzas = Number(formVal.NumPizzas);
    const ing = formVal.Ingredientes;

    let precioBase = 40;
    if (tamano === 'Mediana') precioBase = 80;
    if (tamano === 'Grande') precioBase = 120;

    let totalIngredientes = 0;
    let listaIngredientes: string[] = [];
    if (ing.jamon) { totalIngredientes += 10; listaIngredientes.push('Jamón'); }
    if (ing.pina) { totalIngredientes += 10; listaIngredientes.push('Piña'); }
    if (ing.champiniones) { totalIngredientes += 10; listaIngredientes.push('Champiñones'); }
    if (ing.pimientos) { totalIngredientes += 10; listaIngredientes.push('Pimientos'); }

    const subtotal = (precioBase + totalIngredientes) * numPizzas;

    const nuevaPizza = {
      tamano: tamano,
      ingredientes: listaIngredientes.join(', ') || 'Sin ingredientes',
      numPizzas: numPizzas,
      subtotal: subtotal
    };

    this.detallePizzas.push(nuevaPizza);
    
    this.pedidoForm.patchValue({
      NumPizzas: 1,
      Ingredientes: { jamon: false, pina: false, champiniones: false, pimientos: false }
    });
  }

  quitarPizza(index: number): void {
    this.detallePizzas.splice(index, 1);
  }

  get calcularTotal(): number {
    return this.detallePizzas.reduce((acc, p) => acc + p.subtotal, 0);
  }

  registrarPedido(): void {
    if (this.detallePizzas.length === 0) {
      alert('Agregue al menos una pizza antes de registrar el pedido.');
      return;
    }

    if (this.pedidoForm.invalid) {
      alert('Por favor complete los datos del cliente.');
      return;
    }

    const val = this.pedidoForm.value;
    const totalPedido = this.calcularTotal;

    const pedidoFinal = {
      NombreCliente: val.NombreCliente,
      Direccion: val.Direccion,
      Telefono: val.Telefono,
      FechaPedido: val.FechaPedido,
      TotalPedido: totalPedido
    };

    this.pizzeriaService.guardarPedido(pedidoFinal).subscribe({
      next: () => {
        alert(`Pedido Registrado! Total: $${totalPedido}`);
        this.detallePizzas = [];
        
        const fechaLocal = new Date();
        const fechaHoy = `${fechaLocal.getFullYear()}-${String(fechaLocal.getMonth() + 1).padStart(2, '0')}-${String(fechaLocal.getDate()).padStart(2, '0')}`;

        this.pedidoForm.reset({
          FechaPedido: fechaHoy,
          Tamano: 'Mediana',
          NumPizzas: 1,
          Ingredientes: { jamon: false, pina: false, champiniones: false, pimientos: false }
        });
      },
      error: (err) => {
        console.error('Error al guardar:', err);
        alert('Error al conectar');
      }
    });
  }
}