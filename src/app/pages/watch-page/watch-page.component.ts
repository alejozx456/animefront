import { CommonModule ,AsyncPipe} from '@angular/common';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {MatTabsModule} from '@angular/material/tabs';
import { Component ,inject, OnInit} from '@angular/core';
import { ApiAnimeService } from '../../services/api-anime.service';
import { Root2, WatchModel } from '../../models/watch.interface';
import { Observable, Observer } from 'rxjs';

export interface ExampleTab {
  label: string;
  content: SafeResourceUrl;
}

@Component({
  selector: 'app-watch-page',
  standalone: true,
  imports: [CommonModule,MatDialogTitle, MatDialogContent,MatTabsModule,AsyncPipe],
  templateUrl: './watch-page.component.html',
  styleUrl: './watch-page.component.scss'
})
export class WatchPageComponent implements OnInit {
  data = inject(MAT_DIALOG_DATA);
  api=inject(ApiAnimeService);

  asyncTabs: Observable<ExampleTab[]> | undefined;

  animeServers:WatchModel | undefined;
  constructor(private sanitizer: DomSanitizer) {

  }
  ngOnInit(): void {
      console.log(this.data);
      //this.getVideoServers();
      this.Tabs();

  }

  getVideoServers(){
    this.api.getServersAnimes(this.data.serie,this.data.episodio).subscribe((servers:WatchModel)=>{

      this.animeServers=servers;
      console.log(this.animeServers);
    })
  }

  Tabs(){
    this.asyncTabs = new Observable((observer: Observer<ExampleTab[]>) => {
      this.api.getServersAnimes(this.data.serie,this.data.episodio).subscribe((data: WatchModel) => {
        const tabs = this.createTabs(data);
        observer.next(tabs);
      });
    });
  }

  createTabs(data: WatchModel): ExampleTab[] {
    // Aquí transformamos cada `Root2` en un `ExampleTab`
    const tabs: ExampleTab[] = [];
    data.forEach((row: Root2[]) => {
      row.forEach((item: Root2, index: number) => {
        tabs.push({
          label: item.title || `Tab ${index + 1}`, // Puedes personalizar el label
          content: this.sanitizeUrl(item.code)// Puedes personalizar el contenido
        });
      });
    });
    return tabs;
  }

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url || '');
  }

  }



