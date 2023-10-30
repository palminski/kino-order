import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-log-in-form',
  templateUrl: './log-in-form.component.html',
  styleUrls: ['./log-in-form.component.css']
})
export class LogInFormComponent implements OnInit {
  LogInForm!: FormGroup;

  private serverRoot: String = "http://localhost:3000";

  constructor(private fb: FormBuilder, private http: HttpClient, private authService: AuthService) { };

  ngOnInit(): void {
    this.LogInForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  onSubmit(): void {
    if (this.LogInForm.valid) {
      console.log(this.LogInForm.value);
      this.http.post(`${this.serverRoot}/database/login-user`, this.LogInForm.value)
        .subscribe({
          next: (response: any) => {
            console.log("Success! => ", response);
            const token = response.token;
            if (token) {
              this.authService.login(token);
            }
            else {
              console.error("A token was not provided in the response!");
            }

          },
          error: (error) => {
            console.error('Error logging in user! => ', error)
          }
        });

      this.LogInForm.reset();
    }
  }
}
