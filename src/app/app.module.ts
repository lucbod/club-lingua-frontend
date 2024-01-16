import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, ChatComponent, ChatWindowComponent],
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
