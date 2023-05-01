import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../shared/student.model';
import { StudentService } from '../shared/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  Gender=["Male","Female","Trans","Others"]
  studentForm! : FormGroup;
  showModal:boolean = false;
  editMode:boolean = false;

  students?: Student[];
  selectedStudent?: Student;

  constructor(
    private fb: FormBuilder,
    private _empService:StudentService) { }

  ngOnInit(): void {
    this.getStudents();

    this.studentForm = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      gender: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required]
    })
  }

  getStudents(){
    this._empService.getStudentList().subscribe(
      (res) => {
        console.log(res);
        this.students = res as Student[];
      },
      (err) => {
        console.log(err);
      }
    )
  }

  onEmpSubmit(){
    if(this.studentForm?.valid){
      console.log(this.studentForm.value);
      
      if(this.editMode){
        this._empService.putStudent(this.studentForm.value).subscribe(
          (res) => {
            console.log('Updated successfully');
            this.getStudents();
            this.editMode = false;
          },
          (err) => {
            console.log(err);
          },
        );
      }else{
        this._empService.postStudent(this.studentForm.value).subscribe(
          (res) => {
            console.log('Saved successfully');
            this.getStudents();
          },
          (err) => {
            console.log(err);
          },
        );
      }
       
      this.studentForm.reset();
      this.onCloseModal();

    }else{

      let key = Object.keys(this.studentForm?.controls || []);
      // console.log(key);

      key.filter(data =>{
        // console.log(data);
        let control = this.studentForm?.controls[data];
        // console.log(control);
        if(control?.errors !=null){
          control?.markAsTouched();
        }
      })
    }
  }

  onEditStudent(emp:Student){
    this.editMode = true;

    console.log(emp);
    this.showModal = true;
    this.selectedStudent = emp;
    console.log(this.selectedStudent);
    this.studentForm?.patchValue(this.selectedStudent);
  }

  onDeleteStudent(id:any){
    if(confirm('Do you want to delete this student?')){
      // console.log(id);
      this._empService.deleteStudent(id).subscribe(
        (res) => {
          console.log('Delete successfully');
          this.getStudents();
        },
        (err) => {
          console.log(err);
        },
      );
    }
  }

  onAddStudent(){
    this.showModal = true;
  }

  onCloseModal(){
    this.showModal = false;
  }


}
