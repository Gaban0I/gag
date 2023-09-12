import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './gestion/header/header.component';
import { LoaderComponent } from './gestion/loader/loader.component';
import { DashboardPageComponent } from './gestion/dashboard-page/dashboard-page.component';
import { UserInfoComponent } from './gestion/dashboard-page/user-info/user-info.component';
import { AppRoutingModule } from './app-routing.module';
import { ErrorComponent } from './gestion/error/error.component';
import { HomeWidgetComponent } from './gestion/dashboard-page/widget/home-widget/home-widget.component';
import { BatchWidgetComponent } from './gestion/dashboard-page/widget/batch-widget/batch-widget.component';
import { LockedBatchComponent } from './gestion/dashboard-page/widget/batch-widget/locked-batch/locked-batch.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ContextMenuComponent } from './gestion/dashboard-page/widget/batch-widget/context-menu/context-menu.component';
import { BatchPageComponent } from './gestion/batch-page/batch-page.component';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';
import { FilterComponent } from './gestion/batch-page/filter/filter.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import authConfig from '../config/app-config.json';

const config = {
  authority: authConfig.stsServer,
  redirectUrl: authConfig.redirect_url,
  postLoginRoute: '/gag/dashboard',
  forbiddenRoute: '/gag/error?status=404',
  unauthorizedRoute: '/gag/error?status=401',
  clientId: authConfig.idg_client_id,
  responseType: 'code',
  scope: 'openid profile email droit_gag',
  silentRenew: false,
  useRefreshToken: false,
  ignoreNonceAfterRefresh: true,
  logLevel: LogLevel.Debug,
  customParams: {
    sso: false,
    service: 'authArcade',
  },
};

console.log(config);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoaderComponent,
    DashboardPageComponent,
    UserInfoComponent,
    ErrorComponent,
    HomeWidgetComponent,
    BatchWidgetComponent,
    LockedBatchComponent,
    ContextMenuComponent,
    BatchPageComponent,
    FilterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    AuthModule.forRoot({
      config: config,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [AuthModule],
})
export class AppModule {}
