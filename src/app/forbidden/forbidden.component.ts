import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';


@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.css']
})
export class ForbiddenComponent {

 // This is the option that uses the package's AnimationOption interface  
 options: AnimationOptions = {    
  path: '/assets/img/notfound.json'  
};  



ngOnInit(): void {  }

// This is the component function that binds to the animationCreated event from the package  
onAnimate(animationItem: AnimationItem): void {    
  console.log(animationItem);  
}

  constructor() { }  

  
}
