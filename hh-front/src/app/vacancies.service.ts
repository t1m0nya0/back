import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Vacancy} from "./models";

@Injectable({
  providedIn: 'root'
})
export class VacanciesService {
  BASE_URL = 'http://127.0.0.1:8000'
  constructor(private client: HttpClient) { }

  getVacancies(id: number):Observable<Vacancy[]>{
    return this.client.get<Vacancy[]>(`${this.BASE_URL}/api/companies/${id}/vacancies/`);
  }

  createVacancy(vacancyName:string, vacancyDescription:string, vacancySalary:number, vacancyCompany: number): Observable<Vacancy>{
    return this.client.post<Vacancy>(`${this.BASE_URL}/api/vacancies/`,
      {
        'name':vacancyName,
        'description': vacancyDescription,
        'salary':vacancySalary,
        'company':vacancyCompany,
      })
  }
  deleteVacancy(id:number):Observable<any>{
    return this.client.delete(`${this.BASE_URL}/api/vacancies/${id}/`);
  }
  updateVacancy(vacancyName:string, vacancyDescription:string, vacancySalary:number, vacancyCompany: number, vacancyID:number):Observable<Vacancy>{
    return this.client.put<Vacancy>(`${this.BASE_URL}/api/vacancies/${vacancyID}/`, {
      'name':vacancyName,
      'description': vacancyDescription,
      'salary':vacancySalary,
      'company':vacancyCompany,
    });
  }
}
