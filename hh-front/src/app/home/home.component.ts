import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Company} from '../models'
import {CompaniesService} from "../companies.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  companies: Company[] = [];
  newCompanyName: string = '';
  newCompanyDescription: string = '';
  newCompanyCity: string = '';
  newCompanyAddress: string = '';
  newCompanyID:number = 0;
  constructor(private companyService: CompaniesService) {
  }

  onSelectedId(id: number){
    this.companyService.setId(id);
  }

  ngOnInit() {
    this.companyService.getCompanies().subscribe((companies)=>{
      this.companies = companies;
    })
  }
  delete(id: number){
    return this.companyService.deleteCompany(id).subscribe(data =>{
      this.companies = this.companies.filter(company => company.id !== id)
    });
  }
  addCompany(){
    if(this.newCompanyID != 0){
      this.updateCompany(this.newCompanyName, this.newCompanyAddress, this.newCompanyCity, this.newCompanyDescription, this.newCompanyID);
    }
    else{
      if(this.newCompanyName.length && this.newCompanyCity.length &&
        this.newCompanyDescription.length && this.newCompanyAddress) {
        this.companyService.createCompany(this.newCompanyName, this.newCompanyAddress, this.newCompanyCity, this.newCompanyDescription).subscribe((company) => {
          this.companies.push(company);
          this.newCompanyName = '';
          this.newCompanyDescription = '';
          this.newCompanyCity = '';
          this.newCompanyAddress = '';
        });
    }
    }
  }
  updateCompany(companyName:string, companyAddress:string, companyCity:string, companyDescription:string, companyId: number){
    this.companyService.updateCompany(companyName, companyAddress, companyCity, companyDescription, companyId).subscribe((data)=>{
      for(let i of this.companies){
        if(i.id == companyId){
          let index = this.companies.indexOf(i);
          this.companies[index] = data;
          break;
        }
      }
      this.newCompanyName = '';
      this.newCompanyDescription = '';
      this.newCompanyCity = '';
      this.newCompanyAddress = '';
      this.newCompanyID = 0;
    });
  }
}
