import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss'],
})
export class RateComponent {
  @Input() rate: number;
  @Output() rateEvent: EventEmitter<number> = new EventEmitter();
  constructor() { }

  onRateEvent(rate: number, event?: MouseEvent) {
    if (!!event) 
      rate += event.offsetX < 12 ? 0.5 : 1;
    
    this.rateEvent.emit(rate);
  }

  starNames(rate: number): string[] {
    const starNames = ['star', 'star', 'star', 'star', 'star'];

    for (let i = 5; i > Math.ceil(rate); i--) {
      starNames[i - 1] += '-outline';
    }

    if (rate - Math.trunc(rate) == 0.5) {
      starNames[Math.trunc(rate)] += '-half-outline';
    }

    return starNames;
  }
}
