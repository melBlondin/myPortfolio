import { Component, EventEmitter, input, Input, model, Output, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css'
})
export class SearchBar {

  search =model <string>('search')
  
 searchButtonClicked = output({alias: 'submit' })
  searchClick(){
    this.searchButtonClicked.emit();
  }

}
