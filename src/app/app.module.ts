import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AboutComponent } from './about/about.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatSelectModule } from '@angular/material/select'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { NgxPaginationModule } from 'ngx-pagination';
import { ResizableDirective } from './resizable.directive'
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from "@angular/material/list";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSidenavModule } from "@angular/material/sidenav";
// import { MatSortModule } from "@angular/material/sort";
import { MatToolbarModule } from "@angular/material/toolbar";

// import { MemolistComponent } from './memo/memolist/memolist.component';

import { NgxSpinnerModule } from 'ngx-spinner';

import { LoginComponent } from './login/login.component';

import { NgxSummernoteModule } from 'ngx-summernote';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
// import { InwardModule } from '../app/inward/inward.module';
import { MatChipsModule } from '@angular/material/chips';
import { ToastrModule } from 'ngx-toastr';
import {CookieService} from 'ngx-cookie-service'
import { JwtUnAuthorizedInterceptorServiceService } from './jwt-un-authorized-interceptor-service.service';

import { SharedModule } from './shared/shared.module';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { MatExpansionModule } from '@angular/material/expansion';

import { WidgetscreensComponent } from './widgetscreens/widgetscreens.component';
import { DataService } from './service/data.service';
@NgModule({
  declarations: [
    AppComponent, LoginComponent,
     AboutComponent,  ResizableDirective,
    WidgetscreensComponent,


  ],
  imports: [
    NgIdleKeepaliveModule.forRoot(),
    ToastrModule.forRoot(),
    SharedModule,
    NgxSummernoteModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatAutocompleteModule, MatChipsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    // MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatExpansionModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgbModule
  ],
  providers: [DataService,CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtUnAuthorizedInterceptorServiceService,
      multi: true
    }
  ],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule { }