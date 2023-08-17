import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

export interface Datos {
  nombre?: string | null;
  numero?: string | null;
  mensaje?: string | null;
}
@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
})
export class ContactoComponent {
  banderaError: boolean = false;
  datos!: Datos;

  constructor(private fb: FormBuilder, private router: Router) {}

  formularioContacto = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    numero: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    mensaje: ['', [Validators.minLength(5), Validators.required]],
  });

  enviar(): void {
    if (this.formularioContacto.valid) {
      this.datos = this.formularioContacto.value;
      if (this.datos.numero?.startsWith('0')) {
        this.datos.numero = this.datos.numero.substring(1);
      }
      const mensajeEncoded = encodeURIComponent(
        'Hola mi nombre es: ' +
          this.datos.nombre +
          '\nQuiero saber: ' +
          this.datos.mensaje +
          '\nEste es mi número: ' +
          this.datos.numero
      );

      const whatsappURL = `https://wa.me/593967877450?text=${mensajeEncoded}`;
      window.open(whatsappURL, '_blank');
    } else {
      this.banderaError = !this.formularioContacto.valid;
      setTimeout(() => {
        this.banderaError = false;
      }, 3000);
    }
  }
}
