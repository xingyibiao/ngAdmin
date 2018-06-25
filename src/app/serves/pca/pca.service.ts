import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Res } from '../interfaces/res.interface';
@Injectable()
export class PcaService {

  constructor(private http:HttpClient) { }

  public getPca(pca:string):Observable<Res>{
    return this.http.get<Res>(`/api/sys/Area/getPca?pca=${pca}`)
  }
}
