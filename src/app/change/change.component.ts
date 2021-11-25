import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.css']
})
export class ChangeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  private userInput:string = ''

  @Output() 
  private cgEvent = new EventEmitter()

  doChange(){ 
    console.log(this.userInput);
    this.cgEvent.emit(this.userInput)
    this.userInput = ''
  }
}
