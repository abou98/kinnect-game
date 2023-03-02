import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {
  number_1: number = 0;
  number_2: number = 0
  seconds: number = 0
  result: any;
  responseInput = new FormControl();
  start: number = 0;
  arrayTimer: Array<number> = [];
  showToast = false;
  errorMessage: string = '';


  constructor(){
    this.responseInput.valueChanges.subscribe(response =>{
      this.result = response;
      this.checkResult()
    })
  }

  ngOnInit(){
    this.getRandomNumber()
  }

  getRandomNumber(){
    this.number_1 = Math.floor(Math.random() * 9);
    this.number_2 = Math.floor(Math.random() * 9);
    this.start = Date.now();
  }


  getElapsedTime(start: number){
   return (Date.now()  - start) / 1000;
  }

  checkResult(){
    console.log(this.result)
    if(!this.result || isNaN(this.result)){
        this.errorMessage = 'Please type un number !';
        this.showToast = true;
      return;
    }
    if(this.number_1 + this.number_2 == this.result){
      this.arrayTimer.push(this.getElapsedTime(this.start))
      this.seconds = Math.round(this.arrayTimer.reduce((a, b) => a + b, 0) / this.arrayTimer.length)
      this.getRandomNumber();
       this.responseInput.setValue(null);
       this.showToast = false;
    }else{
      this.showToast = true;
      this.errorMessage = 'Wrong! Try again'
    }

  }
}
