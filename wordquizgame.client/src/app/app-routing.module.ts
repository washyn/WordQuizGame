import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameQuestionComponent } from './pages/game-question/game-question.component';
import { GamePairComponent } from './pages/game-pair/game-pair.component';
import { Menu } from 'primeng/menu';
import { AppMenuComponent } from './app-menu.component';

const routes: Routes = [
  {
    path: 'game-pair',
    component: GamePairComponent,
  },
  {
    path: 'game-question',
    component: GameQuestionComponent,
  },
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
