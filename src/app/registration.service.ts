import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserForm } from './models/user-form.model';

interface FormRegistrationResponse {
  occupations: string[];
  states: {
    name: string;
    abbreviation: string;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {


  constructor(private http: HttpClient) { }

  getFormRegistrationInfo(): Observable<FormRegistrationResponse> {
    return this.http.get<FormRegistrationResponse>('https://frontend-take-home.fetchrewards.com/form');
  }

  saveRegistrationInfo(info: UserForm): void {
    this.http.post('https://frontend-take-home.fetchrewards.com/form', info);
  }
}
