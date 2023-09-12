import { Component, OnInit } from '@angular/core';
import { UserData } from 'src/app/models/interface';
import { TokenService } from 'src/app/models/tokenService';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  userData: UserData | null;
  constructor(private tokenService: TokenService) {
    this.userData = tokenService.getUserData();
  }

  email!: string;
  family_name!: string;
  first_name!: string;
  user_icon!: string;
  auditId!: string;

  ngOnInit(): void {
    // console.log('userData dans userInfo ? ' + this.userData);
    if (this.userData) {
      this.email = this.userData.email;
      this.family_name = this.userData.family_name;
      this.first_name = this.userData.given_name;
      this.auditId = this.userData.auditId;
      this.user_icon = '../../../../assets/images/default-user-icon.jpg';
    }
  }
}
