import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from 'src/app/models/interface';
import { TokenService } from '../../models/tokenService';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  userData: UserData;
  constructor(private router: Router, private tokenService: TokenService) {
    this.userData = tokenService.getUserData();
  }
  canActivate(): boolean {
    if (this.canAccess()) {
      return true;
    } else {
      this.router.navigate(['/gag/error'], { queryParams: { status: 401 } });
      return false;
      // console.log(this.error);
    }
  }
  canAccess(): boolean {
    if (Object.keys(this.userData).length === 0) {
      this.router.navigate(['/gag/loader']);
      return false;
    } else if (this.userData.droit_gag.length > 0) {
      return true;
    }
    return false;
  }
}
