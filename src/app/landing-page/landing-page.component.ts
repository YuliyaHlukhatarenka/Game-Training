import { Component, EventEmitter, Output } from '@angular/core';
import { PlayerCredentialsModel } from '../models/PlayerCredentials.model';

@Component({
    selector: 'landing-page',
    templateUrl: 'landing-page.component.html',
    styleUrls: ['landing-page.component.css']
})
export class LandingPageComponent {
    @Output() public onStartGame: EventEmitter<PlayerCredentialsModel> = new EventEmitter<PlayerCredentialsModel>();
    public startGame(): void {
        this.onStartGame.emit();
    }
}
