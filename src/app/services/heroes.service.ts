import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Heroe } from '../interfaces/herore.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroesService 
{

  heroesURL  = 'https://ejemploapi-d98c5.firebaseio.com/heroes';

  constructor(private http: HttpClient) {

   }


  nuevoHeroe(heroe: Heroe) {

    // Para hacer una peticion post hay que enviar header, que es
    // como la informacion de la data, y el body que es la info
    const body = JSON.stringify(heroe);
    const headers = new HttpHeaders({
      'Content-type': 'application/json'
    });

     // El servicion http regresa un Observable
     // En los headers- > seria asi headers: headers
     // pero ECMA6 lo deja de una sola palabra, porque se esta
     // refiriendo a lo mismo

    return this.http.post(this.heroesURL + '.json', body , {headers}).pipe(
      map( res => {
        // Este metodo post crea un Nodo, WOWOWOWOWW
        console.log('En NewHero', res);
        return res;
      })
    );
  }

  actualizarHeroe(heroe: Heroe, key$: string) 
  {
    const body = JSON.stringify(heroe);
    const headers = new HttpHeaders({
      'Content-type': 'application/json'
    });

    return this.http.put(this.heroesURL + `/${key$}.json`, body, {headers})
      .pipe(
        map( res => {
            console.log(res);
            return res;
        }));
  }

  getHeroe(key$: string) 
  {
    // Trae solo el usuario por el ID
    return this.http.get(this.heroesURL + `/${key$}.json`)
    .pipe(map(res => res));
  }

  getHeroes() 
  {
    return this.http.get(this.heroesURL + '.json')
    .pipe( map( res => {
      console.log( 'DataService', res );
      return res;
    }));
  }

  deleteHero(key$: string) 
  {
    return this.http.delete(this.heroesURL + `/${key$}.json`)
    .pipe(map( res => {
        // console.log(res.json());
        return res;
    }));
  }

}
