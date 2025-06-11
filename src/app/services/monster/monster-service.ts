import { Injectable } from '@angular/core';
import { Monster } from '../../models/monster.model';
import { MonsterType } from '../../utils/monster.utils';

@Injectable({
  providedIn: 'root'
})
export class MonsterService {
  monsters : Monster[]=[];
  currentIndex : number = 1;

  constructor() {
       this.load();
   }
  

  private save(){
    localStorage.setItem('monsters', JSON.stringify(this.monsters));
  } 

  private load(){
    const monsterData = localStorage.getItem('monsters');
    if (monsterData){
      this.monsters = JSON.parse(monsterData).map((monsterJSON: any) => Object.assign(new Monster(), monsterJSON));
      if (this.monsters.length > 0) {
        this.currentIndex = Math.max(...this.monsters.map(monster => monster.id ?? 1), 1) + 1;
      } else {
        this.currentIndex = 1;
      }
      }else{
      this.init();
      this.save();
    }
  }

  private init(){
        this.monsters = [];
        const monster1 = new Monster();
        monster1.id = this.currentIndex++;
        monster1.name="Birdy";
        monster1.hp= 70;
        monster1.figureCaption = "N°002 Birdy ";
        this.monsters.push(monster1);
        
        const monster2 = new Monster();
        monster2.id = this.currentIndex++;
        monster2.name="Wolfy";
        monster2.image="wolf.jpg";
        monster2.type= MonsterType.PLANT;
        monster2.hp= 30;
        monster2.figureCaption = "N°002 Wolfy ";
        this.monsters.push(monster2);
    
        const monster3 = new Monster();
        monster3.id = this.currentIndex++;
        monster3.name="Octo";
        monster3.image="octo.jpg";
        monster3.type= MonsterType.WATER;
        monster3.hp= 55;
        monster3.figureCaption = "N°003 Mouse ";
        this.monsters.push(monster3);
        
        const monster4 = new Monster();
        monster4.id = this.currentIndex++;
        monster4.name="Dragon";
        monster4.image="dragon.jpg";
        monster4.type= MonsterType.FIRE;
        monster4.hp= 25;
        monster4.figureCaption = "N°004 Wolfy ";
        this.monsters.push(monster4);
}

  getAll(): Monster[]{
    return this.monsters.map(monster => monster.copy());
  }

  get(id: number): Monster | undefined {
    const monster = this.monsters.find(monster => monster.id ===id);
    return monster? monster.copy(): undefined;
  }

  add(monster : Monster): Monster {
    const monsterCopy = monster.copy();
    monsterCopy.id =this.currentIndex;
    this.monsters.push(monsterCopy.copy());
    this.currentIndex++;
    this.save();
    return monsterCopy;
  }

  update(monster: Monster): Monster | undefined {
    const monsterCopy = monster.copy();
    const monsterIndex = this.monsters.findIndex(originalMonster => originalMonster.id === monsterCopy.id);
    if(monsterIndex !==-1){
      this.monsters[monsterIndex] = monsterCopy.copy();
    }
    this.save();
    return monsterCopy;
  }

  delete(id:number){
    const monsterIndex = this.monsters.findIndex(originalMonster=>originalMonster.id === id);
    if(monsterIndex !=-1){
      this.monsters.splice(monsterIndex,1);
      this.save();
    }
  }
}