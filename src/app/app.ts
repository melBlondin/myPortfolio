import { Component, computed, effect, inject, model, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlayingCard } from "./components/playing-card/playing-card";
import { Monster } from './models/monster.model';
import { SearchBar } from './components/search-bar/search-bar';
import { MonsterType } from './utils/monster.utils';
import { signalGetFn } from '@angular/core/primitives/signals';
import { CommonModule } from '@angular/common';
import { MonsterService } from './services/monster/monster-service';




@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, PlayingCard, SearchBar],
  templateUrl:'./app.component.html',
  styleUrl : './app.component.css'
})
export class App {
  
  monsterService = inject(MonsterService)

  monsters!: Monster[];
  search=model('');

  filteredMonsters = computed(()=>{
    return this.monsters.filter(monster => monster.name.includes(this.search()));
  })


  constructor(){

    this.monsters = [];
    const monster1 = new Monster();
    monster1.name="Birdy";
    monster1.hp= 70;
    monster1.figureCaption = "N°002 Birdy ";
    this.monsters.push(monster1);
    
    const monster2 = new Monster();
    monster2.name="Wolfy";
    monster2.image="wolf.jpg";
    monster2.type= MonsterType.PLANT;
    monster2.hp= 30;
    monster2.figureCaption = "N°002 Wolfy ";
    this.monsters.push(monster2);

    const monster3 = new Monster();
    monster3.name="Octo";
    monster3.image="octo.jpg";
    monster3.type= MonsterType.WATER;
    monster3.hp= 55;
    monster3.figureCaption = "N°003 Mouse ";
    this.monsters.push(monster3);
    
    const monster4 = new Monster();
    monster4.name="Dragon";
    monster4.image="dragon.jpg";
    monster4.type= MonsterType.FIRE;
    monster4.hp= 25;
    monster4.figureCaption = "N°004 Wolfy ";
    this.monsters.push(monster4);

    this.monsterService.hello();
  }

}
