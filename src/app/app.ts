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
  imports: [RouterOutlet],
  templateUrl:'./app.component.html',
  styleUrl : './app.component.css'
})

export class App {
}
