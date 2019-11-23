import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from '../models/models';
import { Observable } from 'rxjs';

const URL_PRODUCTS = 'https://angular-products-261da.firebaseio.com/productos.json';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { 

  }

  getAll(){
    return this.http.get(URL_PRODUCTS);
  }

  getByCategory(category: string){
    return new Observable(oberver =>{
      this.http.get(URL_PRODUCTS).subscribe((data:ProductModel[]) =>{
        // item.category == category es un if resumido 
        const filter = data.filter(item => item.categoria == category || item.categoria.indexOf(category) >= 0);
        oberver.next(filter);
      });
    });
  }

  getByCode(code: string){
    return new Observable(oberver =>{
      this.http.get(URL_PRODUCTS).subscribe((data:ProductModel[]) =>{
        const filter = data.filter(item => item.codigo == code);
        oberver.next(filter[0]);
      });
    });
  }

  getByCriterio(criterio: string){
    return new Observable(oberver =>{
      this.http.get(URL_PRODUCTS).subscribe((data:ProductModel[]) =>{
        // item.category == category es un if resumido 
        const filter = data.filter(item => item.descripcion.toLowerCase() == criterio || item.descripcion.toLowerCase().indexOf(criterio.toLowerCase()) >= 0);
        oberver.next(filter);
      });
    });
  }

}
