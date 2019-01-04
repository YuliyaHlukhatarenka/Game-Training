import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ReadJsonService {
  public constructor(private httpClient: HttpClient) {}

  public getJSON(): Observable<any> {
    return this.httpClient.get('/assets/data/data.json');
  }
}
