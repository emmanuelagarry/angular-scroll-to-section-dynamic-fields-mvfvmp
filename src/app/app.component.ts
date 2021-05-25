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
import { filter, startWith } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private route: ActivatedRoute) {
  }
  activeFragment$ = this.route.fragment.pipe(filter(item => item !==null && item?.length > 0),startWith('none'));
  public currentActive;
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

  @HostListener('window:scroll', ['$event'])
  checkOffsetTop() {
    //BELOW I AM GETTING FACTOR IDS, BUT NOT ABLE TO FIGURE OUT WHAT EXACT CONDITION TO APPLY, IN ORDER FOR THE SCROLL HIGHLIGHT OF THE LABEL TO WORK
    // this.factors.forEach(item => {
    //   console.log('inside id', item.nativeElement.id);
    // });

    if (
      window.pageYOffset >= this.propOffset &&
      window.pageYOffset < this.commentsOffset
    ) {
      this.currentActive = 'prop';
    } else if (
      window.pageYOffset >= this.commentsOffset &&
      window.pageYOffset < this.internalCommentsOffset
    ) {
      this.currentActive = 'comments';
    } else if (window.pageYOffset > this.internalCommentsOffset) {
      this.currentActive = 'IntrnlCmnts';
    }
  }

  name = 'Angular ' + VERSION.major;
  private activeSiteSection: string;

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
