import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { HttpClientModule } from '@angular/common/http';
import { UserIconComponent } from './user-icon/user-icon.component';
import { UserMessagesComponent } from './user-messages/user-messages.component';

@NgModule({
  declarations: [AppComponent, ChatComponent, ChatWindowComponent, UserIconComponent, UserMessagesComponent],
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
