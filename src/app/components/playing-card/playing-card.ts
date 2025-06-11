import { Component, computed, input, Input, InputSignal, OnChanges, SimpleChanges } from '@angular/core';
import { Monster } from '../../models/monster.model';
import { MonsterType, MonsterTypeProperties } from '../../utils/monster.utils';

@Component({
  selector: 'app-playing-card',
  standalone:true,
  imports: [],
  templateUrl: './playing-card.html',
  styleUrl: './playing-card.css'
})

export class PlayingCard {

monster = input(new Monster());
monsterTypeIcon = computed(()=> {
  return MonsterTypeProperties[this.monster().type].imageUrl
});
backgroundcolor = computed(()=> {
  return MonsterTypeProperties[this.monster().type].color
});

}