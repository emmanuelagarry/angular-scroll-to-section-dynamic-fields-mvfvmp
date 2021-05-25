import {
  Component,
  VERSION,
  ViewChild,
  ViewChildren,
  ElementRef,
  HostListener,
  QueryList
} from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
import {  merge, Subject } from 'rxjs';
import {  distinctUntilChanged, filter, map, startWith, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private route: ActivatedRoute) {
  }

   name = 'Angular ' + VERSION.major;

  Stats = {
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
  };
  activeFragment$ = this.route.fragment.pipe(
    filter(item => item !==null && item?.length > 0),startWith('none'));

  currentActive$ = new Subject<String>()


  currentActiveState$ = merge(this.activeFragment$, this.currentActive$.pipe(distinctUntilChanged()))
 
}
