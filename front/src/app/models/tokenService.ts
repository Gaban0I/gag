import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { IdPayload, Token, UserData } from './interface';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private router: Router) {}
  private idPayload: IdPayload | null = null;
  private userData: UserData | null = null;

  parseToken(token: Token) {
    localStorage.setItem('id_token', token.id_token);
    localStorage.setItem('access_token', token.access_token);
    localStorage.setItem('user_data', JSON.stringify(token.user_data));
    this.updateTokenData('id_token');
    this.updateTokenData('user_data');
    // console.log(this.idPayload);
    console.log(this.userData);
  }

  getIdPayload(): IdPayload {
    this.updateTokenData('id_token');
    return this.idPayload || ({} as IdPayload);
  }
  getUserData(): UserData {
    this.updateTokenData('user_data');
    return this.userData || ({} as UserData);
  }

  private updateTokenData(type: string) {
    const storedIdToken: string | null = localStorage.getItem('id_token');
    const storedType: string | null = localStorage.getItem(type);
    if (storedIdToken) {
      const idToken = jwt_decode(storedIdToken) as IdPayload;
      if (this.checkExpiration(idToken.exp)) {
        if (type == 'user_data') {
          if (storedType != null) {
            this.userData = JSON.parse(storedType);
            console.log(this.userData);
          } else console.log('pas de UserData enregistré');
        } else {
          this.idPayload = idToken;
          console.log(
            'storedIdToken : ' +
              storedIdToken +
              '\n\nidPayload : ' +
              JSON.stringify(this.idPayload)
          );
        }
      } else {
        this.idPayload = null;
        this.userData = null;
        this.router.navigate(['/gag/loader']);
      }
    } else {
      console.log('pas de token enregistré');
    }
  }

  private checkExpiration(timestamp: number) {
    if (Date.now() / 1000 > timestamp) return false;
    else return true;
  }
}
