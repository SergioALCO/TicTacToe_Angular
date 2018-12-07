import { Component, OnInit } from '@angular/core';
import { StateService } from './../state.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  private _stateService: StateService;

  private _values: string[][] = [
  	['-','-','-'],
  	['-','-','-'],
  	['-','-','-']
  ];

  constructor(stateService: StateService) {
  	this._stateService = stateService;
  }

  _handleResetClick(){
  	console.log("Reset");
  	this._stateService.reset();
  }

  ngOnInit() {
  }

}
