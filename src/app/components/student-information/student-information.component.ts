import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiServiceService } from 'src/app/shared/api-service.service';

@Component({
  selector: 'app-student-information',
  templateUrl: './student-information.component.html',
  styleUrls: ['./student-information.component.css']
})
export class StudentInformationComponent implements OnInit {

  studentForm!: FormGroup;
  studentModel:any;
  studentDetails:any;
  showAddBtn:boolean=true;
  showUpdateBtn:boolean=false;


  constructor(private api: ApiServiceService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getAllStudentDetails();
    this.createStudentForm();
  }

  createStudentForm(){
    this.studentForm = this.fb.group({
      id:[''],
      name:[''],
      email:[''],
      phone:[''],
      address:[]
    });
  }

  getAllStudentDetails(){
    this.api.getAllStudent().subscribe(res=>{
      this.studentDetails = res;
    }, err=>{
      console.log(err);
      
    })
  }

  onAddClick(){
    this.showAddBtn=true;
    this.showUpdateBtn=false;
  }

  postStudentDetails(){
    this.studentModel = Object.assign({}, this.studentForm.value);

    this.api.postStudent(this.studentModel).subscribe(res=>{
      alert("Ուսանողի տեղեկատվությունը հաջողությամբ ավելացվեց");
      let close = document.getElementById('close');
      close?.click();
      this.studentForm.reset();
      this.getAllStudentDetails();
    }, err=>{
      alert("Error");
    })
  }

  deleteStudentDetail(id:any){
    this.api.deleteStudent(id).subscribe(res=>{
      alert("Ուսանողի տեղեկատվությունը հաջողությամբ ջնջվեց");
      this.getAllStudentDetails();
    }, err=>{
      alert("Չհաջողվեց ջնջել ուսանողի տվյալները");
    })
  }

  edit(stduent:any){

    this.showAddBtn=false;
    this.showUpdateBtn=true;
    this.studentForm.controls['id'].setValue(stduent.id);
    this.studentForm.controls['name'].setValue(stduent.name);
    this.studentForm.controls['email'].setValue(stduent.email);
    this.studentForm.controls['phone'].setValue(stduent.phone);
    this.studentForm.controls['address'].setValue(stduent.address);
  }

  updateStudentDetails(){
    this.studentModel = Object.assign({}, this.studentForm.value);

    this.api.updateStudent(this.studentModel, this.studentModel.id).subscribe(res=>{
      alert("Ուսանողների տվյալները հաջողությամբ թարմացվեցին");
      let close = document.getElementById('close');
      close?.click();
      this.getAllStudentDetails();
      this.studentForm.reset();
      this.studentModel={};
    }, err=>{
      alert("Սխալ՝ աշակերտի տեղեկատվությունը թարմացնելիս");
    })
  }

  reset(){
    this.studentForm.reset();
    this.studentModel={};
  }

}
