import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as mapboxgl from 'mapbox-gl';
import { map, Observable, startWith, Subject, switchMap } from 'rxjs';
import { IMapItem } from 'src/shared/models/map.model';
import { selectFilteredItems } from 'src/shared/state/map';

@Component({
  selector: 'app-map-content',
  templateUrl: './map-content.component.html',
  styleUrls: ['./map-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapContentComponent implements OnInit {
  public map!: mapboxgl.Map;

  public urlChangeSubject$ = new Subject<string>();
  public mapItems$: Observable<IMapItem[]> = this.urlChangeSubject$.pipe(
    startWith(window.location.pathname),
    switchMap((url) => {
      const idString = url.replace('/', '');
      const id = idString ? +idString : null;
      const storeInstance = this.store.select(selectFilteredItems);
      if (!id) return storeInstance;
      return storeInstance.pipe(
        map((mapItems) => {
          const found = mapItems.find((item) => item.propertyID === id);
          return found ? [found] : [];
        })
      );
    })
  );

  constructor(private store: Store, private location: Location) {}

  ngOnInit(): void {
    this.location.onUrlChange((url) => this.urlChangeSubject$.next(url));
  }

  onSelectItem(item: IMapItem) {
    this.location.go(`${item.propertyID}`);
  }
}
