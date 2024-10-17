import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Trainer } from 'src/app/models/trainer';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css']
})
export class AccountFormComponent implements OnInit{
  
  isMinor: boolean = false;
  maxDate: Date = new Date;
  private editMode: boolean = false;
  form!: FormGroup;
  isFetching: boolean = false;
  defaultImageUrl: string = "../../../assets/icons/default_avatar.png";
  profileIcon!: string | ArrayBuffer;
  profileIconName: string = "Adjunta una foto";
  trainer: Trainer;

  constructor(private fb: FormBuilder, private router: Router) {}

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
    this.trainer = new Trainer(
      this.form.get('name').value,
      uuidv4(),
      this.profileIcon ? this.profileIcon as string : this.defaultImageUrl,
      this.form.get('hobbies').value,
      this.form.get('birthday').value,
      this.form.get('dui').value,
      this.form.get('minors_id').value,
      null,
    );

    console.log(this.trainer);


    // this.trainerService.storeTrainer(this.trainer);
    this.router.navigate(['/']);
  }

}
