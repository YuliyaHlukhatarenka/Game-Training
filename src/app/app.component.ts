import { Component, ViewChild } from '@angular/core';
import { SpellsTypesEnum } from './enums/SpellsTypes';
import { MainScenePageComponent } from './main-scene-page/main-scene.component';
import { Monster } from './logic/monster';
import { Player } from './logic/player';
import { PlayerCredentialsModel } from './models/PlayerCredentials.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { StoredUserModel } from './models/storedUser.model';

@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  @ViewChild('mainSceneComponent') public mainSceneComponent: MainScenePageComponent;
  public activePage = 'landing-page';
  public monster: Monster;
  public player: Player;
  public kickPlayer = false;
  public kickMonster = false;
  public maxLevel = 3;
  public currentLevel = 1;
  public passedLevel = 0;
  public damageAmount = 10;
  public monsterPowerIncreaseNextLevel = 10;
  public resultTableSize = 10;
  public top10String: string;
  public top10Array: StoredUserModel[] = [];
  public infoForUser = 'Best wishes!';
  public activeMonsterPict: string;
  private pathToPict = [
    '/assets/img/monster5.png',
    '/assets/img/monster3.png',
    '/assets/img/monster6.png'
  ];

 public constructor( private afs: AngularFirestore) {}

  public onStartGame(): void {
     this.activePage = 'login-page';
  }

  public onGoGame(PlayerCredentials: PlayerCredentialsModel): void {
    this.monster = new Monster();
    this.player = new Player(PlayerCredentials.name, PlayerCredentials.email);
    this.activeMonsterPict = this.pathToPict[0];
    this.passedLevel = 0;
    this.activePage = 'main-scene';
  }

  public onPlayAgain(): void {
    this.monster = new Monster();
    this.player.reloadLife(20);
    this.currentLevel = 1;
    this.passedLevel = 0;
    this.infoForUser = 'Try again! You will definitely be lucky!';
    this.activePage = 'info-page';
    setTimeout(() => {
      this.activePage = 'main-scene';
    }, 5000);
  }

  public loadLoginPage(): void {
    this.activePage = 'login-page';
  }

  public takeDamage(isCorrect: boolean): void {
    if (isCorrect) {
      this.monster.changeLife(-(this.damageAmount));
      this.kickMonster = true;
    } else {
      this.player.changeLife(-(this.damageAmount));
      this.kickPlayer = true;
    }

   this.loadFightAnimation();

    setTimeout(() => {
      this.resolveEndGame();
    }, 5000);
  }

  private resolveEndGame(): void {
    if (this.player.health === 0) {
      this.loadResultPage(this.passedLevel, this.player.email);
    }
    if (this.monster.health === 0) {
      this.passedLevel = this.passedLevel + 1;
      if (this.currentLevel === this.maxLevel) {
        this.loadResultPage(this.passedLevel, this.player.email);
      } else {
        this.loadNextLevel();
      }
    }
    this.kickMonster = false;
    this.kickPlayer = false;
  }

  private loadResultPage(level: number, playerEmail: string): void {
    this.afs.collection('results').add({email: `${playerEmail}`, level: +`${level}`});
    this.activePage = 'result-page';
    this.currentLevel = 1;
    this.activeMonsterPict = this.pathToPict[0];
  }

  private loadNextLevel(): void {
    this.currentLevel = this.currentLevel + 1;
    this.monster = new Monster();
    this.activeMonsterPict = this.pathToPict[this.passedLevel];
    this.monster.changeLife(this.monsterPowerIncreaseNextLevel * (this.currentLevel - 1));
    this.activePage = 'main-scene';
  }

  private loadFightAnimation(): void {
      this.activePage = 'main-scene';
  }

  public closeSpellDialogHandler(spell: SpellsTypesEnum): void {
    switch (spell) {
      case SpellsTypesEnum.FireBall:
        this.activePage = 'translate-operation';
        break;
      case SpellsTypesEnum.FuriousWind:
        this.activePage = 'arithmetic-operation';
        break;
      case SpellsTypesEnum.StoneRain:
        this.activePage = 'orthography-operation';
        break;
      default:
        this.activePage = 'main-scene';
        break;
    }
  }

  public get isNeedShowLandingPage(): boolean {
    return this.activePage === 'landing-page';
  }

  public get isNeedShowLoginPage(): boolean {
    return this.activePage === 'login-page';
  }

  public get isNeedShowInfoPage(): boolean {
    return this.activePage === 'info-page';
  }

  public get isNeedShowMainScene(): boolean {
    return this.activePage === 'main-scene';
  }

  public get isNeedShowResultPage(): boolean {
    return this.activePage === 'result-page';
  }

  public get isArithmeticOperationActive(): boolean {
    return this.activePage === 'arithmetic-operation';
  }

  public get isTranslateOperationActive(): boolean {
    return this.activePage === 'translate-operation';
  }
}
