import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  time = '';
  Destination = '2022-09-27T20:49:48';
  seconds = '00';
  // calculates the time interval and updates the timer
  private readonly update = () => {
    let period = Date.parse(this.Destination) - Date.now();
    if (period < 0) {
      clearInterval(this.timer);
      this.time = 'finished';
      return;
    }

    // calculates datetime
    const days = Math.floor(period / (1000 * 60 * 60 * 24));
    period -= days * 1000 * 60 * 60 * 24;

    const hours = Math.floor(period / (1000 * 60 * 60));
    period -= hours * 1000 * 60 * 60;

    const minutes = Math.floor(period / (1000 * 60));
    period -= minutes * 1000 * 60;

    this.seconds = pretty(Math.floor(period / 1000));

    function pretty(value: number) {
      return value.toString().padStart(2, '0');
    }

    this.time = `${days} days | ${pretty(hours)} hours | ${pretty(minutes)} minutes`;
  }

  private timer = setInterval(this.update, 1000);

  ngOnInit() {
    this.update();
  }

}
