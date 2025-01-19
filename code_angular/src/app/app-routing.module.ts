import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameQuestionComponent } from './pages/game-question/game-question.component';
import { GamePairComponent } from './pages/game-pair/game-pair.component';

const routes: Routes = [
  {
    path: 'game-pair',
    component: GamePairComponent,
  },
  {
    path: 'game-question',
    component: GameQuestionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
