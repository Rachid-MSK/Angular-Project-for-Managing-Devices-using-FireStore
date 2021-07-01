import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppareilService {

  appareilSubject = new Subject<any[]>();

  private appareils= [];
  emitAppareilSubject(){
    this.appareilSubject.next(this.appareils.slice());
  }
  getAppareilById(id: number){
    const appareil = this.appareils.find(
      (appareilObject) => {
        return appareilObject.id === id;
      }
      )
      return appareil;
  }

  constructor(private httpClent: HttpClient) { }

  switchOnAll(){
    for(let appareil of this.appareils){
      appareil.status = 'Allumé'    
    }
    return this.emitAppareilSubject();
  }
  switchOffAll(){
    for(let appareil of this.appareils){
      appareil.status = 'Eteint'
    }
    return this.emitAppareilSubject();
  }
  switchOnOne(index: number){
    this.appareils[index].status= 'Allumé';
    return this.emitAppareilSubject();
  }
  switchOffOne(index: number){
    this.appareils[index].status= 'Eteint';
    return this.emitAppareilSubject();
  }
  addAppareil(name: string, status: string){
    const appareilObject = {
      id: 0,
      name: '',
      status: ''
    };
    appareilObject.name = name;
    appareilObject.status = status;
    appareilObject.id = this.appareils[(this.appareils.length-1)].id+1;
    this.appareils.push(appareilObject);
    this.emitAppareilSubject();
  }
  saveAppareilsToServer(){
    this.httpClent.put('https://http-client-demo-4c4c4-default-rtdb.firebaseio.com/appareils.json', this.appareils)
    .subscribe(
      () => {
        console.log("Enregistrement términé!")
      },
      (error) => {
        console.log("Erreur de sauvegarde" + error)
      }
    )
  }
  getAppareilsFromServer(){
    this.httpClent.get<any[]>('https://http-client-demo-4c4c4-default-rtdb.firebaseio.com/appareils.json')
    .subscribe(
      (response) => {
        this.appareils = response;
        this.emitAppareilSubject();
      },
      (error) => {
        console.log('Erreur de Chargement!' + error);
      }
    )
  }
}
