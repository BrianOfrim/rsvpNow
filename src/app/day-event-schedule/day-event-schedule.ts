import {Component,OnInit, Input, Output,EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Rx';

import { IReservation2, Reservation2 } from '../core/reservation2/reservation2';
import {Authentication} from '../authentication/authentication';

@Component({
  selector: 'day-event-schedule',
  providers: [],
  directives: [],
  templateUrl: "app/day-event-schedule/day-event-schedule.html",
  styleUrls: ["app/day-event-schedule/day-event-schedule.css"],
  pipes: []
})

export class DayEventSchedule{
    @Input() events: any[]; 
    @Input() startOfDay: number;
    @Output() update: EventEmitter<any> = new EventEmitter(false);
    @Output() remove: EventEmitter<any> = new EventEmitter(false);

    hourIntervals: any[];
    constructor(private auth: Authentication){}
    ngOnInit(){
        // console.log('Events1')
        // console.log(this.events)
        this.hourIntervals = this.createIntervals(this.startOfDay)
        // this.events = this.events.sort(this.compare)
        // console.log('Events2')
        // console.log(this.events)

    }

    createIntervals(startOfDay:number){
        let returnArr =[]
        for(let i = 0; i < 24; i++){
            returnArr.push({
                startTime:(startOfDay + i*3600000),
                endTime:(startOfDay + (i+1)*3600000 - 1)
            });
        }
        console.log(returnArr);
        return returnArr
        
    }

    getHourEvents(hourInterval:any){
        return this.events.filter( event =>{
            return parseInt(event.start) >= hourInterval.startTime && parseInt(event.start) <= hourInterval.endTime;
        });
    }

    getMinutes(startVal:number){
        let date = new Date(startVal)
        let minutes = date.getMinutes()
        return ("0" + minutes).slice(-2);
    }
    
    getStartTime(startVal:number){
        return new Date(startVal)
    }

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
}