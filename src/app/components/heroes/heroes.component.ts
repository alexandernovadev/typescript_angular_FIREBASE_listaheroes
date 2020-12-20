import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
import { Heroe } from 'src/app/interfaces/herore.interface';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: any [];
  loading = true;

  constructor(public heroesservice: HeroesService) {
    this.heroesservice.getHeroes().subscribe(
      data => {
        this.heroes = data;
        console.log('compo', data);
        this.loading = false;
      });
   }

  ngOnInit() {
  }

  borrarHeroe(key$: string){
    console.log(key$);
    // Ver documentacion por que detele en firebasee retorna null
    this.heroesservice.deleteHero(key$).subscribe( data => {
      if (data) {
          console.error(data);
      } else {
        // Aqui utiliza los metodos JavaScript para eliminar elemtos
        // de un array
          delete this.heroes[key$];
      }
  });
  }
}
