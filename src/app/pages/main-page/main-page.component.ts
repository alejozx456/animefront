import { Component, OnInit } from '@angular/core';
import { ApiAnimeService } from '../../services/api-anime.service';
import { AnimeModel } from '../../models/anime.interface';
import { CommonModule } from '@angular/common';
import { CardComponent } from "../../components/card/card.component";
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, CardComponent,ReactiveFormsModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit {

listAnimes:AnimeModel[]=[];

isOpen:boolean=false;

isHovered = false;

search= new FormControl('',{
  nonNullable: true,
  validators: [Validators.required,
    Validators.minLength(3),
  ],
});

  constructor(private api:ApiAnimeService,private router:Router) { }



  ngOnInit(): void {
    this.getDataAnime('one');
  }

  getDataAnime(query:string){
    this.api.getAnimes(query).subscribe((data:AnimeModel[])=>{
      this.listAnimes=data;
      console.log(this.listAnimes);
    })

  }

  goDetailAnime(id:string){
this.router.navigate(['/detail',id]);
  }

}
