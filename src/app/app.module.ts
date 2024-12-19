import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

// Angular Material Modules
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatGridListModule } from '@angular/material/grid-list'; 
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; 
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';


import { LoginComponent } from './features/login/login.component';
//import { HomeComponent } from './features/home/home.component';
import { SignupComponent } from './features/signup/signup.component';
//import { TaskFormComponent } from './features/task-form/task-form.component';
//import { TaskListComponent } from './features/task-list/task-list.component';
//import { UserDetailsComponent } from './features/user-details/user-details.component';
import { TaskStatusFilterPipe } from './features/task-list/task-status-filter.pipe';
import { HighlightTaskDirective } from './features/task-list/highlight-task.directive';
import { NavigationService } from './services/navigation.service';
import { FeatureModule } from './features/feature.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    //HomeComponent,
    SignupComponent,
    //TaskFormComponent,
    //TaskListComponent,
    //UserDetailsComponent,
    TaskStatusFilterPipe,
    HighlightTaskDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatTableModule,
    MatSelectModule,
    MatPaginatorModule,
    MatIconModule,
    MatGridListModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,

    FeatureModule
  ],
  providers: [
    NavigationService,
    provideAnimations()
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { } 
