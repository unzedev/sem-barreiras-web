import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteGuard } from './guards/route.guard';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { PlacesComponent } from './pages/places/places.component';
import { PlaceComponent } from './pages/place/place.component';
import { NewPlaceComponent } from './pages/new-place/new-place.component';
import { NewRatingComponent } from './pages/new-rating/new-rating.component';
import { AdminPlacesComponent } from './pages/admin/admin-places/admin-places.component';
import { AdminRatingsComponent } from './pages/admin/admin-ratings/admin-ratings.component';
import { ForgotPasswordOneComponent } from './pages/forgot-password-one/forgot-password-one.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/entrar',
    pathMatch: 'full',
  },
  {
    path: 'entrar',
    component: SigninComponent,
  },
  {
    path: 'cadastrar',
    component: SignupComponent,
  },
  {
    path: 'recuperar',
    component: ForgotPasswordOneComponent,
  },
  {
    path: 'admin',
    canActivate: [RouteGuard],
    children: [
      {
        path: '',
        redirectTo: '/admin/estabelecimentos',
        pathMatch: 'full',
      },
      {
        path: 'estabelecimentos',
        component: AdminPlacesComponent,
      },
      {
        path: 'avaliacoes',
        component: AdminRatingsComponent,
      },
    ],
  },
  {
    path: 'estabelecimentos',
    canActivate: [RouteGuard],
    children: [
      {
        path: '',
        component: PlacesComponent,
      },
      {
        path: 'adicionar',
        component: NewPlaceComponent,
      },
      {
        path: ':id',
        component: PlaceComponent,
      },
      {
        path: ':id/avaliar',
        component: NewRatingComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
