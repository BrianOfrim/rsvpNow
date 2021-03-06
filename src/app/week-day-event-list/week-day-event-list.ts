import {Component,OnInit, Input, Output,EventEmitter} from '@angular/core';
import { IReservation2, Reservation2 } from '../core/reservation2/reservation2';
import {Observable} from 'rxjs/Rx';
import {Authentication} from '../authentication/authentication';

@Component({
  selector: 'week-day-event-list',
  providers: [],
  directives: [],
  templateUrl: "app/week-day-event-list/week-day-event-list.html",
  styleUrls: ["app/week-day-event-list/week-day-event-list.css"],
  pipes: []
})

export class WeekDayEventList{
    @Input() events: any[]; 
    @Input() startOfDay: number;
    @Output() update: EventEmitter<any> = new EventEmitter(false);
    @Output() remove: EventEmitter<any> = new EventEmitter(false);

    todaysEvents:Observable<any>;
    constructor(private auth: Authentication){}
    
    ngOnInit(){}

    eventBelongsToCurrentUser(event: any): boolean{
        console.log(event.ownerUID)
        console.log(this.auth.authState.uid)
        if(this.auth.authState.uid== '') return false
        if(event.ownerUID == this.auth.authState.uid){
            return true;
        }else{
            return false;
        }
    }

    
    compare(a,b) {
        if (a.start < b.start)
            return -1;
        if (a.start > b.start)
            return 1;
        return 0;
    }

    getStartTime(event){
        return new Date(event.start);
    }

}