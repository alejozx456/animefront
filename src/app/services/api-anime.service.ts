import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnimeModel } from '../models/anime.interface';
import { TitleModel } from '../models/title.interface';
import { WatchModel } from '../models/watch.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiAnimeService {

 // API = 'http://192.168.100.33:5000';
 API = 'https://api-anime2.onrender.com';

  constructor(private http: HttpClient) { }

  // getAnimes(query: string): Observable<AnimeModel[]> {
  //   //const body={query};
  //   let params = new HttpParams()
  //     .set('query', query);
  //   return this.http.get<AnimeModel[]>(this.API + '/search', { params })
  // }

  getAnimes(query:string):Observable<AnimeModel[]>{
    const headers=new HttpHeaders({
      'Content-Type': 'application/json',
    })

    const body={query}

    return this.http.post<any>(this.API+'/search',body,{headers})
  }

  getTitleAnime(query:string):Observable<TitleModel>{
    // let params= new HttpParams()
    // .set('query',query)
    const body={query}

    return this.http.post<TitleModel>(this.API+'/title',body)
  }

  getLinksAnime(serie:string,episodio:number){
        let params=new HttpParams()
        .set('serie',serie)
        .set('episodio',episodio)
    return this.http.get(this.API+'/links',{params})
  }

  getServersAnimes(serie:string,episodio:number):Observable<WatchModel>{
      const body={serie,episodio};

      return this.http.post<WatchModel>(this.API+'/servers',body)

  }


}
