import {Component, Input, OnInit} from '@angular/core';
import {Vacancy} from "../models";
import {VacanciesService} from "../vacancies.service";
import {ActivatedRoute} from "@angular/router";
import {CompaniesService} from "../companies.service";

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit{
  vacancies: Vacancy[] = [];
  newVacancyName = '';
  newVacancySalary = 0;
  newVacancyDescription = '';
  newVacancyCompany = '';
  newVacancyID= 0;
  id: number = 0;
  constructor(private companyService: CompaniesService ,private vacancyService: VacanciesService, private route:ActivatedRoute) {
  }
  ngOnInit(){
    // this.companyService.selectedId$.subscribe((data) =>{
    //   this.id = data;
    // })
    if(this.id != 1){
      this.route.paramMap.subscribe(param =>{
        let _id = param.get('id');
        if(_id){
          this.id = +_id;
        }
      })
    }
    this.companyService.getCompany(this.id).subscribe((data) =>{
      this.newVacancyCompany = data.name;
    })
    this.getVacancies(this.id);
  }

  getVacancies(id: number){
    this.vacancyService.getVacancies(id).subscribe((vacancies)=>{
      this.vacancies = vacancies;
    })
  }
  createVacancy(){
    if(this.newVacancyID != 0){
      this.updateVacancy(this.newVacancyName, this.newVacancyDescription, this.newVacancySalary ,this.newVacancyID);
    }
    else{
      if(this.newVacancyName.length && this.newVacancySalary &&
        this.newVacancyDescription.length && this.newVacancyCompany.length) {
        this.vacancyService.createVacancy(this.newVacancyName, this.newVacancyDescription, this.newVacancySalary, this.id).subscribe(vacancy => {
          this.vacancies.push(vacancy);
          this.newVacancyName = '';
          this.newVacancySalary = 0;
          this.newVacancyDescription = '';
        });
      }
    }
  }
  updateVacancy(vacancyName:string, vacancyDescription:string, vacancySalary:number, vacancyID:number){
    this.vacancyService.updateVacancy(this.newVacancyName, this.newVacancyDescription, this.newVacancySalary , this.id, this.newVacancyID).subscribe((data)=>{
      for(let i of this.vacancies){
        if(i.id == vacancyID){
          let index = this.vacancies.indexOf(i);
          this.vacancies[index] = data;
          break;
        }
      }
      this.newVacancyID = 0;
      this.newVacancyName = '';
      this.newVacancySalary = 0;
      this.newVacancyDescription = '';
    });
  }
  onDelete(vacancy_id:number){
    this.vacancyService.deleteVacancy(vacancy_id).subscribe(data =>{
      this.vacancies = this.vacancies.filter(vacancy => vacancy.id !== vacancy_id);
    });
  }
}
