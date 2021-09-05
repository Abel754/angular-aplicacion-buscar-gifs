import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  // El ! significa que no serà null. És de tipus ElementRef i el ViewChild serà per agafar la informació de l'input
  // Hem buscat a busqueda.component.html un element que es diu #txtBuscar i creem una nova variable txtBuscar. HTMLInputElement és perquè Visual Studio Code autocompleti després de nativeElement
  // Nota* Es pot saber el tipus (ElementRef) posant a la consola this.txtBuscar
  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>; 

  constructor( private gifsService: GifsService ) {}

  buscar() {
    const valor = this.txtBuscar.nativeElement.value; // Sempre serà nativeElement, és la propietat que ve amb l'objecte

    if( valor.trim().length === 0 ) {
      return;
    }

    this.gifsService.buscarGifs( valor );

    this.txtBuscar.nativeElement.value = '';
  }

}
