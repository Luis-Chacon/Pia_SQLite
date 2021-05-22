import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Peliservice } from '../Services/pelis.service';
import { Pelis } from '../model/Pelis.models'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  results : Observable<Pelis>;
  term : string='';
  type : string='';


  constructor(private peliService : Peliservice) {}

  ngOnInit()
  {

  }

  searchChanged(): void
  {
    console.log('searchChanged');
    this.results = this.peliService.buscarPeliculas(this.term,this.type)
  }

  toggleTheme(event)
  {
    if(event.detail.checked)
    {
      document.body.setAttribute('color-theme','dark');
    }
    else
    {
      document.body.setAttribute('color-theme','ligth');
    }
    //console.log(event);
  }
}
