import { Component, computed, inject, model, signal } from '@angular/core';
import { SearchBar } from "../../components/search-bar/search-bar";
import { MonsterService } from '../../services/monster/monster-service';
import { Monster } from '../../models/monster.model';
import { PlayingCard } from "../../components/playing-card/playing-card";
import { Router } from '@angular/router';

@Component({
  selector: 'app-monster-list',
  imports: [SearchBar, PlayingCard],
  templateUrl: './monster-list.html',
  styleUrl: './monster-list.css'
})

export class MonsterList {

  
  private monsterService = inject(MonsterService);
  private router=inject(Router);
  monsters=signal<Monster[]>([]);
  search=model('');

  filteredMonsters = computed(()=>{
    return this.monsters().filter(monster => monster.name.includes(this.search()));
  })


  constructor(){
    this.monsters.set(this.monsterService.getAll());
  }

   addMonster(){
      this.router.navigate(['monster']);
   }

   openMonster(monster: Monster){
      this.router.navigate(['monster', monster.id]);
   }

}
