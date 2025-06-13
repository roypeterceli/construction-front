import { Component, effect, input, OnDestroy, OnInit, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'wow-elapsed-time',
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './elapsed-time.component.html',
  styleUrl: './elapsed-time.component.scss'
})
export class WowElapsedTime implements OnDestroy {
  initTime = input.required<Date>();
  startTimer = input<boolean>(false);
  endTimer = output<boolean>();

  elapsedMinutes = signal('00');
  elapsedSeconds = signal('00');
  elapsedTime = signal('00:00');
  private isRunning = signal(false);

  private timer!: ReturnType<typeof setInterval>;

  constructor() {
    effect(() => {
      if (this.startTimer() && !this.isRunning()) {
        this.isRunning.set(true);
        this.startProcess();
      }
    });
  }

  finishProcess(): void {
    clearInterval(this.timer);
    this.elapsedMinutes.set('00');
    this.elapsedSeconds.set('00');
    this.elapsedTime.set('00:00');
    this.isRunning.set(false);
    this.endTimer.emit(true);
  }

  private startProcess(): void {
    this.updateElapsedTime();

    this.timer = setInterval(() => {
      this.updateElapsedTime();
    }, 1000);
  }

  private updateElapsedTime(): void {
    const nowUtc = Date.now();
    const initUtc = new Date(this.initTime()).getTime();

    const diffInSeconds = Math.floor((nowUtc - initUtc) / 1000);

    this.elapsedMinutes.set(String(Math.floor(diffInSeconds / 60)).padStart(2, '0'));
    this.elapsedSeconds.set(String(diffInSeconds % 60).padStart(2, '0'));
    this.elapsedTime.set(`${this.elapsedMinutes()}:${this.elapsedSeconds()}`);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

}
