import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../models/tokenService';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  constructor(
    private tokenService: TokenService,
    private router: Router,
    private oidcSecurityService: OidcSecurityService
  ) {}

  ngOnInit(): void {
    this.oidcSecurityService
      .checkAuth()
      .subscribe(({ isAuthenticated, accessToken, idToken, userData }) => {
        if (!isAuthenticated) {
          this.oidcSecurityService.authorize();
          console.log('connexion');
        } else {
          const token = {
            access_token: accessToken,
            id_token: idToken,
            user_data: userData,
          };
          if (this.tokenService.parseToken(token) === null)
            this.router.navigate(['/gag/error'], {
              queryParams: { status: 401 },
            });
          else {
            this.router.navigate(['/gag/dashboard']);
            console.log('connecté !');
          }
        }
      });
  }
}
