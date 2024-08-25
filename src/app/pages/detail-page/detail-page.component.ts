import { Component, OnInit,inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { ApiAnimeService } from '../../services/api-anime.service';
import { TitleModel } from '../../models/title.interface';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WatchPageComponent } from '../watch-page/watch-page.component';

@Component({
  selector: 'app-detail-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-page.component.html',
  styleUrl: './detail-page.component.scss'
})
export class DetailPageComponent implements OnInit {

  animeData!:TitleModel;
  dialog = inject(MatDialog);

  constructor(private api:ApiAnimeService,private route:ActivatedRoute){

}

ngOnInit(): void {
  // const idAnime= this.route.snapshot.paramMap.get('id');
  // this.id=idAnime;
  // console.log(this.id);
   this.getId();
  // this.getDetailAnime(this.getId() as string)

}

async getId(){
  // const animeId= this.route.snapshot.paramMap.get('id');
  // this.api.getTitleAnime(animeId as string).subscribe((data:TitleModel)=>{
  //   this.animeData=data;
  //   console.log(this.animeData);
  // })

  this.route.paramMap.subscribe(params=>{
    let idAnime=params.get('id');
    if(idAnime){
      console.log(idAnime);
      this.api.getTitleAnime(idAnime!).subscribe(data=>{
        this.animeData=data;
        console.log(this.animeData)
      })
    }

  })

// getDetailAnime(id:string){
//   this.api.getTitleAnime(id).subscribe((data:TitleModel)=>{
//     this.animeData=data;
//     console.log(this.animeData);
//   })

// }
}


openDialog(serie:string,episodio:number){

  this.dialog.open(WatchPageComponent,{
    width: '900px',
    height: '400px',
    data:{
      serie:serie,
      episodio:episodio
    }

  })
}

}
