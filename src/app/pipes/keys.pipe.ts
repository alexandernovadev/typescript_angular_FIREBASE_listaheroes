import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys',
  pure: false // Esto siginifica que este pendiente de los cambio
})
export class KeysPipe implements PipeTransform {

  transform(value: any): any {
    const keys = [];

    // Aca trae los datos los agregar a un arreglo y los devuelve
    // Lo mas raro es como lo hace, yo lo haria en el constructor del 
    // service, pero esta esta buena tambien, solo adaptarme a Fer 

    // Eso significa que este metodo es el MEJOR porque acualiza

    // tslint:disable-next-line:forin
    for (const key in value) 
    {
        keys.push(key);
    }

    return keys;
}

}
