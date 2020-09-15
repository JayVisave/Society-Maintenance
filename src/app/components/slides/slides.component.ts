import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss'],
})
export class SlidesComponent implements OnInit {

  slideOpts = {
    speed:200
  };


  constructor(private router: Router) { 
    
  }

  navigate(){
    this.router.navigate(['/login'])
  }

  ngOnInit() {}

}
