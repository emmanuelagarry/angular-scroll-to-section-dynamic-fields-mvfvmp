import {
  Component,
  VERSION,
  ViewChild,
  ViewChildren,
  ElementRef,
  HostListener,
  QueryList
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest, merge, Subject } from 'rxjs';
import {  distinctUntilChanged, filter, map, startWith, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private route: ActivatedRoute) {

  }
  activeFragment$ = this.route.fragment.pipe(
    tap(item => console.log(item)),
    filter(item => item !==null && item?.length > 0),startWith('none'));

  currentActiveSubject$ = new Subject<String>()

  currentActive$ = this.currentActiveSubject$.pipe(distinctUntilChanged())

  currentActiveState$ = merge(this.activeFragment$, this.currentActive$);
  
  public propOffset: Number = null;
  public commentsOffset: Number = null;
  public internalCommentsOffset: Number = null;

  @ViewChild('prop', { static: false }) propElement: ElementRef;
  @ViewChild('comments', { static: false }) commentsElement: ElementRef;
  @ViewChild('IntrnlCmnts', { static: false })
  internalCommentsElement: ElementRef;
  @ViewChildren('factor') factors: QueryList<ElementRef>;

  ngAfterViewInit() {
    this.propOffset = this.propElement.nativeElement.offsetTop;
    this.commentsOffset = this.commentsElement.nativeElement.offsetTop;
    this.internalCommentsOffset = this.internalCommentsElement.nativeElement.offsetTop;
  }

  

  name = 'Angular ' + VERSION.major;

  Stats: any = {
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
}
