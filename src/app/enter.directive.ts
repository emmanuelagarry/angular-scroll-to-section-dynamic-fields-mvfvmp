import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
Input,
  OnDestroy,
  Output
} from '@angular/core';
import type{ Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { AppService } from './app.service';

@Directive({
  selector: '[appEnter]'
})
export class EnterDirective implements AfterViewInit, OnDestroy {
  constructor(private element: ElementRef, private appService: AppService) {}
  ioS: IntersectionObserver[] = [];

 
  @Output() current = new EventEmitter<string>();
  async ngAfterViewInit() {

    await this.appService.contentLoaded$.pipe(take(1)).toPromise()
    const element = this.element.nativeElement as HTMLElement;
    const sections = element.querySelectorAll('section');
      console.log(sections.length)

    sections.forEach(section => {
      const io = new IntersectionObserver((entries, _) => {
        // Add extra logic for hilighting section here
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.current.next(section.id);
          }
          //
        });
      });

      io.observe(section);

      this.ioS.push(io);
    });
  }

  ngOnDestroy(): void {
    this.ioS.forEach(io => {
      io.disconnect();
    });
  }
}
