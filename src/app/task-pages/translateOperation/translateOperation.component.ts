import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ReadJsonService } from '../../services/read-json.service';
import { RandomService } from '../../services/random.service';

@Component({
  selector: 'translate-operation',
  templateUrl: 'translateOperation.component.html',
})
export class TranslateOperationDialogComponent implements OnInit {
  @Output() public onTranslateOperationResult: EventEmitter<boolean> = new EventEmitter<boolean>();
  public dataFromJson: string;
  public generatedEnWord: string;
  public enteredResult: string;
  public generatedByWord: string;
  public resultMessage: string;
  public resultValue: string;

  public constructor(private readJsonService: ReadJsonService, private randomService: RandomService) {}

  public ngOnInit(): void {
    this.readJsonService.getJSON().subscribe(data => {
      this.dataFromJson = data[this.randomService.getRandomNumber(data.length)];
      this.generatedEnWord = this.dataFromJson.split(':')[0].trim();
      this.generatedByWord = this.dataFromJson.split(':')[1].trim();
    });
  }

  public checkResult(): void {
    const result = this.enteredResult === this.generatedByWord;
    result
      ? (this.resultMessage = 'Correct!')
      : (this.resultMessage = 'Mistake :(');

    this.resultValue = this.generatedByWord;
    this.onTranslateOperationResult.emit(result);
  }
}
