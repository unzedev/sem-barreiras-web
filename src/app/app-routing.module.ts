import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { PlacesComponent } from './pages/places/places.component';
import { PlaceComponent } from './pages/place/place.component';

const routes: Routes = [
  {
    path: 'entrar',
    component: SigninComponent,
  },
  {
    path: 'cadastrar',
    component: SignupComponent,
  },
  {
    path: '',
    component: PlacesComponent,
  },
  {
    path: ':id',
    component: PlaceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
