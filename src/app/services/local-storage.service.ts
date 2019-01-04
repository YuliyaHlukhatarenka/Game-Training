import { Injectable } from '@angular/core';
import { StoredUserModel } from '../models/storedUser.model';

@Injectable()
export class LocalStorageService {
  public saveTop10(key: string, top10: StoredUserModel[]): void {
    localStorage.setItem(key, JSON.stringify(top10));
  }

  public getTop10(key: string): StoredUserModel[] {
    return JSON.parse(localStorage.getItem(key));
  }
}
