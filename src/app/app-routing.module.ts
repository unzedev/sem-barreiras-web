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
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { AdminUsersComponent } from './pages/admin/admin-users/admin-users.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/estabelecimentos',
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
    component: ForgotPasswordComponent,
  },
  {
    path: 'estabelecimentos',
    component: PlacesComponent,
  },
  {
    path: 'estabelecimentos/adicionar',
    component: NewPlaceComponent,
    canActivate: [RouteGuard],
  },
  {
    path: 'estabelecimentos/:id',
    component: PlaceComponent,
  },
  {
    path: 'estabelecimentos/:id/avaliar',
    component: NewRatingComponent,
    canActivate: [RouteGuard],
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
      {
        path: 'usuarios',
        component: AdminUsersComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
