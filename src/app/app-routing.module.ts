import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PoeFormComponent } from './poe/components/poe-form/poe-form.component';
import { PoeTableComponent } from './poe/components/poe-table/poe-table.component';
import { PoeResolver } from './poe/resolvers/poe.resolver';
import { StagaireFormComponent } from './stagiaires/components/stagaire-form/stagaire-form.component';
import { StagiaireDetailComponent } from './stagiaires/components/stagiaire-detail/stagiaire-detail.component';
import { StagiaireTableComponent } from './stagiaires/components/stagiaire-table/stagiaire-table.component';
import { StagiaireResolver } from './stagiaires/resolvers/stagiaire.resolver';
import { HasUserGuard } from './user/guards/has-user.guard';
import { NoUserGuard } from './user/guards/no-user.guard';
import { LoginFormComponent } from './user/login/login-form/login-form.component';
import { SignupComponent } from './user/signup/signup/signup.component';

@NgModule({
  imports: [RouterModule.forRoot(AppRoutingModule.routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  public static routes: Routes = [
    {
      path: '',
      redirectTo: 'login', // redirection to another path
      pathMatch: 'full', // check all the route (not just one section)
    },
    {
      path: 'signup',
      component: SignupComponent,
      canActivate: [
        NoUserGuard
      ]
    },
    {
      path: 'login',
      component: LoginFormComponent,
      canActivate: [
        NoUserGuard,
      ]
    },
    {
      path: 'home',
      component: StagiaireTableComponent,
      canActivate: [
        HasUserGuard
      ]
    },
    {
      path: 'poes',
      component: PoeTableComponent,
      canActivate: [
        HasUserGuard
      ]
    },

    {
      path: 'stagiaire/add',
      component: StagaireFormComponent,
      resolve: { form: StagiaireResolver },
      canActivate: [
        HasUserGuard
      ]
    },
    {
      path: 'stagiaire/:id', // parametrized route
      component: StagiaireDetailComponent,
      canActivate: [
        HasUserGuard
      ]
    },
    {
      path: 'stagiaire/update/:id',
      component: StagaireFormComponent,
      resolve: { form: StagiaireResolver },
      canActivate: [
        HasUserGuard
      ]
    },
    {
      path: 'poe/add',
      component: PoeFormComponent,
      resolve: { form: PoeResolver },
      canActivate: [
        HasUserGuard
      ]
    },
    {
      path: 'poe/update/:id',
      component: PoeFormComponent,
      resolve: { form: PoeResolver},
      canActivate: [
        HasUserGuard
      ]
    },
    // must be the last route of the list
    {
      path: '**', // wild card
      redirectTo: 'home',
      pathMatch: 'full',
    }
  ];
}
