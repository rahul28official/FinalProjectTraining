import { Injectable } from '@angular/core';
import { HttpClient , HttpParams } from '@angular/common/http';
import { Category, User } from '../models/models';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
 
  baseurl="https://localhost:7226/api/Shopping/";

  constructor(private http: HttpClient) {}

  getCategoryList() {
    let url = this.baseurl + 'GetCategoryList';
    return this.http.get<any[]>(url).pipe(
      map((categories) =>
        categories.map((category) => {
          let mappedCategory: Category = {
            id: category.id,
            category: category.category,
            subCategory: category.subCategory,
          };
          return mappedCategory;
        })
      )
    );
  }
  getProducts(category: string, subCategory: string , count: number){
    return this.http.get<any[]>(this.baseurl+'GetProducts',{
      params: new HttpParams()
      .set('category',category)
      .set('subcategory',subCategory)
      .set('count',count),
    });

  }
  getProduct(id: number) {
    let url = this.baseurl + 'GetProduct/' + id;
    return this.http.get(url);
  }

  registerUser(user: User) {
    let url = this.baseurl + 'RegisterUser';
    return this.http.post(url, user, { responseType: 'text' });
  }

  loginUser(email: string, password: string) {
    let url = this.baseurl + 'LoginUser';
    return this.http.post(
      url,
      { Email: email, Password: password },
      { responseType: 'text' }
    );
  }

}
