import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

interface Results {
  email: string;
  level: number;
}

@Component({
  selector: 'result-page',
  templateUrl: 'result-page.component.html',
  styleUrls: ['result-page.component.css']
})
export class ResultPagePageComponent implements OnInit {
  @Output() public onPlayAgain = new EventEmitter();
  @Output() public loadLandingPage = new EventEmitter();
  @Input() public level: number;
  @Input() public lastLevel: number;
  @Input() public passedLevel: number;

  public winersCollection: AngularFirestoreCollection<Results>;
  public winers: Observable<Results[]>; 
  public congratulationMessage: string; 
  
  constructor( private afs: AngularFirestore) {};

  public ngOnInit(): void {
    this.winersCollection = this.afs.collection('results', ref => ref.orderBy('level', 'desc').limit(3));
    this.winers = this.winersCollection.valueChanges();
    console.log(this.winersCollection, this.winers);
    if (this.level === this.lastLevel) {
      this.congratulationMessage =
        'Congratulations! You have passed last level!';
    } else {
      this.congratulationMessage =
        `Congratulations! You have passed level '${this.passedLevel}'`;
    }
  }

  public playAgain(): void {
    this.onPlayAgain.emit();
  }

  public gotoLandingPage(): void {
    this.loadLandingPage.emit();
  }
}
