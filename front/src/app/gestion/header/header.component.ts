import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public router: Router, private authGuard: AuthGuard) {}
  imageUrl!: string;

  btn: object[] = [
    {
      btnText: 'Tableaux de bord',
      btnId: 'Dashboard',
      btnNav: '/dashboard',
    },
    {
      btnText: 'Tableaux de bord',
      btnId: 'Tableaux de bord',
      btnNav: 'Tableaux de bord',
    },
  ];

  btn1Text!: string;
  btn1Id!: string;

  btn2Text!: string;
  btn2Id!: string;

  dashboardRight!: boolean;
  lotsRight!: boolean;

  ngOnInit() {
    this.imageUrl = '../../assets/images/cnp-assurances-logo-white.png';
    this.btn1Text = 'Tableaux de bord';
    this.btn1Id = 'Dashboard';

    this.btn2Text = 'Lots';
    this.btn2Id = 'Lots';

    if (this.authGuard.canAccess()) {
      this.dashboardRight = true;
      this.lotsRight = true;
    } else {
      this.dashboardRight = false;
      this.lotsRight = false;
    }
  }
}
