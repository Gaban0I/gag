import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './gestion/auth/auth-guard';
import { DashboardPageComponent } from './gestion/dashboard-page/dashboard-page.component';
import { ErrorComponent } from './gestion/error/error.component';
import { LoaderComponent } from './gestion/loader/loader.component';
import { BatchPageComponent } from './gestion/batch-page/batch-page.component';

const routes: Routes = [
  {
    path: 'gag',
    children: [
      { path: 'loading', component: LoaderComponent },
      {
        path: 'dashboard',
        component: DashboardPageComponent,
        canActivate: [AuthGuard],
      },
      { path: 'lots', component: BatchPageComponent, canActivate: [AuthGuard] },
      { path: 'error', component: ErrorComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '**', redirectTo: 'error', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: '/gag/loading', pathMatch: 'full' },
  { path: '**', redirectTo: '/gag/loading', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
