import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{

  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
   };

  ngOnInit(): void {
    
  }

  logOut() {
    this.authService.logout();
  }
}
