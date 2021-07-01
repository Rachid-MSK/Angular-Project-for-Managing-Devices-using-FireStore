import { AppareilService } from './../services/appareil.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-appareil',
  templateUrl: './appareil.component.html',
  styleUrls: ['./appareil.component.scss']
})
export class AppareilComponent implements OnInit {
  @Input() appareilName;
  @Input() appareilStatus: string;
  @Input() indexOfAppareil: number;
  @Input() id: number;

  constructor(private appareilService: AppareilService) { }

  ngOnInit(): void {
  }
  getStatus(){
    return this.appareilStatus;
  }
  getColor(){
    if(this.appareilStatus === 'Allumé'){
      return 'green';
    }
    else
    return 'red';
  }
  onSwitchOn(){
    this.appareilService.switchOnOne(this.indexOfAppareil);
  }
  onSwitchOff(){
    this.appareilService.switchOffOne(this.indexOfAppareil);
  }

}
