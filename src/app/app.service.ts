import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class AppService {
  contentLoaded$ = new Subject<void>();
  constructor() {}

  emitLoadedEvent() {
    this.contentLoaded$.next();
  }
}
