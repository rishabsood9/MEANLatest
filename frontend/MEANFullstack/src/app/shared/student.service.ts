import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from './student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  readonly baseURL = 'http://localhost:3000/students';

  constructor(private http: HttpClient) { }

  postStudent(emp: Student) {
    return this.http.post(this.baseURL, emp);
  }

  getStudentList() {
    return this.http.get(this.baseURL);
  }

  putStudent(emp: Student) {
    return this.http.put(this.baseURL + `/${emp._id}`, emp);
  }

  deleteStudent(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
}
