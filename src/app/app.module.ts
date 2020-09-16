import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { BarRatingModule } from 'ngx-bar-rating';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlacesComponent } from './pages/places/places.component';
import { PlaceComponent } from './pages/place/place.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';

@NgModule({
  declarations: [
    AppComponent,
    PlacesComponent,
    PlaceComponent,
    SignupComponent,
    SigninComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BarRatingModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule,
    NgxUiLoaderModule,
    NgxUiLoaderRouterModule,
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
