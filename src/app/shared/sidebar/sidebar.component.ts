import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor( private gifsService: GifsService ) { }

  get historial() {
    return this.gifsService.historial;
  }

  buscar( termino: string ) { // Al fer click en un card del sidebar (exemple Pokemon), cridarà el mètode de buscarGifs del service i carregarà les imatges segons el valor passat
    this.gifsService.buscarGifs(termino);
  }

}
