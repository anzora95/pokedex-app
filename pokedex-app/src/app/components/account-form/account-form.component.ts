import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Trainer } from 'src/app/models/trainer';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss']
})
export class AccountFormComponent implements OnInit {

  isMinor: boolean = false;
  maxDate: Date = new Date;
  private editMode: boolean = false;
  form!: FormGroup;
  isFetching: boolean = false;
  defaultImageUrl: string = "../../../assets/icons/default_avatar.png";
  profileIcon!: string | ArrayBuffer;
  profileIconName: string = "Adjunta una foto";
  trainer: Trainer;
  private birthDaySubscription: Subscription;

  hobbies: string[] = ['Jugar Fútbol', 'Leer', 'Cocinar', 'Nadar', 'Viajar'];
  selectedHobbies: string[] = [];

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {

    this.initializeForm();
    this.getBirthDaySubscription();
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      hobbies: [''],
      birthday: [null, Validators.required],
      dui: [null, [this.createDuiVerification()]],
      minors_id: [null]
    },{updateOn: 'change'});
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

  onSubmit() {
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

  private getBirthDaySubscription(): void {
    this.birthDaySubscription = this.form.get('birthday').valueChanges.subscribe((value) => {
      this.isMinor = this.calculateAge(value) < 18;
      if (this.isMinor) {
        this.form.patchValue({
          dui: null
        })
      } else {
        this.form.patchValue({
          minors_id: null
        })
      }
      this.updateDuiValidator();
    });
  }

  private calculateAge(birthday: Date): number {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  private updateDuiValidator() {
    const duiControl = this.form.get('dui');
    if (duiControl) {
      if (this.isMinor) {
        duiControl.clearValidators();
      } else {
        duiControl.setValidators([Validators.required, this.customDuiValidator]);
      }
      duiControl.updateValueAndValidity();
    }
  }

  private customDuiValidator() {
    return (control) => {
      const value = control.value;
      if (value) {
        const pattern = /^\d{8}-\d{1}$/;
        const isValid = pattern.test(value);
        return isValid ? null : { invalidDuiNumber: true };
      }
      return null;
    };
  }

  createDuiVerification() {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;
      const regex = /(^\d{8})-(\d$)/;
      const parts = value.match(regex);
      if (
        value === '00000000-0' ||
        value === '11111111-1' ||
        value == '22222222-2' ||
        value == '33333333-3' ||
        value == '44444444-4' ||
        value == '55555555-5' ||
        value == '66666666-6' ||
        value == '77777777-7' ||
        value == '88888888-8' ||
        value == '99999999-9'
      )
        return { isvalidDUI: true };
      if (parts !== null) {
        const digits = parts[1];
        const dig_ve = parseInt(parts[2], 10);
        let summary = 0;
        for (let i = 0, l = digits.length; i < l; i++) {
          let d = parseInt(digits[i], 10);
          summary += (9 - i) * d;
        }
        return dig_ve === (10 - (summary % 10)) % 10
          ? null
          : { isvalidDUI: true };
      } else {
        return {
          isvalidDUI: true
        };
      }
    }
  }

  removeHobby(hobby: string): void {
    const index = this.selectedHobbies.indexOf(hobby);
    if (index >= 0) {
      this.selectedHobbies.splice(index, 1);
    }
  }

}
