import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module'; 
// import { NgxSpinnerModule } from "ngx-spinner";

import { AppComponent } from './app.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './posts/post-list/post-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CreatePostComponent,
    HeaderComponent,
    PostListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    // NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
