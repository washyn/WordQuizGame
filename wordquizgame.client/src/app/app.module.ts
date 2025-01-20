import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import Aura from '@primeng/themes/aura';
import {GetDataStrategy, GetLocalDataStrategy} from "./shared/get-data-strategy";
import {PrimeSharedModule} from "./shared/prime-shared.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [BrowserModule, CommonModule, AppRoutingModule, PrimeSharedModule],
  providers: [
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
    {
      provide: MessageService,
      useClass: MessageService,
    },
    {
      provide: ConfirmationService,
      useClass: ConfirmationService,
    },
    {
      provide: GetDataStrategy,
      useClass: GetLocalDataStrategy,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
