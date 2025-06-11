import { Routes } from '@angular/router';
import { MonsterList } from './pages/monster-list/monster-list';
import { MonsterComponent } from './pages/monster/monster';
import { App } from './app';
import { Notfound } from './pages/notfound/notfound';

export const routes: Routes = [{
    path:'',
    redirectTo: 'home',
    pathMatch:'full'
},{
    path : 'home',
    component: MonsterList
}, {
    path: 'monster',
    children : [{
        path:'',
        component: MonsterComponent
    },{
        path:':id',
        component: MonsterComponent
    }]
},{
    path: '**',
    component: Notfound 
}];
