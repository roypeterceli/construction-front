import { Component, input, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgClass } from '@angular/common';

@Component({
  selector: 'wow-label',
  imports: [MatIconModule, NgClass],
  templateUrl: './label.component.html',
  styleUrl: './label.component.scss'
})
export class WowLabel implements OnInit {

  icon = input<string | undefined>();
  iconOptions = input<{style?: 'outlined' | 'filled'}>({style: 'filled'});
  hint = input<string | undefined>();
  size = input<'sm' | 'md' | 'lg' | 'xl'>('md');

  style: string | undefined
  lineHeight: string | undefined

  ngOnInit(): void {
    switch (this.size()) {
      case 'sm':
        this.style = 'text-xs'
        this.lineHeight = 'leading-3'
        break;
      case 'lg':
        this.style = 'text-lg'
        this.lineHeight = 'leading-3'
        break;
      case 'xl':
        this.style = 'text-xl font-medium'
        this.lineHeight = 'leading-4'
        break
      default:
        this.style = 'text-sm'
        this.lineHeight = 'leading-3'
    }
  }


}
