import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output
} from '@angular/core';

@Directive({
  selector: '[appEnter]'
})
export class EnterDirective implements AfterViewInit, OnDestroy {
  constructor(private element: ElementRef) {}
  ioS: IntersectionObserver[] = [];
  @Output() current = new EventEmitter<string>();
  ngAfterViewInit(): void {
    const element = this.element.nativeElement as HTMLElement;
    const sections = element.querySelectorAll('section');

    sections.forEach(section => {
      const io = new IntersectionObserver((entries, _) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.current.next(section.id);
          }
        });
      });

      this.ioS.push(io);
    });
  }

  ngOnDestroy(): void {
    this.ioS.forEach(io => {
      io.disconnect();
    });
  }
}
