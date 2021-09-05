import { HttpClient, HttpParams } from '@angular/common/http'; // Permet fer peticions HTTP. Anteriorment, hem fet l'import a app.module.ts per poder-ho utilitzar de manera global
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'e9duiv3Q4ia8XfxTXsj4Ok0JnjuyALqe';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';

  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial() {
    this._historial = this._historial.splice(0,10); // Perquè només mostri 10 valors
    return [...this._historial]; // Els tres ... treu els valors que té this.historial i crea un nou
  } 

  constructor( private http: HttpClient ) {
    console.log(this.resultados)
    if( localStorage.getItem('historial') ) {
      this._historial = JSON.parse(localStorage.getItem('historial')!); // ! per indicar que no serà null (així no dóna error)
      // En aquest cas és Json.parse i no Stringify perquè el convertim del String que teníem a Objecte
    }

    if( localStorage.getItem('resultados') ) {
      this.resultados = JSON.parse(localStorage.getItem('resultados')!); // ! per indicar que no serà null (així no dóna error)
      // En aquest cas és Json.parse i no Stringify perquè el convertim del String que teníem a Objecte
    }

  }

  buscarGifs( query: string ) {

    query = query.trim().toLowerCase();

    if( !this._historial.includes( query ) ) { // No afegirà un valor que ja existeixi (repetit)
      
      this._historial.unshift( query ); // Afegeix la búsqueda de l'input a l'array

      localStorage.setItem('historial', JSON.stringify( this._historial )); // Guardem en el localStorage del navegador un item anomenat historial per quan refresquis el navegador, no es perd les búsquedas (json.stringify converteix un objecte a String)

    } 

    console.log(this._historial)

    const params = new HttpParams() // Amb el HttpParams podem enviar paràmetres pel header hola.com?header1=a&header2=b
          .set('api_key', this.apiKey)
          .set('limit', '10')
          .set('q', query);

    // Serà de tipus SearchGifsResponse
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params: params})
      .subscribe( ( resp ) => { // subscribe s'executa al finalitzar el .get. És subscribe perquè és una promesa; és com funciona http
        console.log(resp.data)
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify( this.resultados ));
      })
    
  }

  
    
  
}
