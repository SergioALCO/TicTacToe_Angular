import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface State {
    turn: string,
    values: string[][]
}

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private _state$: BehaviorSubject<State>;
  private _cont:number;
  private _isWinner:boolean;

  constructor() { 
  	this._cont = 0;
  	this._isWinner = false;
  	let initialState = {
	    turn: 'PLAYERX',
	    values: [
	      ['-','-','-'],
	      ['-','-','-'],
	      ['-','-','-']
	    ]
	  };

	  this._state$ = new BehaviorSubject(initialState);
  }

  get state$ (): BehaviorSubject<State> {
    return this._state$; 
  }

  get state (): State {
    return this._state$.getValue();
  }

  set state (state: State) {
    this._state$.next(state);
  }

  get cont (): number {
  	return this._cont;
  }

  get isWinner (): boolean {
  	return this._isWinner;
  }

  updateValue(row, col) {
    if(this.state.values[row][col] === '-') {
      let newValue = this.state.turn === 'PLAYERX' ? 'X' : '0';
      let newTurn = this.state.turn === 'PLAYERX' ? 'PLAYER0' : 'PLAYERX';
      this.state.values[row][col] = newValue;
      this.state.turn = newTurn;
      this._cont = this._cont + 1;
      console.log("_cont:", this.cont);
      this.checkWinnerGame(newValue);      
      this._state$.next(this.state);      
    }
  }

  checkWinnerGame(newValue){
  	let horizonal = 0;
  	let vertical = 0;
  	let diagonal = 0;

  	for(var i=0;i<3;i++){
  		if(this.state.values[i][0] === newValue)
			horizonal = horizonal + 1;
		if(this.state.values[i][1] === newValue)
			horizonal = horizonal + 1;
		if(this.state.values[i][2] === newValue)
			horizonal = horizonal + 1;

		if(horizonal === 3)
			break;
		else
			horizonal = 0;
  	}

  	for(var j=0;j<3;j++){
  		if(this.state.values[0][j] === newValue)
			vertical = vertical + 1;
		if(this.state.values[1][j] === newValue)
			vertical = vertical + 1;
		if(this.state.values[2][j] === newValue)
			vertical = vertical + 1;

		if(vertical === 3)
			break;
		else
			vertical = 0;
  	}

  	if(this.state.values[0][0] === newValue && this.state.values[1][1] === newValue && this.state.values[2][2] === newValue)  		
  		diagonal = 3;

  	if(this.state.values[2][0] === newValue && this.state.values[1][1] === newValue && this.state.values[0][2] === newValue)  		
  		diagonal = 3;

	if(horizonal == 3 || vertical == 3 || diagonal == 3) 
		this._isWinner = true;	
  }



  reset() {
    this.state = {
      turn: 'PLAYERX',
      values: [
        ['-','-','-'],
        ['-','-','-'],
        ['-','-','-']
      ]
    };
    this._cont = 0;
    this._isWinner = false;
  }
  		

}
