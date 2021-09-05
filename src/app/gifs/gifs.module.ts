import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GifsPageComponent } from './gifs-page/gifs-page.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { ResultadosComponent } from './resultados/resultados.component';



@NgModule({
  declarations: [
    GifsPageComponent,
    BusquedaComponent,
    ResultadosComponent
  ],
  exports: [
    GifsPageComponent // Només exporta aquest perquè BusquedaComponent i ResultadosComponent es criden des del GifsPageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GifsModule { }
