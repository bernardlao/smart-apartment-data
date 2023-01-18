import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, startWith, Subject, switchMap } from 'rxjs';
import { IMapItem } from 'src/shared/models/map.model';
import { selectFilteredItems } from 'src/shared/state/map';

@Component({
  selector: 'app-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapContainerComponent {
  private urlChangeSubject$ = new Subject<string>();
  public selectedItem$: Observable<IMapItem | undefined> =
    this.urlChangeSubject$.pipe(
      startWith(window.location.pathname),
      switchMap((url) => {
        const idString = url.replace('/', '');
        const id = idString ? +idString : null;
        return this.store
          .select(selectFilteredItems)
          .pipe(map((items) => items.find((mItem) => mItem.propertyID === id)));
      })
    );
  constructor(private store: Store, private location: Location) {
    this.location.onUrlChange((res) => this.urlChangeSubject$.next(res));
  }
}
