import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PlayerCredentialsModel } from '../models/PlayerCredentials.model';

@Component({
    selector: 'landing-page',
    templateUrl: 'landing-page.component.html',
    styleUrls: ['landing-page.component.css']
})
export class LandingPageComponent {
    @Output() public onStartGame: EventEmitter<PlayerCredentialsModel> = new EventEmitter<PlayerCredentialsModel>();
    @Input() public playerName: string;
    @Input() public playerEmail: string;
    public enteredName: string;
    public enteredEmail: string;
    public PlayerCredentialsModel: PlayerCredentialsModel;

    public startGame(): void {
        this.PlayerCredentialsModel = new PlayerCredentialsModel(this.enteredName, this.enteredEmail);
        this.onStartGame.emit(this.PlayerCredentialsModel);
    }
}
