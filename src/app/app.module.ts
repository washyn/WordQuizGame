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
import { GamePairComponent } from './pages/game-pair/game-pair.component';
import { GameQuestionComponent } from './pages/game-question/game-question.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GamePairComponent,
    GameQuestionComponent,
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
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: ,
    // }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
