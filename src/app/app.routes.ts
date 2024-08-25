import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { WatchPageComponent } from './pages/watch-page/watch-page.component';

export const routes: Routes = [
  {path:"",component:MainPageComponent},
  {path:"detail/:id",component:DetailPageComponent},
  {path:"watch",component:WatchPageComponent},
  {path:"**",component:MainPageComponent}
];
