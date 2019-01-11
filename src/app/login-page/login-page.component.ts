import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PlayerCredentialsModel } from '../models/PlayerCredentials.model';

@Component({
    selector: 'login-page',
    templateUrl: 'login-page.component.html',
    styleUrls: ['login-page.component.css']
})
export class LoginPageComponent {
    @Output() public onGoGame: EventEmitter<PlayerCredentialsModel> = new EventEmitter<PlayerCredentialsModel>();
    @Input() public playerName: string;
    @Input() public playerEmail: string;
    public enteredName: string;
    public enteredEmail: string;
    public PlayerCredentialsModel: PlayerCredentialsModel;

    public goGame(): void {
        this.PlayerCredentialsModel = new PlayerCredentialsModel(this.enteredName, this.enteredEmail);
        this.onGoGame.emit(this.PlayerCredentialsModel);
    }
}
