import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { BarRatingModule } from 'ngx-bar-rating';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlacesComponent } from './pages/places/places.component';
import { PlaceComponent } from './pages/place/place.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import { AuthInterceptor } from './interceptors/auth/auth.interceptor';
import { RouteGuard } from './guards/route.guard';
import { NewPlaceComponent } from './pages/new-place/new-place.component';
import { NewRatingComponent } from './pages/new-rating/new-rating.component';
import { AdminPlacesComponent } from './pages/admin/admin-places/admin-places.component';
import { AdminRatingsComponent } from './pages/admin/admin-ratings/admin-ratings.component';
import { AdminUsersComponent } from './pages/admin/admin-users/admin-users.component';
import { ForgotPasswordOneComponent } from './pages/forgot-password-one/forgot-password-one.component';

@NgModule({
  declarations: [
    AppComponent,
    PlacesComponent,
    PlaceComponent,
    SignupComponent,
    SigninComponent,
    NewPlaceComponent,
    NewRatingComponent,
    AdminPlacesComponent,
    AdminRatingsComponent,
    AdminUsersComponent,
    ForgotPasswordOneComponent,
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
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    RouteGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
