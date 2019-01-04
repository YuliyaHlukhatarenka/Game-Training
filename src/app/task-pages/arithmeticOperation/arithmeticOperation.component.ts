import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TaskResultModel } from '../../models/TaskResult.model';
import { RandomService } from '../../services/random.service';

@Component({
  selector: 'arithmetic-operation',
  templateUrl: 'arithmeticOperation.component.html',
})
export class ArithmeticOperationDialogComponent implements OnInit {
  @Output() public onArithmeticOperationResult: EventEmitter<boolean> = new EventEmitter<boolean>();
  public exercise: string;
  public enteredResult: string;
  public resultMessage: string;
  public resultValue: number;
  public damage = 10;
  private generatedExercise: TaskResultModel;
  private operation: string[] = ['+', '-', '*'];

  public constructor(private randomService: RandomService) {}

  public ngOnInit(): void {
    this.generatedExercise = this.createTaskString();
    this.exercise = this.generatedExercise.returnString;
  }

  public checkResult(): void {
    const result = +this.enteredResult === this.generatedExercise.reurnNum;
    result
      ? (this.resultMessage = 'Correct!')
      : (this.resultMessage = 'Mistake :(');

    this.resultValue = this.generatedExercise.reurnNum;
    this.onArithmeticOperationResult.emit(result);
  }

  private getRandomOperation(): string {
    return this.operation[this.randomService.getRandomNumber(this.operation.length)];
  }

  private createTaskString(): TaskResultModel {
    let resultNum: number;
    let resultString: string;
    const param1: number = this.randomService.getRandomNumber(100);
    const param2: number = this.randomService.getRandomNumber(100);
    const operation = this.getRandomOperation();

    if (operation === '+') {
      resultNum = param1 + param2;
      resultString = `${param1} + ${param2}`;
    } else if (operation === '*') {
      resultNum = param1 * param2;
      resultString = `${param1} x ${param2}`;
    } else if (operation === '-') {
      if (param1 >= param2) {
        resultNum = param1 - param2;
        resultString = `${param1} - ${param2}`;
      } else {
        resultNum = param2 - param1;
        resultString = `${param2} - ${param1}`;
      }
    }

    return new TaskResultModel(resultNum, resultString);
  }
}
