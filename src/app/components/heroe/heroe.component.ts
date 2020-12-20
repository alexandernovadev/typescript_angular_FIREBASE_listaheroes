import { Component, OnInit } from '@angular/core';
import { Heroe } from 'src/app/interfaces/herore.interface';
import { HeroesService } from 'src/app/services/heroes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe: Heroe = 
  {
    nombre: '',
    bio: '',
    casa: '',
  };

  // este es el id que voy a utilizar para actualizar
  id: string;

  constructor(private heroesservice: HeroesService,
              private router: Router,
              private ruta: ActivatedRoute) 
  {
    this.ruta.params.subscribe( (params: any) => 
    {
      this.id = params['id'];

      // Aqui trae los datos, pero SI no es uno nuevo
      // Entonces llama el servicio con el id, y me devuelve,
      // y pues lo asigno al JSon que tengo por defecto arriba
      // para que se muestren en los campos
      if (this.id !== 'nuevo') 
      {
        this.heroesservice.getHeroe(this.id)
            .subscribe((heroe: any) =>
        {
          this.heroe =  heroe;
        });
      }
    });
  }

  ngOnInit() 
  {
  }

  nuevoHeroe(form: NgForm) {
    
    this.router.navigate(['/heroe', 'nuevo']);
    form.reset({
        casa: 'Marvel'
    });

  }

  guardar() 
  {

    if (this.id === 'nuevo') 
    {
      this.heroesservice.nuevoHeroe(this.heroe)
      .subscribe((data: any) => {
          this.router.navigate(['/heroe', data.name]);
          // this.heroe.key$ = data.name;
      },
      error => console.log(error));
    }
    else 
    {
      this.heroesservice.actualizarHeroe(this.heroe, this.id)
      .subscribe((data: any) => console.log(data),
      error => console.log(error));
     }


  //   // Si no se suscribe uno, no funciona la funcion de Firebase de POst
  //   this.heroesservice.nuevoHeroe(this.heroe).subscribe((data: any) => {

  //     // Navega hasta el router con el id que creo
  //     this.router.navigate(['/heroe', data.name]);
  //   },
  //   error => console.log('Errr', error));

 }

}
