import { Component, inject, model, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MonsterType } from '../../utils/monster.utils';
import { PlayingCard } from '../../components/playing-card/playing-card';
import { MonsterService } from '../../services/monster/monster-service';
import { Monster } from '../../models/monster.model';




@Component({
  selector: 'app-monster',
  standalone:true,
  imports: [ReactiveFormsModule, PlayingCard],
  templateUrl: './monster.html',
  styleUrl: './monster.css'
})

export class MonsterComponent implements OnInit, OnDestroy{

  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private monsterService = inject(MonsterService);
  private routeSubscription: Subscription | null = null;
  private formValuesSubscription : Subscription | null = null;
  private router = inject(Router);


  formGroup=this.fb.group({
    name:['',[Validators.required]],
    image:['',[Validators.required]],
    type: [MonsterType.ELECTRIC,[Validators.required]],
    hp: [0,[Validators.required, Validators.min(1), Validators.max(200)]],
    figureCaption : ['',[Validators.required]],
    attackName: ['',[Validators.required]],
    attackStrength : [0,[Validators.required]],
    attackDescription: ['',[Validators.required]]

  });

  monster: Monster = Object.assign(new Monster(),this.formGroup.value);
  monsterTypes = Object.values(MonsterType);
  monsterId = -1;


  ngOnInit(): void {

    this.formValuesSubscription=this.formGroup.valueChanges.subscribe(data => {
    this.monster = Object.assign(new Monster(),data);
      
    });
    this.routeSubscription = this.route.params.subscribe(params=>{

      if(params['id']){
        this.monsterId=parseInt(params['id']);
        const monsterFound = this.monsterService.get(this.monsterId);
        

        if (monsterFound){
          this.monster = monsterFound;
          this.formGroup.patchValue(this.monster);
        }
      }
    });
    
  }

  ngOnDestroy(): void {
    this.formValuesSubscription?.unsubscribe();
    this.routeSubscription?.unsubscribe();
  }

  submit(event: Event){
    event.preventDefault();
    if(this.monsterId === -1){
      this.monsterService.add(this.monster);
    }else{
      this.monster.id=this.monsterId;
      this.monsterService.update(this.monster);
    }
    this.navigateBack();
  }

  navigateBack(){
    this.router.navigate(['/home']);
  }

  isFieldValid(name: string){
    const formControl = this.formGroup.get(name);
    return formControl?.invalid && (formControl?.dirty || formControl?.touched);
  }

  deleteMonster() {

				this.monsterService.delete(this.monsterId);
				this.navigateBack();

	}

  onFileChange(event: any){
    const reader = new FileReader();
    if(event.target.files && event.target.files.length){
      const[file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload=()=>{
        this.formGroup.patchValue({
          image: reader.result as string,
        })
      };
    }
  }
}
