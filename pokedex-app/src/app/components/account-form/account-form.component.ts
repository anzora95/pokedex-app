import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css']
})
export class AccountFormComponent implements OnInit{
  
  isMinor: boolean = false;
  maxDate: Date = new Date;
  form!: FormGroup;
  isFetching: boolean = false;
  defaultImageUrl: string = "../../../assets/icons/default_avatar.png";
  profileIcon!: string | ArrayBuffer;
  profileIconName: string = "Adjunta una foto";

  constructor(private fb: FormBuilder) {}

  ngOnInit() {

    this.initializeForm();
  }
  
  private initializeForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      hobbies: [''],
      birthday: [null, Validators.required],
      dui: [null,],
      minors_id: [null]
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.profileIconName = file.name;
      this.previewImage(file);
    }
  }

  private previewImage(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.profileIcon = reader.result;
    };
    reader.readAsDataURL(file);
    
  }

  onSubmit(){
    console.log("formulario enviado");
  }

}
