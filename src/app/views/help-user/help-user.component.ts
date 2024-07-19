import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
  selector: 'app-help-user',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule, NavbarComponent],
  templateUrl: './help-user.component.html',
  styleUrl: './help-user.component.scss'
})
export class HelpUserComponent {
  helpForm = new FormGroup({
    naturalezaNegocio: new FormControl(''),
    legalizacion: new FormControl(''),
    cantidadEmpleados: new FormControl(''),
    ingresos: new FormControl(''),
    sectorCompany: new FormControl(''),
  });

 /*  valor = ''; // Corregido: Declarar la variable fuera de cualquier método

  constructor() {
    this.initializeIndexedDB();
  }

  help() {
    const { naturalezaNegocio, legalizacion, cantidadEmpleados, ingresos, sectorCompany } = this.helpForm.value;
    if (naturalezaNegocio == '1' && legalizacion == '1' && cantidadEmpleados == '1' && ingresos == '1' && sectorCompany == '1') {
      this.valor = "Tu empresa es una microempresa";
      this.saveToIndexedDB(this.valor); // Llamada a la función para guardar en IndexedDB
    }
  }

  initializeIndexedDB() {
    const request = window.indexedDB.open('estratPyme', 1);

    request.onerror = (event) => {
      console.error('Error al abrir IndexedDB', event);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('company')) {
        db.createObjectStore('company', { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onsuccess = (event) => {
      console.log('IndexedDB inicializado con éxito');
    };
  }
   saveToIndexedDB(valor) {
    const request = window.indexedDB.open('estratPyme', 1);

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(['company'], 'readwrite');
      const store = transaction.objectStore('company');
      const addRequest = store.add({ valor: valor });

      addRequest.onsuccess = () => {
        console.log('Valor guardado en IndexedDB con éxito');
      };

      addRequest.onerror = (event) => {
        console.error('Error al guardar en IndexedDB', event);
      };
    };

    request.onerror = (event) => {
      console.error('Error al abrir IndexedDB para guardar', event);
    };
  } */
} 