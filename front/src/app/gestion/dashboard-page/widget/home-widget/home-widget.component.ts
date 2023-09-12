import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-widget',
  templateUrl: './home-widget.component.html',
  styleUrls: ['./home-widget.component.scss'],
})
export class HomeWidgetComponent implements OnInit {
  document!: string;
  ngOnInit(): void {
    this.document = 'charte.pdf';
  }
}
