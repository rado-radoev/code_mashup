import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { DoctorService } from './doctor.service';

import { AppComponent } from './app.component';
import { DoctorlistComponent } from './doctorlist/doctorlist.component';

@NgModule({
  declarations: [
    AppComponent,
    DoctorlistComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    DoctorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
