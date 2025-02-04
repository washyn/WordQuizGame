import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameQuestionComponent } from './pages/game-question/game-question.component';
import { GamePairComponent } from './pages/game-pair/game-pair.component';
import { AppMenuComponent } from './app-menu.component';
import { GamePairMenuComponent } from './pages/game-pair/game-pair-menu.component';

const routes: Routes = [
  {
    path: 'game-pair',
    component: GamePairComponent,
  },
  {
    path: 'menu-game-pair',
    component: GamePairMenuComponent,
  },
  // {
  //   path: 'game-question',
  //   component: GameQuestionComponent,
  // },
  {
    path: '',
    component: AppMenuComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
