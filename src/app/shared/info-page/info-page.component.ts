import { Component, Input } from '@angular/core';

@Component({
  selector: 'info-page',
  templateUrl: 'info-page.component.html',
  styleUrls: ['info-page.component.css'],
})
export class InfoPageComponent {
  @Input() public infoText: string;

}
