import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { Routes, RouterModule } from '@angular/router';
import { EnterDirective } from './enter.directive';
import { AppService } from './app.service';

@NgModule({
  imports: [BrowserModule, FormsModule, RouterModule.forRoot([])],
  declarations: [AppComponent, HelloComponent, EnterDirective],
  bootstrap: [AppComponent],
  providers: [AppService]
})
export class AppModule {}
