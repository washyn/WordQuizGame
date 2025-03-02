import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { PrimeSharedModule } from './shared/prime-shared.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header.component';
import Aura from '@primeng/themes/aura';
import Material from '@primeng/themes/material';
import Lara from '@primeng/themes/lara';
import Nora from '@primeng/themes/nora';
import { GamePairComponent } from './pages/game-pair/game-pair.component';
import { GameQuestionComponent } from './pages/game-question/game-question.component';
import { GetDataStrategy } from './shared/interfaces';
import { provideHttpClient } from '@angular/common/http';
import { AppMenuComponent } from './app-menu.component';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { GamePairMenuComponent } from './pages/game-pair/game-pair-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GamePairComponent,
    GameQuestionComponent,
    AppMenuComponent,
    GamePairMenuComponent,
  ],
  imports: [BrowserModule, CommonModule, AppRoutingModule, PrimeSharedModule],
  providers: [
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Material,
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
    provideHttpClient(),
    provideRouter([], withComponentInputBinding()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
