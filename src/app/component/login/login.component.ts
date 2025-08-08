import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/api.service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMsg = '';

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
  console.log('Usuario:', this.username);
  console.log('Contraseña:', this.password);
    if (this.auth.login(this.username, this.password)) {
      console.log("despues del if:",this.username)
        console.log("despues del if:",this.password)
      this.router.navigate(['/turno']);
      console.log("router:",this.router)
    } else {
      this.errorMsg = 'Usuario o contraseña incorrectos';
    }
  }
}
