import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent implements OnInit {
  SignUpForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.SignUpForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    })
  }

  onSubmit(): void {
    if (this.SignUpForm.valid) {
      console.log(this.SignUpForm.value);
      this.SignUpForm.reset();
    }
  }
}
