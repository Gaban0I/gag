import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Filter } from '../models/interface';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private _filters = new BehaviorSubject<Filter>({
    network: {},
    lock: '',
    injectionDate: {},
  });

  get filters() {
    return this._filters.asObservable();
  }

  setFilters(filter: Filter) {
    this._filters.next(filter);
  }
}
