import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AppareilService } from '../services/appareil.service';

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit {
  appareils: any[];
  appareilSubscription: Subscription
  isAuth= false
  lastUpdate= new Promise(
    (res, rej) => {
      const date = new Date()
      setTimeout(() => {
        res(date)
      }, 2000);
    }
  )


  constructor(private appareilService: AppareilService){
    console.log('my constructor')
    setTimeout(
      () => {this.isAuth= true}, 4000
    )
  }
  ngOnInit(){
    this.appareilSubscription = this.appareilService.appareilSubject.subscribe(
      (appareils:any[]) => {
        this.appareils = appareils;
      }
    )
    this.appareilService.emitAppareilSubject();
  }
  onAllumer(){
    console.log("on allume tout");
    this.appareilService.switchOnAll();
  }
  onEtteindre(){
    this.appareilService.switchOffAll();
  }
  onSave(){
    this.appareilService.saveAppareilsToServer();
  }
  onFetch(){
    this.appareilService.getAppareilsFromServer();
  }

}
