import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CascadingTabsComponent } from './cascading-tabs/cascading-tabs.component';
import { SafeHtmlPipe } from "./safe.pipe";
import { CascadingCircularTabsComponent } from './cascading-circular-tabs/cascading-circular-tabs.component';
@NgModule({
  declarations: [
    AppComponent,
    CascadingTabsComponent,
    SafeHtmlPipe,
    CascadingCircularTabsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
