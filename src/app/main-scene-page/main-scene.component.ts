import { Component, EventEmitter, Output, Input, OnInit, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SelectionValueDialogComponent } from '../shared/selection-value-dialog/selection-value-dialog.component';
import { SpellsTypesEnum } from '../enums/SpellsTypes';
import { KeyCodesEnum } from '../enums/KeyCodes';
import { ScreenTypesEnum } from '../enums/ScreenTypes';
import {
  trigger,
  transition,
  animate,
  style,
  keyframes
} from '@angular/animations';
import { SoundService } from '../services/sound.service';

@Component({
  selector: 'main-scene',
  templateUrl: 'main-scene.component.html',
  styleUrls: ['main-scene.component.css'],
  animations: [
    trigger('kick-monster', [
      transition('void => *', [
        animate(
          5000,
          keyframes([
            style({ opacity: 1, transform: 'translateX(-500px)' }),
            style({ opacity: 1, transform: 'translateX(-250px)' }),
            style({ opacity: 0, transform: 'translateX(0px)' })
          ])
        )
      ])
    ]),
    trigger('kick-player', [
      transition('void => *', [
        animate(
          5000,
          keyframes([
            style({ opacity: 1, transform: 'translateX(500px)' }),
            style({ opacity: 1, transform: 'translateX(250px)' }),
            style({ opacity: 0, transform: 'translateX(0px)' })
          ])
        )
      ])
    ])
  ]
})
export class MainScenePageComponent implements OnInit {
  @Output() public onCloseSpellDialog: EventEmitter<SpellsTypesEnum> = new EventEmitter<SpellsTypesEnum>();
  @Input() public activePage: string;
  @Input() public playerHealth: number;
  @Input() public monsterHealth: number;
  @Input() public playerName: string;
  @Input() public kickPlayer: boolean;
  @Input() public kickMonster: boolean;
  @Input() public monsterName: string;
  @Input() public level: number;
  @Input() public activeMonsterPict: string;
  public screens = [
    {
      value: ScreenTypesEnum.Red,
      viewValue: 'Red Mountains',
      pathToImg: '/assets/img/red_mountains_img.png',
    },
    {
      value: ScreenTypesEnum.Mushroom,
      viewValue: 'Mushroom Field',
      pathToImg: '/assets/img/mushroom_field_img.png'
    },
    {
      value: ScreenTypesEnum.Blue,
      viewValue: 'Blue Lake',
      pathToImg:  '/assets/img/blue_lake_img.png'
    }
  ];
  public spells = [
    {
      value: SpellsTypesEnum.FireBall,
      viewValue: 'Fire ball',
    },
    {
      value: SpellsTypesEnum.FuriousWind,
      viewValue: 'Furious Wind',
    }
  ];

  public ngOnInit(): void {
    if (this.kickMonster || this.kickPlayer) {
      this.soundService.playSound();
    }
  }

  public constructor(
    public dialog: MatDialog,
    private soundService: SoundService
  ) {}

  public openDialog(): void {
    const dialogRef = this.dialog.open(SelectionValueDialogComponent, {
      data: this.spells
    });

    dialogRef.afterClosed().subscribe(result => {
      this.onCloseSpellDialog.emit(result);
    });
  }

  @HostListener('window:keydown', ['$event'])
  public keyboardInput(event: KeyboardEvent): void {
    if (event.keyCode === KeyCodesEnum.Ctrl) {
       this.openMenuDialog();
    }
  }

  public openMenuDialog(): void {
    const dialogRef = this.dialog.open(SelectionValueDialogComponent, {data: this.screens});
    dialogRef.afterClosed().subscribe(result => {
    document.body.style.backgroundImage = `url('${this.screens[result].pathToImg}')`;
  });
}

}
