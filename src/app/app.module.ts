import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { MaterialModule } from './material/material.module';
// import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from '@progress/kendo-angular-charts';
import 'hammerjs';

import { UserComponent } from './containers/user/user.component';
import { EmployeeComponent } from './containers/employee/employee.component';
import { DashboardComponent } from './components/layout/dashboard/dashboard.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { EmployeeLayoutComponent } from './components/layout/employee-layout/employee-layout.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { EmployeeDataComponent } from './components/employee-data/employee-data.component';

import { ApiService } from './services/api.service';
import { HttpService } from './services/http.service';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    EmployeeComponent,
    DashboardComponent,
    HeaderComponent,
    EmployeeLayoutComponent,
    UserListComponent,
    UserCardComponent,
    EmployeeDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GridModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [HttpService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
