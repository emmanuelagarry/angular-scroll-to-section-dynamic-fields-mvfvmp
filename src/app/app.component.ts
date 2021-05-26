import {
  Component,
  VERSION,
  ViewChild,
  ViewChildren,
  ElementRef,
  HostListener,
  QueryList, AfterContentInit
} from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
import {  merge, of, Subject, combineLatest } from 'rxjs';
import {  distinctUntilChanged, filter, map, publishReplay, refCount, startWith, switchMap, tap } from 'rxjs/operators';
import { AppService } from './app.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentInit {
  constructor(private route: ActivatedRoute, private appService: AppService) {    
  }


   name = 'Angular ' + VERSION.major;

 
  stats$ =  of({
    proposal: 'Proposal1',
    summary: 'Proposal Summary',
    comments: 'Comment Test',
    internalComments: 'Internal Comment Test',
    factorList: [
      {
        factorName: 'f1',
        factorDescription: 'factorDes 1 Test'
      },
      {
        factorName: 'f2',
        factorDescription: 'factorDes 2 Test'
      },
      {
        factorName: 'f3',
        factorDescription: 'factorDes 3 Test'
      }
    ]
  })
  activeFragment$ = this.route.fragment.pipe(
    filter(item => item !==null && item?.length > 0),startWith('none'));


  currentActive$ = new Subject<String>()
  currentActiveState$ = merge(this.activeFragment$, this.currentActive$.pipe(distinctUntilChanged()))

  state$ = combineLatest([this.stats$, this.currentActiveState$]).pipe(map(([stats, currentActiveState])=> {
    return {
      stats,
      currentActiveState
    }
  }), publishReplay(1), refCount());

   async ngAfterContentInit() {
setTimeout(() => {
  this.appService.emitLoadedEvent()
}, 2000)
}
 
}
