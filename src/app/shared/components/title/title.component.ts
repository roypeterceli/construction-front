import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'wow-title',
  imports: [MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss'
})
export class WowTitle {
  url = input<string[] | null | undefined>();

}
