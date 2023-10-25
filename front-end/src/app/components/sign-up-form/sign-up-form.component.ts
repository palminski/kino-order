import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent implements OnInit {
  SignUpForm!: FormGroup;

  private serverRoot: String = "http://localhost:3000";

  constructor(private fb: FormBuilder, private http: HttpClient) {};

  ngOnInit(): void {
    this.SignUpForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  onSubmit(): void {
    if (this.SignUpForm.valid) {
      console.log(this.SignUpForm.value);
      this.http.post(`${this.serverRoot}/database/add-user`,this.SignUpForm.value)
      .subscribe({
          next: (response) => {
            console.log("Success! => ", response);
          },
          error: (error) => {
            console.error('Error registering user! => ', error)
          }
        });

      this.SignUpForm.reset();
    }
  }


}
