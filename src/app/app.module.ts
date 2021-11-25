import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FilesComponent } from './files/files.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { FileSearchComponent } from './file-search/file-search.component';
import { ChangeComponent } from './change/change.component';

@NgModule({
  declarations: [
    AppComponent,
    FilesComponent,
    DashboardComponent,
    FileSearchComponent,
    ChangeComponent
  ],
  imports: [
    BrowserModule, // 浏览器模块
    FormsModule, // 表单模块
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
