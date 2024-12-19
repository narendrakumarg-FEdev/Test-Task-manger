import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskFormComponent } from './task-form/task-form.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from '../app-routing.module';
import { HomeComponent } from './home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { TaskListComponent } from './task-list/task-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';


@NgModule({
    declarations: [
        TaskFormComponent,
        UserDetailsComponent,
        HomeComponent,
        TaskListComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,
        AppRoutingModule,
        MatButtonModule,


        BrowserModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatCardModule,
        MatFormFieldModule,
        MatTableModule,
        MatSelectModule, 
        MatPaginatorModule,
        MatGridListModule,
        MatSlideToggleModule,
        MatSidenavModule,
        MatListModule,

    ],
    exports: [
        TaskFormComponent // Export TaskFormComponent if it will be used in other modules
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class FeatureModule { }