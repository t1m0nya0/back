import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Company} from "./models";

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  BASE_URL = 'http://127.0.0.1:8000'
  private id$ = new BehaviorSubject<number>(<number>{})
  selectedId$ = this.id$.asObservable();
  constructor(private client: HttpClient) { }

  setId(id: number){
    this.id$.next(id);
  }
  getCompanies(): Observable<Company[]>{
    return this.client.get<Company[]>(`${this.BASE_URL}/api/companies/`)
  }
  getCompany(id:number):Observable<Company>{
    return this.client.get<Company>(`${this.BASE_URL}/api/companies/${id}/`)
  }
  updateCompany(companyName:string, companyAddress:string, companyCity:string, companyDescription:string, companyId: number): Observable<Company>{
    return this.client.put<Company>(`${this.BASE_URL}/api/companies/${companyId}/`,
      {
        "name":companyName,
        "description":companyDescription,
        "city":companyCity,
        "address":companyAddress,
      });
  }
  createCompany(companyName:string, companyAddress:string, companyCity:string, companyDescription:string): Observable<Company>{
    return this.client.post<Company>(`${this.BASE_URL}/api/companies/`,
      {
        'name': companyName,
        'description': companyDescription,
        'city': companyCity,
        'address':companyAddress,
      })
  }
  deleteCompany(companyId:number):Observable<any>{
    return this.client.delete(`${this.BASE_URL}/api/companies/${companyId}/`);
  }
}
