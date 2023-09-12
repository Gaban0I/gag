import { Component, Input, OnInit } from '@angular/core';
import { Error } from 'src/app/models/error';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {
  @Input() errorType: string | undefined;

  status!: number;
  message!: string;
  type!: string;
  class_container!: string;
  class_message!: string;
  class_background!: string;
  background_img!: string;

  error_traitement: Error = new Error();

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // console.log(this.errorType);

    this.route.queryParams.subscribe((params) => {
      this.error_traitement.setError(params['status'] || 404);

      this.message = this.error_traitement.message;
      this.type = this.error_traitement.errorType;
      this.class_container = this.error_traitement.class_container;
      this.class_background = this.error_traitement.class_background;
      this.background_img = this.error_traitement.background_img;
      this.class_message = this.error_traitement.class_message;
    });

    // console.log(this.class_container);
    // console.log(this.class_message);

    // console.log(this.message);
    // console.log(this.error_traitement.message);
  }
}
